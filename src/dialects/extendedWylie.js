if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './extendedGruber',
        '../parser',
        './wylie/wmd2uchen',
        './wylie/dictionary'],

function (MarkdownHelpers, DialectHelpers, ExtendedGruber, Markdown, UChenMap, Dictionary) {

  var ExtendedWylie = DialectHelpers.subclassDialect( ExtendedGruber );
  var inline_until_char = DialectHelpers.inline_until_char;
  var mk_block = MarkdownHelpers.mk_block;
  var uChenMap = UChenMap;

  ExtendedWylie.isMarkUp = false;
  ExtendedWylie.glossary = {};
  ExtendedWylie.dictionary = Dictionary;
  ExtendedWylie.dictionaryURL = "http://leannenorthrop.github.io/classical-tibetan/resource/dictionary/index.html#";
  
  ExtendedWylie.inline[ "::" ] = function inlineWylie( text ) {
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

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  function removePunctuation(str) {
    return str.replace(/(_|\*|\/|(\/\/)|;|\||\!|\:|£|==|=|x|(x\.)|(\.\.\.\.)|(o\.\.\.\.)|(H1)|(H2)|(H3)|@|#|\$|%|(H4)|(H5)|(H6)|(H7)|<|>|\{|\}|_)/g, "");
  }

  function endsWithPunctuation(str) {
    return str.trim().match(/(_|\*|\/|(\/\/)|;|\||\!|\:|£|==|=|x|(x\.)|(\.\.\.\.)|(o\.\.\.\.)|(H1)|(H2)|(H3)|@|#|\$|%|(H4)|(H5)|(H6)|(H7)|<|>|\{|\}|_)$/g, "");
  }

  ExtendedWylie.markup = function(wylie) {
    var nodes = [];
    var syllables = wylie.split(" ");
    var i = 0;
    for (; i < syllables.length; i++) {
      var syllable = syllables[i];
      if (syllable === " " || syllable === "") {
        continue;
      }
      var possibleWord = "";
      for (var j = 0; j < 9; j++) {
        if ((i+j) < syllables.length) {
          possibleWord += syllables[i+j] + " ";
        }
      }
      var lookupWord = removePunctuation(possibleWord);
      var validUntil = ExtendedWylie.dictionary.validUntilSyllableIndex(lookupWord);
      var added = false;
      if (validUntil !== -1) {
        var validPart = lookupWord.split(" ").splice(0, validUntil);
        i += validUntil === validPart.length ? (validUntil-1) : validUntil;
        var word = validPart.join(" ") + " ";

        var validPart2 = possibleWord.split(" ").splice(0, validUntil);
        validPart2 = validPart2.join(" ");
        var wordWithPunc = endsWithPunctuation(validPart2) ? validPart2 : (validPart2 + " ");

        var foundWord = ExtendedWylie.dictionary.findWord(word);
        if (foundWord !== undefined) {
          if (foundWord.hasOwnProperty("en")) {
            var node = ["uchen_syllable", {"class":"syllables word"}];
            node.push(["uchen", {"class":"uchen"}, ["a", {"href":ExtendedWylie.dictionaryURL + encodeURIComponent(validPart.join(" ")+".")}, uChenMap.toUnicode(wordWithPunc)]]);
            /*node.push(["uchen_phonetics", {"class":"wylie"}, foundWord.ph]);
            node.push(["uchen_class", {"class":"wylie"}, foundWord.type]);
            node.push(["uchen_root_letter", {"class":"wylie"}, foundWord.rl]);*/
            node.push(["uchen_wylie", {"class":"wylie"}, word]);
            node.push(["uchen_english", {"class":"english"}, foundWord.en]);
            nodes.push(node);

            var rl = foundWord.rl;
            if (!ExtendedWylie.glossary.hasOwnProperty(rl)) {
              ExtendedWylie.glossary[rl] = [];
            }
            ExtendedWylie.glossary[rl].push({"uchen":uChenMap.toUnicode(validPart2),"english":foundWord.en});
            added = true;
          }
        }
      }
      if (!added) {
        syllable = endsWithPunctuation(syllable) ? syllable : (syllable + " ");
        var node = ["uchen_syllable", {"class":"syllables"}];
        node.push(["uchen", {"class":"uchen"}, uChenMap.toUnicode(syllable)]);
        /*node.push(["uchen_phonetics", {"class":"wylie"}, foundWord.ph]);
        node.push(["uchen_class", {"class":"wylie"}, foundWord.type]);
        node.push(["uchen_root_letter", {"class":"wylie"}, foundWord.rl]);*/
        node.push(["uchen_wylie", {"class":"wylie"}, syllable]);
        node.push(["uchen_english", {"class":"english"}, " "]);
        nodes.push(node);
      }
    }
    return nodes;
  };

  ExtendedWylie.block.wylie = function(block, next) {
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
        wylie = replaceAll(wylie, "\n", "");

        var nodes = [];
        if (ExtendedWylie.isMarkUp) {
          nodes = ExtendedWylie.markup(wylie);
        } else {
          var node = ["uchen_syllable", {"class":"syllables"}];
          node.push(["uchen", {"class":"uchen"}, uChenMap.toUnicode(wylie)]);
          nodes.push(node);
        }

        return wylie.length > 0 ? [[ "uchen_block", { "class": "uchen_text", "wylie": wylie }, nodes ]] : [];
      };

  ExtendedWylie.appendGlossary = function(mdTree) {
    var nodes = ["glossary",{"class":"dl-horizontal"}];
    var glossaryEntries = ExtendedWylie.glossary;

    var order = ["k","kh","g","ng","c","ch","j","ny","t","th","d","n","p","ph","b","m","ts","tsh","dz","w","zh","z","'","y","r","l","sh","s","h","a"];
    for (var i = 0; i < order.length; i++) {
      if (glossaryEntries.hasOwnProperty(order[i])) {
        var entries = glossaryEntries[order[i]];
        for (var j = 0; j < entries.length; j++) {
          var entry = entries[j];
          nodes.push(["glossary_term",{},entry["uchen"]]);
          nodes.push(["glossary_def",{},entry["english"]]);
        }
      }
    }
    mdTree.push(["header", {"level": 2}, "Glossary"]);
    mdTree.push(nodes);
    ExtendedWylie.glossary = [];
    return mdTree;
  };

  Markdown.dialects.ExtendedWylie = ExtendedWylie;
  Markdown.buildBlockOrder ( Markdown.dialects.ExtendedWylie.block );
  Markdown.buildInlinePatterns( Markdown.dialects.ExtendedWylie.inline );

  return ExtendedWylie;
});
