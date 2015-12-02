if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './gruber',
        '../parser'],

function (MarkdownHelpers, DialectHelpers, Gruber, Markdown) {
  var ExtendedGruber = DialectHelpers.subclassDialect( Gruber ),
      forEach = MarkdownHelpers.forEach;

  ExtendedGruber.block.hlcode = function code( block, next ) {
        var ret = [],
            re = /(```)(.*\n)(([\s\S\W\w\n\r]*?)\1)/,
            reStartBlock = /(```)(.*\n)(([\s\S\W\w\n\r]*?))/,
            reEndBlock = /(.*)(```$)/;

        if ( !block.match( reStartBlock ) )
          return undefined;

        var content = "";
        var type = "";
        if ( block.match( re ) ) {
          content = block.match( re )[4];
          type = block.match( re )[2];
          type = type ? (type.indexOf("highlight") >= 0 ? "nohighlight" : type.replace(/\n/g, '')) : "";
        } else {
          content = "";

          var seen = false;
          var b = block;
          while ( next.length && !seen) {
            seen = b.match(reEndBlock);
            if (!seen && b.indexOf("```") === 0) {
              type = b.split("\n")[0].replace("```","");
              type = type ? (type.indexOf("highlight") >= 0 ? "nohighlight" : type.replace(/\n/g, '')) : "";
              b = type.length ? b.replace(type, "") : b;
            }
            content += b.replace(/```/g,"") + (seen ? "" : "\n\n");
            b = seen ? "" : next.shift();
          }
        }

        return [ [ "code_block", { class: type }, content ] ];
      };

  ExtendedGruber.block.table = function table ( block ) {

    var _split_on_unescaped = function( s, ch ) {
      ch = ch || '\\s';
      if ( ch.match(/^[\\|\[\]{}?*.+^$]$/) )
        ch = '\\' + ch;
      var res = [ ],
          r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
          m;
      while ( ( m = s.match( r ) ) ) {
        res.push( m[1] );
        s = m[2];
      }
      res.push(s);
      return res;
    };

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i,
        m;
    if ( ( m = block.match( leading_pipe ) ) ) {
      // remove leading pipes in contents
      // (header and horizontal rule already have the leading pipe left out)
      m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if ( ! ( m = block.match( no_leading_pipe ) ) ) {
      return undefined;
    }

    var table = [ "table",{"class":"table"}, [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
      if (s.match(/^\s*-+:\s*$/))
        html_attrs.push({align: "right"});
      else if (s.match(/^\s*:-+\s*$/))
        html_attrs.push({align: "left"});
      else if (s.match(/^\s*:-+:\s*$/))
        html_attrs.push({align: "center"});
      else
        html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
      table[2][1].push(['th', html_attrs[i] || {}].concat(
        this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
      var html_row = ['tr'];
      row = _split_on_unescaped(row, '|');
      for (i = 0; i < row.length; i++)
        html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
      table[3].push(html_row);
    }, this);

    return [table];
  };

  ExtendedGruber.inline[ "~~" ] = function inlineStrikeout(text) {
    var m = text.match(/^~~([^~]*)~~/i);
    if (m) {
      return [m[0].length, [ "strikeout", m[1]]];
    } else {
      return [2,""];
    }
  };

  ExtendedGruber.inline[ "\/" ] = function inlineMark(text) {
    var m = text.match(/^\/([^\/]*)\//i);
    if (m) {
      return [m[0].length, [ "mark", m[1]]];
    } else {
      return [1,""];
    }
  };

  ExtendedGruber.inline[ "<" ] = function inlineHtmlVoid( text ) {
        // Inline void html block.
        var m = text.match( /^<(?:(br|wbr)\s*\/?)>/i );

        if ( m ) {
          console.log(m);
          return [m[0].length, ["html_void", { }, m[1]]];
        } else {
          m = text.match(/^<a name=('|")([^'"]*)\1\/?>/i);
          if (m) {
            return [m[0].length, ["html_element", {'name':m[2], 'element':'a'}, ""]];
          }
          else {
            m = text.match(/^<(article|aside|audio|bdi|details|figure|figcaption|footer|header|main|mark|nav|output|rp|rt|ruby|section|summary|time|abbr|address|bdo|cite|code|dd|del|dfn|div|dl|dd|dt|h1|h2|h3|h4|h5|h6|iframe|ins|kbd|pre|q|s|samp|span|strong|sub|sup|var)(\s*[^='"]*=('[^']*'|"[^"]*)*)*>((?:.|\n)*?)<\s*\/\1\s*>/i);
            if (m) {
              console.log(m);
              var name = m[1];
              var attributes = m[2] ? m[2].trim() : undefined;
              var attr = {'element':name};
              if (attributes !== undefined) {
                attributes = attributes.split(/(?:\s+)/);
                for (var j = 0; j < attributes.length; j++) {
                  var parts = attributes[j].split("=");
                  var val = parts[1].trim();
                  val = val.substring(1, val.length-1);
                  attr[parts[0].trim()] = val;
                }
              }
              var txt = m[4];
              var inner = this.processInline(txt);
              var node = ["html_element", attr];
              for (var i = 0; i < inner.length; i++) {
                node.push(inner[i]);
              }
              return [m[0].length, node];
            } else {
              return Markdown.dialects.Gruber.inline["<"](text);
            }
          }
        }
      };

  Markdown.dialects.ExtendedGruber = ExtendedGruber;
  Markdown.buildBlockOrder ( Markdown.dialects.ExtendedGruber.block );
  Markdown.buildInlinePatterns( Markdown.dialects.ExtendedGruber.inline );

  return ExtendedGruber;
});