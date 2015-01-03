if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([], function () {

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

    // Subjoined Consonants
    UChenMap["+k"] = "\u0F90";
    UChenMap["+g"] = "\u0F92";
    UChenMap["+r"] = "\u0FB2";

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
    //UChenMap["x"] = "\u0FBE";
    //UChenMap["x."] = "\u0FBF";
    //UChenMap["...."] = "\u0F36";
    //UChenMap["o...."] = "\u0F13";
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

    // Ligatures
    UChenMap.Ligatures = {};
    UChenMap.Ligatures["rk"] = "r+k";
    UChenMap.Ligatures["sgr"] = "s+g+r";

    return UChenMap;
  });
