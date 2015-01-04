if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([], function () {

    // Implementation of http://www.thlib.org/reference/transliteration/#!essay=/thl/ewts/intro/

    var UChenMap = {};
    // Consonants
    UChenMap["k"] = "\u0F40";
    UChenMap["kh"] = "\u0F41";
    UChenMap["g"] = "\u0F42";
    UChenMap["ng"] = "\u0F44";
    UChenMap["c"] = "\u0F45";
    UChenMap["ch"] = "\u0F46";
    UChenMap["j"] = "\u0F47";
    UChenMap["ny"] = "\u0F49";
    UChenMap["t"] = "\u0F4F";
    UChenMap["th"] = "\u0F50";
    UChenMap["d"] = "\u0F51";
    UChenMap["n"] = "\u0F53";
    UChenMap["p"] = "\u0F54";
    UChenMap["ph"] = "\u0F55";
    UChenMap["b"] = "\u0F56";
    UChenMap["m"] = "\u0F58";
    UChenMap["ts"] = "\u0F59";
    UChenMap["tsh"] = "\u0F5A";
    UChenMap["dz"] = "\u0F5B";
    UChenMap["w"] = "\u0F5D";
    UChenMap["zh"] = "\u0F5E";
    UChenMap["z"] = "\u0F5F";
    UChenMap["'"] = "\u0F60";
    UChenMap["y"] = "\u0F61";
    UChenMap["r"] = "\u0F62";
    UChenMap["l"] = "\u0F63";
    UChenMap["sh"] = "\u0F64";
    UChenMap["s"] = "\u0F66";
    UChenMap["h"] = "\u0F67";
    UChenMap["a"] = "\u0F68";
    UChenMap["'"] = "\u0F68";

    UChenMap[".k"] = "\u0F40";
    UChenMap[".kh"] = "\u0F41";
    UChenMap[".g"] = "\u0F42";
    UChenMap[".ng"] = "\u0F44";
    UChenMap[".c"] = "\u0F45";
    UChenMap[".ch"] = "\u0F46";
    UChenMap[".j"] = "\u0F47";
    UChenMap[".ny"] = "\u0F49";
    UChenMap[".t"] = "\u0F4F";
    UChenMap[".th"] = "\u0F50";
    UChenMap[".d"] = "\u0F51";
    UChenMap[".n"] = "\u0F53";
    UChenMap[".p"] = "\u0F54";
    UChenMap[".ph"] = "\u0F55";
    UChenMap[".b"] = "\u0F56";
    UChenMap[".m"] = "\u0F58";
    UChenMap[".ts"] = "\u0F59";
    UChenMap[".tsh"] = "\u0F5A";
    UChenMap[".dz"] = "\u0F5B";
    UChenMap[".w"] = "\u0F5D";
    UChenMap[".zh"] = "\u0F5E";
    UChenMap[".z"] = "\u0F5F";
    UChenMap[".'"] = "\u0F60";
    UChenMap[".y"] = "\u0F61";
    UChenMap[".r"] = "\u0F62";
    UChenMap[".l"] = "\u0F63";
    UChenMap[".sh"] = "\u0F64";
    UChenMap[".s"] = "\u0F66";
    UChenMap[".h"] = "\u0F67";
    UChenMap[".a"] = "\u0F68";
    UChenMap[".'"] = "\u0F68";

    // Sanskrit & Subjoined Sanskrit
    UChenMap["gh"] = "\u0F43";
    UChenMap["g+h"] = "\u0F43";
    UChenMap["dh"] = "\u0F52";
    UChenMap["d+h"] = "\u0F52";
    UChenMap["bh"] = "\u0F57";
    UChenMap["b+h"] = "\u0F57";
    UChenMap["dzh"] = "\u0F5C";
    UChenMap["dz+h"] = "\u0F5C";
    UChenMap["kSh"] = "\u0F69";
    UChenMap["k+Sh"] = "\u0F69";
    UChenMap["T"] = "\u0F4A";
    UChenMap["Th"] = "\u0F4B";
    UChenMap["D"] = "\u0F4C";
    UChenMap["Dh"] = "\u0F4D";
    UChenMap["D+h"] = "\u0F4D";
    UChenMap["N"] = "\u0F4E";
    UChenMap["Sh"] = "\u0F65";
    UChenMap["oM"] = "\u0F00";
    UChenMap["+W"] = "\u0FBA";
    UChenMap["+Y"] = "\u0FBB";
    UChenMap["+R"] = "\u0FBC";
    UChenMap["H"] = "\u0F7F";
    UChenMap["M"] = "\u0F7E";
    UChenMap["~M"] = "\u0F83";
    UChenMap["~M'"] = "\u0F82";
    UChenMap["~?"] = "\u0F84";
    UChenMap["&"] = "\u0F85";

    //UChenMap[""] = "\u";

    // Subjoined Consonants
    UChenMap["+k"] = "\u0F90";
    UChenMap["+kh"] = "\u0F91";
    UChenMap["+g"] = "\u0F92";
    UChenMap["+gh"] = "\u0F93";
    UChenMap["+ng"] = "\u0F94";
    UChenMap["+c"] = "\u0F95";
    UChenMap["+ch"] = "\u0F96";
    UChenMap["+j"] = "\u0F97";
    UChenMap["+ny"] = "\u0F99";
    UChenMap["+th"] = "\u0FA0";
    UChenMap["+n"] = "\u0F9E";
    UChenMap["+t"] = "\u0F9F";
    UChenMap["+d"] = "\u0FA1";
    UChenMap["+dh"] = "\u0FA2";
    UChenMap["+n"] = "\u0FA3";
    UChenMap["+p"] = "\u0FA4";
    UChenMap["+ph"] = "\u0FA5";
    UChenMap["+b"] = "\u0FA6";
    UChenMap["+bh"] = "\u0FA7";
    UChenMap["+m"] = "\u0FA8";
    UChenMap["+ts"] = "\u0FA9";
    UChenMap["+tsh"] = "\u0FAA";
    UChenMap["+dz"] = "\u0FAB";
    UChenMap["+dzh"] = "\u0FAC";
    UChenMap["+w"] = "\u0FAD";
    UChenMap["+zh"] = "\u0FAE";
    UChenMap["+z"] = "\u0FAF";
    UChenMap["+a"] = "\u0FB0";
    UChenMap["+'"] = "\u0FB0";
    UChenMap["+y"] = "\u0FB1";
    UChenMap["+r"] = "\u0FB2";
    UChenMap["+l"] = "\u0FB3";
    UChenMap["+sh"] = "\u0FB4";
    UChenMap["+s"] = "\u0FB6";
    UChenMap["+h"] = "\u0FB7";
    UChenMap["+A"] = "\u0FB8";
    UChenMap["+ksh"] = "\u0FB9";
    UChenMap["+.w"] = "\u0FBA";
    UChenMap["+.y"] = "\u0FBB";
    UChenMap["+.r"] = "\u0FBC";
    //UChenMap["+"] = "\u";

    // Vowels
    UChenMap["i"] = "\u0F72";
    UChenMap["u"] = "\u0F74";
    UChenMap["e"] = "\u0F7A";
    UChenMap["o"] = "\u0F7C";
    UChenMap["A"] = "\u0F71";
    UChenMap["I"] = "\u0F73";
    UChenMap["U"] = "\u0F75";
    UChenMap["r-i"] = "\u0F76";
    UChenMap["l-i"] = "\u0F78";
    UChenMap["-i"] = "\u0F80";
    UChenMap["ai"] = "\u0F7B";
    UChenMap["au"] = "\u0F7D";
    UChenMap["r-I"] = "\u0F77";
    UChenMap["l-I"] = "\u0F79";
    UChenMap["-I"] = "\u0F81";

    // Numbers
    UChenMap["0"] = "\u0F20";
    UChenMap["1"] = "\u0F21";
    UChenMap["2"] = "\u0F22";
    UChenMap["3"] = "\u0F23";
    UChenMap["4"] = "\u0F24";
    UChenMap["5"] = "\u0F25";
    UChenMap["6"] = "\u0F26";
    UChenMap["7"] = "\u0F27";
    UChenMap["8"] = "\u0F28";
    UChenMap["9"] = "\u0F29";

    //Punctuation
    UChenMap["_"] = " ";
    UChenMap[" "] = "\u0F0B";
    UChenMap["*"] = "\u0F0C";
    UChenMap["/"] = "\u0F0D";
    UChenMap["//"] = "\u0F0E";
    UChenMap[";"] = "\u0F0F";
    UChenMap["|"] = "\u0F11";
    UChenMap["!"] = "\u0F08";
    UChenMap[":"] = "\u0F14";
    UChenMap[":"] = "\u0F14";
    UChenMap["£"] = "\u0F10";
    UChenMap["¬"] = "\u0F12";
    UChenMap["="] = "\u0F34";
    UChenMap["x"] = "\u0FBE";
    UChenMap["x."] = "\u0FBF";
    UChenMap["...."] = "\u0F36";
    UChenMap["o...."] = "\u0F13";
    UChenMap["H1"] = "\u0F01";
    UChenMap["H2"] = "\u0F02";
    UChenMap["H3"] = "\u0F03";
    UChenMap["@"] = "\u0F04";
    UChenMap["#"] = "\u0F05";
    UChenMap["$"] = "\u0F06";
    UChenMap["%"] = "\u0F07";
    UChenMap["H4"] = "\u0F09";
    UChenMap["H5"] = "\u0F0A";
    UChenMap["H6"] = "\u0FD0";
    UChenMap["H7"] = "\u0FD1";
    UChenMap["<"] = "\u0F3A";
    UChenMap[">"] = "\u0F3B";
    UChenMap["("] = "\u0F3C";
    UChenMap[")"] = "\u0F3D";

    // Ligatures & Special Character or Character COmbinations
    UChenMap.Ligatures = {};
    UChenMap.Ligatures["rk"] = "r+k";
    UChenMap.Ligatures["rg"] = "r+g";
    UChenMap.Ligatures["rng"] = "r+ng";
    UChenMap.Ligatures["rj"] = "r+j";
    UChenMap.Ligatures["rny"] = "r+ny";
    UChenMap.Ligatures["rt" ] = "r+t";
    UChenMap.Ligatures["rd"] = "r+d";
    UChenMap.Ligatures["rn"] = "r+n";
    UChenMap.Ligatures["rb" ] = "r+b";
    UChenMap.Ligatures["rm" ] = "r+m";
    UChenMap.Ligatures["rts"] = "r+ts";
    UChenMap.Ligatures["rdz"] = "r+dz";
    UChenMap.Ligatures["lk"] = "l+k";
    UChenMap.Ligatures["lg"] = "l+g";
    UChenMap.Ligatures["lng"] = "l+ng";
    UChenMap.Ligatures["lc"] = "l+c";
    UChenMap.Ligatures["lj"] = "l+j";
    UChenMap.Ligatures["lt"] = "l+t";
    UChenMap.Ligatures["ld"] = "l+d";
    UChenMap.Ligatures["lp"] = "l+p";
    UChenMap.Ligatures["lb"] = "l+b";
    UChenMap.Ligatures["lh"] = "l+h";
    UChenMap.Ligatures["sk"] = "s+k";
    UChenMap.Ligatures["sg"] = "s+g";
    UChenMap.Ligatures["sng"] = "s+ng";
    UChenMap.Ligatures["sny"] = "s+ny";
    UChenMap.Ligatures["st"] = "s+t";
    UChenMap.Ligatures["sd"] = "s+d";
    UChenMap.Ligatures["sn"] = "s+n";
    UChenMap.Ligatures["sp"] = "s+p";
    UChenMap.Ligatures["sb"] = "s+b";
    UChenMap.Ligatures["sm"] = "s+m";
    UChenMap.Ligatures["sts"] = "s+ts";
    UChenMap.Ligatures["kw"] = "k+w";
    UChenMap.Ligatures["khw"] = "kh+w";
    UChenMap.Ligatures["gw"] = "g+w";
    UChenMap.Ligatures["cw"] = "c+w";
    UChenMap.Ligatures["nyw"] = "ny+w";
    UChenMap.Ligatures["tw"] = "t+w";
    UChenMap.Ligatures["dw"] = "d+w";
    UChenMap.Ligatures["tsw"] = "ts+w";
    UChenMap.Ligatures["tshw"] = "tsh+w";
    UChenMap.Ligatures["zhw"] = "zh+w";
    UChenMap.Ligatures["zw"] = "z+w";
    UChenMap.Ligatures["rw"] = "r+w";
    UChenMap.Ligatures["shw"] = "sh+w";
    UChenMap.Ligatures["sw"] = "s+w";
    UChenMap.Ligatures["hw"] = "h+w";
    UChenMap.Ligatures["ky"] = "k+y";
    UChenMap.Ligatures["khy"] = "kh+y";
    UChenMap.Ligatures["gy"] = "g+y";
    UChenMap.Ligatures["py"] = "p+y";
    UChenMap.Ligatures["phy"] = "ph+y";
    UChenMap.Ligatures["by"] = "b+y";
    UChenMap.Ligatures["my"] = "m+y";
    UChenMap.Ligatures["kr"] = "k+r";
    UChenMap.Ligatures["khr"] = "kh+r";
    UChenMap.Ligatures["gr"] = "g+r";
    UChenMap.Ligatures["tr"] = "t+r";
    UChenMap.Ligatures["thr"] = "th+r";
    UChenMap.Ligatures["dr"] = "d+r";
    UChenMap.Ligatures["pr"] = "p+r";
    UChenMap.Ligatures["phr"] = "ph+r";
    UChenMap.Ligatures["br"] = "b+r";
    UChenMap.Ligatures["mr"] = "m+r";
    UChenMap.Ligatures["shr"] = "sh+r";
    UChenMap.Ligatures["sr"] = "s+r";
    UChenMap.Ligatures["hr"] = "h+r";
    UChenMap.Ligatures["kl"] = "k+l";
    UChenMap.Ligatures["gl"] = "g+l";
    UChenMap.Ligatures["bl"] = "b+l";
    UChenMap.Ligatures["zl"] = "z+l";
    UChenMap.Ligatures["rl"] = "r+l";
    UChenMap.Ligatures["sl"] = "s+l";
    UChenMap.Ligatures["rky"] = "r+k+y";
    UChenMap.Ligatures["rgy"] = "r+g+y";
    UChenMap.Ligatures["rmy"] = "r+m+y";
    UChenMap.Ligatures["rgw"] = "r+g+w";
    UChenMap.Ligatures["rtsw"] = "r+ts+w";
    UChenMap.Ligatures["sky"] = "s+k+y";
    UChenMap.Ligatures["sgy"] = "s+g+y";
    UChenMap.Ligatures["spy"] = "s+p+y";
    UChenMap.Ligatures["sby"] = "s+b+y";
    UChenMap.Ligatures["smy"] = "s+m+y";
    UChenMap.Ligatures["skr"] = "s+k+r";
    UChenMap.Ligatures["sgr"] = "s+g+r";
    UChenMap.Ligatures["snr"] = "s+n+r";
    UChenMap.Ligatures["spr"] = "s+p+r";
    UChenMap.Ligatures["sbr"] = "s+b+r";
    UChenMap.Ligatures["smr"] = "s+m+r";
    UChenMap.Ligatures["grw"] = "g+r+w";
    UChenMap.Ligatures["drw"] = "d+r+w";
    UChenMap.Ligatures["phyw"] = "ph+y+w";
    UChenMap.Ligatures["~om"] = "\u0F00";
    UChenMap.Ligatures["~athung"] = "\u0F01";
    UChenMap.Ligatures["~namcheyma"] = "\u0F02";
    UChenMap.Ligatures["~tertsekma"] = "\u0F03";
    UChenMap.Ligatures["~dunma"] = "\u0F04";
    UChenMap.Ligatures["~kabma"] = "\u0F05";
    UChenMap.Ligatures["~pursheyma"] = "\u0F06";
    UChenMap.Ligatures["~tseksheyma"] = "\u0F07";
    UChenMap.Ligatures["~drulshey"] = "\u0F08";
    UChenMap.Ligatures["~kuryikgo"] = "\u0F09";
    UChenMap.Ligatures["~kashoyikgo"] = "\u0F0A";
    UChenMap.Ligatures["~tsek"] = "\u0F0B";
    UChenMap.Ligatures["~tsektar"] = "\u0F0C";
    UChenMap.Ligatures["~shey"] = "\u0F0D";
    UChenMap.Ligatures["~nyishey"] = "\u0F0E";
    UChenMap.Ligatures["~tsekshey"] = "\u0F0F";
    UChenMap.Ligatures["~nyitsekshey"] = "\u0F10";
    UChenMap.Ligatures["~rinchenpungshey"] = "\u0F11";
    UChenMap.Ligatures["~gyatramshey"] = "\u0F12";
    UChenMap.Ligatures["~dzutamelongchen"] = "\u0F13";
    UChenMap.Ligatures["~tertsek"] = "\u0F14";
    UChenMap.Ligatures["~cheta"] = "\u0F15";
    UChenMap.Ligatures["~lakta"] = "\u0F16";
    UChenMap.Ligatures["~trachencharta"] = "\u0F17";
    UChenMap.Ligatures["~kyupa"] = "\u0F18";
    UChenMap.Ligatures["~dongtsu"] = "\u0F19";
    UChenMap.Ligatures["~dekachig"] = "\u0F1A";
    UChenMap.Ligatures["~dekanyi"] = "\u0F1B";
    UChenMap.Ligatures["~dekasum"] = "\u0F1C";
    UChenMap.Ligatures["~denachig"] = "\u0F1D";
    UChenMap.Ligatures["~denanyi"] = "\u0F1E";
    UChenMap.Ligatures["~dekadena"] = "\u0F1F";
    UChenMap.Ligatures["~duta"] = "\u0F34";
    UChenMap.Ligatures["~ngezungnyida"] = "\u0F35";
    UChenMap.Ligatures["~dzutashimigchen"] = "\u0F36";
    UChenMap.Ligatures["~ngezunggorta"] = "\u0F37";
    UChenMap.Ligatures["~chego"] = "\u0F38";
    UChenMap.Ligatures["~tsatru"] = "\u0F39";
    UChenMap.Ligatures["~gugtayun"] = "\u0F3A";
    UChenMap.Ligatures["~gugtaye"] = "\u0F3B";
    UChenMap.Ligatures["~angkangyun"] = "\u0F3C";
    UChenMap.Ligatures["~angkangye"] = "\u0F3D";
    UChenMap.Ligatures["~yartse"] = "\u0F3E";
    UChenMap.Ligatures["~martse"] = "\u0F3F";
    UChenMap.Ligatures["~kuruka"] = "\u0FBE";
    UChenMap.Ligatures["~kurukashimikchen"] = "\u0FBF";
    UChenMap.Ligatures["~HEAVY"] = "\u0FC0";
    UChenMap.Ligatures["~LIGHT"] = "\u0FC1";
    UChenMap.Ligatures["~CANGTE"] = "\u0FC2";
    UChenMap.Ligatures["~SBUB"] = "\u0FC3";
    UChenMap.Ligatures["~drilbu"] = "\u0FC4";
    UChenMap.Ligatures["~dorje"] = "\u0FC5";
    UChenMap.Ligatures["~pemaden"] = "\u0FC6";
    UChenMap.Ligatures["~dorjegyadram"] = "\u0FC7";
    UChenMap.Ligatures["~phurba"] = "\u0FC8";
    UChenMap.Ligatures["~norbu"] = "\u0FC9";
    UChenMap.Ligatures["~norbunyikhyi"] = "\u0FCA";
    UChenMap.Ligatures["~norbusumkhyi"] = "\u0FCB";
    UChenMap.Ligatures["~norbushikhyi"] = "\u0FCC";
    UChenMap.Ligatures["~denasum"] = "\u0FCF";

    UChenMap.toUnicode = function(text) {
        function escapeRegEx(str) {
          return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }
        function compareLength(a,b) {
            if (a.length > b.length) return -1;
            if (a.length < b.length) return 1;
            return 0;
          }

        function sortProperties(object) {
          var arr = [];
          for (var property in object) {
            if (object.hasOwnProperty(property) && typeof(object[property]) === "string") {
              arr.push(property);
            }
          }
          arr.sort(compareLength);
          return arr;
        }

        var sortedLigatures = sortProperties(UChenMap.Ligatures);
        var sortedMap = sortProperties(UChenMap);

        function apply(string, substitutions, map) {
          var result = string;
          for (var i = 0; i < substitutions.length; i++) {
            var regEx = escapeRegEx(substitutions[i]);
            result = result.replace(new RegExp(regEx, 'g'), map[substitutions[i]]);
          }
          return result;
        }

        function parseSyllable (syllable) {
          var result = "";
          result = apply(apply(syllable, sortedLigatures, UChenMap.Ligatures), sortedMap, UChenMap);
          return result;
        }

        return (function(text) {
            var result = "";

            var syllables = text.split(" ");
            for (var i = 0; i < syllables.length; i++) {
              result += parseSyllable(syllables[i]) + (i === syllables.length -1 ? "" : UChenMap[" "]);
            }

            return result;
          }(text));
      };

    return UChenMap;
  });
