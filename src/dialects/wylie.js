if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './gruber',
        '../parser',
        './wylie/wmd2uchen'],

function (MarkdownHelpers, DialectHelpers, Gruber, Markdown, UChenMap) {
  var inline_until_char = DialectHelpers.inline_until_char;
  var mk_block = MarkdownHelpers.mk_block;
  var forEach = MarkdownHelpers.forEach;
  var uChenMap = UChenMap;

  var Wylie = {
    block: {
      wylie: function wylie(block, next) {
        var ret = [],
            re = /^(:::\n*)([\s\S\W\w\n\r]*?)(\1)/,
            reStartBlock = /^:::\n*/,
            reEndBlock = /([\s\S\W\w\n\r]*?)(\n*:::)(.*)/;

        if ( !block.match( reStartBlock ) )
          return undefined;

        var wylie = "";
        var groups = block.match( re );
        if ( groups ) {
          wylie = groups[2];
        } else {
          var seen = false;
          var b = block.replace(":::", "");
          while ( next.length && !seen) {
            seen = b.match(reEndBlock);
            wylie += seen ? seen[1] : b;
            b = seen ? "" : next.shift();
          }
        }

        return wylie.length > 0 ? [ [ "uchen_block", { "class": "uchen", "wylie": wylie }, uChenMap.toUnicode(wylie) ] ] : [];
      },
      para: function para( block ) {
        // everything's a para!
        return [ ["para"].concat( this.processInline( block ) ) ];
      }
    },
    inline: {
      __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
        var m,
            res;

        patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
        var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

        m = re.exec( text );
        if (!m) {
          // Just boring text
          return [ text.length, text ];
        }
        else if ( m[1] ) {
          // Some un-interesting text matched. Return that first
          return [ m[1].length, m[1] ];
        }

        var res;
        if ( m[2] in this.dialect.inline ) {
          res = this.dialect.inline[ m[2] ].call(
                    this,
                    text.substr( m.index ), m, previous_nodes || [] );
        }
        // Default for now to make dev easier. just slurp special and output it.
        res = res || [ m[2].length, m[2] ];
        return res;
      },

      __call__: function inline( text, patterns ) {

        var out = [],
            res;

        function add(x) {
          //D:self.debug("  adding output", uneval(x));
          if ( typeof x === "string" && typeof out[out.length-1] === "string" )
            out[ out.length-1 ] += x;
          else
            out.push(x);
        }

        while ( text.length > 0 ) {
          res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
          text = text.substr( res.shift() );
          forEach(res, add );
        }

        return out;
      },
      __escape__ : /^\\[\\`\*_{}<>\[\]()#\+.!\-]/,

      "\\": function escaped( text ) {
        // [ length of input processed, node/children to add... ]
        // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
        if ( this.dialect.inline.__escape__.exec( text ) )
          return [ 2, text.charAt( 1 ) ];
        else
          // Not an esacpe
          return [ 1, "\\" ];
      },
      "  \n": function lineBreak() {
        return [ 3, [ "linebreak" ] ];
      }
    }
  };

  Wylie.inline[ "::" ] = function inlineWylie( text ) {
        // Inline wylie block.
        var m = text.match( /(::)((\s|\S|\W|\w)*?)(\1)/ );

        if ( m && m[2] ) {
          var txt = uChenMap.toUnicode(m[2]);
          return [ (m[1].length*2) + m[2].length, [ "uchen", { "class": "uchen", "wylie": m[2]}, txt ] ];
        }
        else {
          // TODO: No matching end code found - warn!
          return [ 2, "::" ];
        }
      };

  Markdown.dialects.Wylie = Wylie;
  Markdown.buildBlockOrder ( Markdown.dialects.Wylie.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Wylie.inline );

  return Wylie;
});