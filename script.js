// Neistinn - Sentence building trainer for learners of Icelandic - A1/B1 level
// Ver 1.0 (Apr 2026)
// Author: Mirko Garofalo (mig@hi.is)
//

let count;
let totcorr;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("verif").disabled = true; // Disable the Verify button on page load
    document.getElementById("subjice").disabled = true;
     document.getElementById("verbice").disabled = true;
     document.getElementById("objice").disabled = true;
     count = 0;
     totcorr = 0;

});

const dictsubj = [
["I", "ég", 0, "x"],
["You", "þú", 1, "x"],
["He", "hann", 2, "x"],
["She", "hún", 2, "x"],
["It", "það", 2, "x"],
["We", "við", 3, "x"],
["You (pl)", "þið", 4, "x"],
["They (m)", "þeir", 5, "x"],
["They (f)", "þær", 5, "x"],
["They (n)", "þau", 5, "x"],
["The student", "nemandinn", 2, "adj", ["íslenski", "nýi"], ["Icelandic", "new"]],
["A student", "nemandi", 2, "adj", ["íslenskur", "nýr"], ["Icelandic", "new"], "x"],
["The teacher", "kennarinn", 2, "adj", ["gamli", "ljóshærði", "dökkhærði", "nýi"], ["old", "blonde", "dark-haired", "new"]],
["A teacher", "kennari", 2, "adj", ["gamall", "ljóshærður", "dökkhærður"], ["old", "blonde", "dark-haired"], "x"],
["The tourist", "ferðamaðurinn", 2, "adj", ["franski", "ungi"], ["French", "young"]],
["Tourists", "ferðamenn", 5],
["The tourists", "ferðamennirnir", 5, "adj", ["ungu", "bandarísku"], ["young", "American"]],
["A tourist", "ferðamaður", 2, "adj", ["franskur", "ungur"], ["French", "young"], "x"],
["Your mum", "mamma þín", 2],
["Your dad", "pabbi þinn", 2],
["Your sister", "systir þín", 2],
["Your brother", "bróðir þinn", 2],
["My friends", "vinir mínir", 5],
["Your friends", "vinir þinir", 5],
["Your friend", "vinur þinn", 2],
["My friend", "vinur minn", 2],
["An actress", "leikkona", 2, "adj", ["fræg", "ung"], ["famous", "young"], "x"],
["The actress", "leikkonan", 2, "adj", ["fræga", "unga"], ["famous", "young"]],
["The actresses", "leikkonurnar", 5, "adj", ["frægu", "ungu"], ["famous", "young"]],
];
const dictverb = [
["assist", "assists", 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 36, 37, 40]],
["help", "helps", 1, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 39, 41]],
["miss", "misses", 2, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]],
["see", "sees", 3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 30, 31, 36, 37, 64, 65, 66, 67]],
["follow", "follows", 4, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 32, 33, 38, 39]],
["study", "studies", 5, [34, 35]],
["eat", "eats", 6, [42, 43, 44, 45]],
["drink", "drinks", 7, [46, 47, 48, 49, 50]],
["watch", "watches", 8, [51, 52, 53]],
["paint", "paints", 9, [54, 55, 68, 69, 70]],
["buy", "buys", 10, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["sell", "sells", 11, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["read", "reads", 12, [56, 57, 58, 59, 60, 61, 62, 63]],
["write", "writes", 13, [56, 57, 58, 59, 60, 61, 62, 63]],
["forget", "forgets", 14, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 71, 72, 73, 74]],
["assisted", "assisted", 15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 36, 37, 40]],
["helped", "helped", 16, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 39, 41]],
["missed", "missed", 17, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]],
["saw", "saw", 18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 30, 31, 36, 37, 64, 65, 66, 67]],
["followed", "followed", 19, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 32, 33, 38, 39]],
["studied", "studied", 20, [34, 35]],
["ate", "ate", 21, [42, 43, 44, 45]],
["drank", "drank", 22, [46, 47, 48, 49, 50]],
["watched", "watched", 23, [51, 52, 53]],
["painted", "painted", 24, [54, 55, 68, 69, 70]],
["bought", "bought", 25, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["sold", "sold", 26, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["read (past)", "read (past)", 27, [56, 57, 58, 59, 60, 61, 62, 63]],
["wrote", "wrote", 28, [56, 57, 58, 59, 60, 61, 62, 63]],
["forgot", "forgot", 29, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 71, 72, 73, 74]],
["are assisting", "is assisting", 30, [1, 2, 3, 4, 5, 6, 7, 8, 9, 36, 37, 40]],
["are helping", "is helping", 31, [11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 39, 41]],
["are following", "is following", 32, [11, 12, 13, 14, 15, 16, 17, 18, 19, 32, 33, 38, 39]],
["are studying", "is studying", 33, [34, 35]],
["are eating", "is eating", 34, [42, 43, 44, 45]],
["are drinking", "is drinking", 35, [46, 47, 48, 49, 50]],
["are watching", "is watching", 36, [51, 52, 53]],
["are painting", "is painting", 37, [54, 55, 68, 69, 70]],
["are buying", "is buying", 38, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["are selling", "is selling", 39, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["are reading", "is reading", 40, [56, 57, 58, 59, 60, 61, 62, 63]],
["are writing", "is writing", 41, [56, 57, 58, 59, 60, 61, 62, 63]],
["were assisting", "was assisting", 42, [1, 2, 3, 4, 5, 6, 7, 8, 9, 36, 37, 40]],
["were helping", "was helping", 43, [11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 39, 41]],
["were following", "was following", 44, [11, 12, 13, 14, 15, 16, 17, 18, 19, 32, 33, 38, 39]],
["were studying", "was studying", 45, [34, 35]],
["were eating", "was eating", 46, [42, 43, 44, 45]],
["were drinking", "was drinking", 47, [46, 47, 48, 49, 50]],
["were watching", "was watching", 48, [51, 52, 53]],
["were painting", "was painting", 49, [54, 55, 68, 69, 70]],
["were buying", "was buying", 50, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["were selling", "was selling", 51, [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76]],
["were reading", "was reading", 52, [56, 57, 58, 59, 60, 61, 62, 63]],
["were writing", "was writing", 53, [56, 57, 58, 59, 60, 61, 62, 63]],
];

const arrayv = [
["aðstoða", "aðstoðar", "aðstoðar", "aðstoðum", "aðstoðið", "aðstoða", "n"],
["hjálpa", "hjálpar", "hjálpar", "hjálpum", "hjálpið", "hjálpa", "n"],
["sakna", "saknar", "saknar", "söknum", "saknið", "sakna", "n"],
["sé", "sérð", "sér", "sjáum", "sjáið", "sjá", "n"],
["fylgi", "fylgir", "fylgir", "fylgjum", "fylgið", "fylgja", "n"],
["læri", "lærir", "lærir", "lærum", "lærið", "læra", "n"],
["borða", "borðar", "borðar", "borðum", "borðið", "borða", "n"],
["drekk", "drekkur", "drekkur", "drekkum", "drekkið", "drekka", "n"],
["horfi á", "horfir á", "horfir á", "horfum á", "horfið á", "horfa á", "n"],
["mála", "málar", "málar", "málum", "málið", "mála", "n"],
["kaupi", "kaupir", "kaupir", "kaupum", "kaupið", "kaupa", "n"],
["sel", "selur", "selur", "seljum", "seljið", "selja", "n"],
["les", "lest", "les", "lesum", "lesið", "lesa", "n"],
["skrifa", "skrifar", "skrifar", "skrifum", "skrifið", "skrifa", "n"],
["gleymi", "gleymir", "gleymir", "gleymum", "gleymið", "gleyma", "n"],
["aðstoðaði", "aðstoðaðir", "aðstoðaði", "aðstoðuðum", "aðstoðuðuð", "aðstoðuðu", "p"],
["hjálpaði", "hjálpaðir", "hjálpaði", "hjálpuðum", "hjálpuðuð", "hjálpuðu", "p"],
["saknaði", "saknaðir", "saknaði", "söknuðum", "söknuðuð", "söknuðu", "p"],
["sá", "sást", "sá", "sáum", "sáuð", "sáu", "p"],
["fylgdi", "fylgdir", "fylgdi", "fylgdum", "fylgduð", "fylgdu", "p"],
["lærði", "lærðir", "lærði", "lærðum", "lærðuð", "lærðu", "p"],
["borðaði", "borðaðir", "borðaði", "borðuðum", "borðuðuð", "borðuðu", "p"],
["drakk", "drakkst", "drakk", "drukkum", "drukkuð", "drukku", "p"],
["horfði á", "horfðir á", "horfði á", "horfðum á", "horfðuð á", "horfðu á", "p"],
["málaði", "málaðir", "málaði", "máluðum", "máluðuð", "máluðu", "p"],
["keypti", "keyptir", "keypti", "keyptum", "keyptuð", "keyptu", "p"],
["seldi", "seldir", "seldi", "seldum", "selduð", "seldu", "p"],
["las", "last", "las", "lásum", "lásuð", "lásu", "p"],
["skrifaði", "skrifaðir", "skrifaði", "skrifuðum", "skrifuðuð", "skrifuðu", "p"],
["gleymdi", "gleymdir", "gleymdi", "gleymdum", "gleymduð", "gleymdu", "p"],
["er að aðstoða", "ert að aðstoða", "er að aðstoða", "erum að aðstoða", "eruð að aðstoða", "eru að aðstoða", "np"],
["er að hjálpa", "ert að hjálpa", "er að hjálpa", "erum að hjálpa", "eruð að hjálpa", "eru að hjálpa", "np"],
["er að fylgja", "ert að fylgja", "er að fylgja", "erum að fylgja", "eruð að fylgja", "eru að fylgja", "np"],
["er að læra", "ert að læra", "er að læra", "erum að læra", "eruð að læra", "eru að læra", "np"],
["er að borða", "ert að borða", "er að borða", "erum að borða", "eruð að borða", "eru að borða", "np"],
["er að drekka", "ert að drekka", "er að drekka", "erum að drekka", "eruð að drekka", "eru að drekka", "np"],
["er að horfa á", "ert að horfa á", "er að horfa á", "erum að horfa á", "eruð að horfa á", "eru að horfa á", "np"],
["er að mála", "ert að mála", "er að mála", "erum að mála", "eruð að mála", "eru að mála", "np"],
["er að kaupa", "ert að kaupa", "er að kaupa", "erum að kaupa", "eruð að kaupa", "eru að kaupa", "np"],
["er að selja", "ert að selja", "er að selja", "erum að selja", "eruð að selja", "eru að selja", "np"],
["er að lesa", "ert að lesa", "er að lesa", "erum að lesa", "eruð að lesa", "eru að lesa", "np"],
["er að skrifa", "ert að skrifa", "er að skrifa", "erum að skrifa", "eruð að skrifa", "eru að skrifa", "np"],
["var að aðstoða", "varst að aðstoða", "var að aðstoða", "vorum að aðstoða", "voruð að aðstoða", "voru að aðstoða", "np"],
["var að hjálpa", "varst að hjálpa", "var að hjálpa", "vorum að hjálpa", "voruð að hjálpa", "voru að hjálpa", "np"],
["var að fylgja", "varst að fylgja", "var að fylgja", "vorum að fylgja", "voruð að fylgja", "voru að fylgja", "np"],
["var að læra", "varst að læra", "var að læra", "vorum að læra", "voruð að læra", "voru að læra", "np"],
["var að borða", "varst að borða", "var að borða", "vorum að borða", "voruð að borða", "voru að borða", "np"],
["var að drekka", "varst að drekka", "var að drekka", "vorum að drekka", "voruð að drekka", "voru að drekka", "np"],
["var að horfa á", "varst að horfa á", "var að horfa á", "vorum að horfa á", "voruð að horfa á", "voru að horfa á", "np"],
["var að mála", "varst að mála", "var að mála", "vorum að mála", "voruð að mála", "voru að mála", "np"],
["var að kaupa", "varst að kaupa", "var að kaupa", "vorum að kaupa", "voruð að kaupa", "voru að kaupa", "np"],
["var að selja", "varst að selja", "var að selja", "vorum að selja", "voruð að selja", "voru að selja", "np"],
["var að lesa", "varst að lesa", "var að lesa", "vorum að lesa", "voruð að lesa", "voru að lesa", "np"],
["var að skrifa", "varst að skrifa", "var að skrifa", "vorum að skrifa", "voruð að skrifa", "voru að skrifa", "np"],
];

const dictobj = [
["me", "mig", "acc", 0],
["you", "þig", "acc", 1],
["him", "hann", "acc", 2],
["her", "hana", "acc", 3],
["it", "það", "acc", 4],
["us", "okkur", "acc", 5],
["you (pl)", "ykkur", "acc", 6],
["them (m)", "þá", "acc", 7],
["them (f)", "þær", "acc", 8],
["them (n)", "þau", "acc", 9],
["me", "mér", "dat", 10],
["you", "þér", "dat", 11],
["him", "honum", "dat", 12],
["her", "henni", "dat", 13],
["it", "því", "dat", 14],
["us", "okkur", "dat", 15],
["you (pl)", "ykkur", "dat", 16],
["them (m)", "þeim", "dat", 17],
["them (f)", "þeim", "dat", 18],
["them (n)", "þeim", "dat", 19],
["me", "mín", "gen", 20],
["you", "þín", "gen", 21],
["him", "hans", "gen", 22],
["her", "hennar", "gen", 23],
["it", "þess", "gen", 24],
["us", "okkar", "gen", 25],
["you (pl)", "ykkar", "gen", 26],
["them (m)", "þeirra", "gen", 27],
["them (f)", "þeirra", "gen", 28],
["them (n)", "þeirra", "gen", 29],
["the dog", "hundinn", "acc", "adj", ["hvíta", "svarta", "stóra", "brúna"], ["white", "black", "big", "brown"], 30],
["a dog", "hund", "acc", "adj", ["hvítan", "svartan", "stóran", "brúnan"], ["white", "black", "big", "brown"], 31, "hundur"],
["the dog", "hundinum", "dat", "adj", ["hvíta", "svarta", "stóra", "brúna"], ["white", "black", "big", "brown"], 32],
["a dog", "hundi", "dat", "adj", ["hvítum", "svörtum", "stórum", "brúnum"], ["white", "black", "big", "brown"], 33],
["grammar", "málfræði", "acc", 34, "málfræði"],
["English", "ensku", "acc", 35, "enska"],
["the girl", "stelpuna", "acc", "adj", ["ljóshærðu", "hávöxnu"], ["blonde", "tall"], 36],
["a girl", "stelpu", "acc", "adj", ["ljóshærða", "hávaxna"], ["blonde", "tall"], 37, "stelpa"],
["the girl", "stelpunni", "dat", "adj", ["ljóshærðu", "hávöxnu"], ["blonde", "tall"], 38],
["a girl", "stelpu", "dat", "adj", ["ljóshærðri", "hávaxinni"], ["blonde", "tall"], 39],
["people", "fólk", "acc", 40, "fólk"],
["people", "fólki", "dat", 41],
["the sandwich", "samlokuna", "acc", 42],
["a sandwich", "samloku", "acc", 43, "samloka"],
["the chicken", "kjúklinginn", "acc", 44],
["chicken", "kjúkling", "acc", 45, "kjúklingur"],
["water", "vatn", "acc", 46, "vatn"],
["juice", "safa", "acc", 47, "safi"],
["beer", "bjór", "acc", 48, "bjór"],
["wine", "vín", "acc", 49, "vín"],
["coffee", "kaffi", "acc", 50, "kaffi"],
["the movie", "bíómyndina", "acc", "adj", ["nýju", "vinsælu", "leiðinlegu"], ["new", "popular", "boring"], 51],
["a movie", "bíómynd", "acc", "adj", ["nýja", "vinsæla", "leiðinlega"], ["new", "popular", "boring"], 52, "bíómynd"],
["movies", "bíómyndir", "acc", "adj", ["rómantískar", "vinsælar", "leiðinlegar"], ["romantic", "popular", "boring"], 53],
["the picture", "myndina", "acc", 54],
["a picture", "mynd", "acc", "adj", ["fallega", "nýja"], ["beautiful", "new"], 55, "mynd"],
["a book", "bók", "acc", "adj", ["gamla", "þykka"], ["old", "thick"], 56, "bók"],
["the book", "bókina", "acc", "adj", ["gömlu", "þykku"], ["old", "thick"], 57],
["books", "bækur", "acc", "adj", ["gamlar", "nýjar"], ["old", "new"], 58],
["the books", "bækurnar", "acc", "adj", ["gömlu", "nýju"], ["old", "new"], 59],
["a letter", "bréf", "acc", "adj", ["langt", "stutt"], ["long", "short"], 60, "bréf"],
["the letter", "bréfið", "acc", "adj", ["langa", "stutta"], ["long", "short"], 61],
["letters", "bréf", "acc", "adj", ["löng", "stutt"], ["long", "short"], 62],
["the letters", "bréfin", "acc", "adj", ["löngu", "stuttu"], ["long", "short"], 63],
["a chair", "stól", "acc", "adj", ["fallegan", "hvítan", "svartan"], ["beautiful", "white", "black"], 64, "stóll"],
["the chair", "stólinn", "acc", "adj", ["fallega", "hvíta", "svarta"], ["beautiful", "white", "black"], 65],
["chairs", "stóla", "acc", "adj", ["fallega", "hvíta", "svarta"], ["beautiful", "white", "black"], 66],
["the chairs", "stólana", "acc", "adj", ["fallegu", "hvítu", "svörtu"], ["beautiful", "white", "black"], 67],
["a wall", "vegg", "acc", 68, "veggur"],
["the wall", "vegginn", "acc", 69],
["the walls", "veggina", "acc", 70],
["the sandwich", "samlokunni", "dat", 71],
["a sandwich", "samloku", "dat", 72],
["a wallet", "veski", "dat", "adj", ["hvítu", "svörtu", "brúnu"], ["white", "black", "brúnu"], 73, "veski"],
["the wallet", "veskinu", "dat", "adj", ["hvíta", "svarta", "brúna"], ["white", "black", "brown"], 74],
["the wallet", "veskið", "acc", "adj", ["hvíta", "svarta", "brúna"], ["white", "black", "brown"], 75],
["a wallet", "veski", "acc", "adj", ["hvítt", "svart", "brúnt"], ["white", "black", "brown"], 76],
];

let randIndex1;
let randindex2;
let randindex3;
let cx;
let a;
let b;
let c;
let randadjsn;
let randadjs;
let adjs;
let trim1;
let trim2;
let adjsice;
let randadjon;
let randadjo;
let adjo;
let trim3;
let trim4;
let adjoice;
let varbut1;
let varbut2;
const vocabularylist = [["Icelandic", "íslenskur", "adjective"], ["new", "nýr", "adjective"],["old", "gamall", "adjective"],["blonde", "ljóshærður", "adjective"],["dark-haired", "dökkhærður", "adjective"],["French", "franskur", "adjective"],["young", "ungur", "adjective"],["white", "hvítur", "adjective"],["black", "svartur", "adjective"],["brown", "brúnn", "adjective"],["big", "stór", "adjective"],["tall", "hávaxinn", "adjective"],["popular", "vinsæll", "adjective"],["boring", "leiðinlegur", "adjective"],["beautiful", "fallegur", "adjective"],["romantic", "rómantískur", "adjective"],["thick", "þykkur", "adjective"],["American", "bandarískur", "adjective"],["dad", "pabbi", "nominal"],["mum", "mamma", "nominal"],["sister", "systir", "nominal"],["brother", "bróðir", "nominal"],["long", "langur", "adjective"],["famous", "frægur", "adjective"],["friend", "vinur", "nominal"]];

genvocab();

document.getElementById("subjeng").innerHTML = "-";
document.getElementById("verbeng").innerHTML = "-";
document.getElementById("objeng").innerHTML = "-";
document.getElementById("subjice").value = "";
document.getElementById("verbice").value = "";
document.getElementById("objice").value = "";

function generate() {
if (count > 0) {
chronol();
}
adjs = "";
trim1 = "";
trim2 = "";
adjsice = "";
adjo = "";
trim3 = "";
trim4 = "";
adjoice = "";
varbut1 = 0;
varbut2 = 0;
document.getElementById("subjice").value = "";
document.getElementById("verbice").value = "";
document.getElementById("objice").value = "";
document.getElementById("subjice").style.color = "#000000";
document.getElementById("verbice").style.color = "#000000";
document.getElementById("objice").style.color = "#000000";
document.getElementById("subjices").innerHTML = "-";
document.getElementById("verbices").innerHTML = "-";
document.getElementById("objices").innerHTML = "-";
document.getElementById("subjices").style.color = "#000000";
document.getElementById("verbices").style.color = "#000000";
document.getElementById("objices").style.color = "#000000";
document.getElementById("subjice").disabled = false;
document.getElementById("verbice").disabled = false;
document.getElementById("objice").disabled = false;
randindex1 = Math.floor(Math.random() * dictsubj.length);
randindex2 = Math.floor(Math.random() * dictverb.length);
randindex3 = Math.floor(Math.random() * dictverb[randindex2][3].length);

a = dictsubj[randindex1][0];
if (dictsubj[randindex1][2] == 2) {
b = dictverb[randindex2][1];
} else {
b = dictverb[randindex2][0];
}
cx = dictverb[randindex2][3][randindex3];
c = dictobj[cx][0];


if (dictsubj[randindex1][3] == "adj") {
document.getElementById("subjeng").innerHTML = a + ' <button id="adjs" onclick="addadjs()">+adj</button>';
varbut1 = 1;
} else if (dictsubj[randindex1][3] !== "adj") {
document.getElementById("subjeng").innerHTML = a;
}

document.getElementById("verbeng").innerHTML = b;

if (dictobj[cx][3] == "adj") {
document.getElementById("objeng").innerHTML = c + ' <button id="adjo" onclick="addadjo()">+adj</button>';
varbut2 = 1;
console.log(dictobj[cx][3]);
} else if (dictobj[cx][3] !== "adj")  {
document.getElementById("objeng").innerHTML = c;
}

document.getElementById("verif").disabled = false;
document.getElementById("subjice").disabled = false;
document.getElementById("verbice").disabled = false;
document.getElementById("objice").disabled = false;
document.getElementById("gener").disabled = true;
count++;
}

function addadjs() {
document.getElementById("adjs").remove();
randadjsn = Math.floor(Math.random() * dictsubj[randindex1][5].length);
randadjs = dictsubj[randindex1][5][randadjsn];
adjsice = dictsubj[randindex1][4][randadjsn];
console.log(randadjsn);
console.log(randadjs);
if (a.substring(0,4) == "The ") {
trim1 = 'The ' + randadjs + " ";
trim2 = a.substring(4);
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = trim1 + trim2;
}
if (a.substring(0,2) == "A " & /[aeiouAEIOU]/.test(randadjs.substring(0,1)) == false) {
console.log(randadjs.substring(0,1));
trim1 = 'A ' + randadjs + " ";
trim2 = a.substring(2);
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = trim1 + trim2;
}
if (a.substring(0,2) == "A " & /[aeiouAEIOU]/.test(randadjs.substring(0,1)) == true) {
console.log(randadjs.substring(0,1));
trim1 = 'An ' + randadjs + " ";
trim2 = a.substring(2);
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = trim1 + trim2;
}
if (a.substring(0,3) == "An " & /[aeiouAEIOU]/.test(randadjs.substring(0,1)) == true) {
console.log(randadjs.substring(0,1));
trim1 = 'An ' + randadjs + " ";
trim2 = a.substring(3);
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = trim1 + trim2;
}
if (a.substring(0,3) == "An " & /[aeiouAEIOU]/.test(randadjs.substring(0,1)) == false) {
console.log(randadjs.substring(0,1));
trim1 = 'A ' + randadjs + " ";
trim2 = a.substring(3);
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = trim1 + trim2;
}
}

function addadjo() {
document.getElementById("adjo").remove();
randadjon = Math.floor(Math.random() * dictobj[cx][5].length);
randadjo = dictobj[cx][5][randadjon];
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = randadjo + " " + c;
console.log(randadjon);
console.log(randadjo);
if (c.substring(0,4) == "the ") {
trim3 = 'the ' + randadjo + " ";
trim4 = c.substring(4);
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = trim3 + trim4;
}
if (c.substring(0,2) == "a " & /[aeiouAEIOU]/.test(randadjo.substring(0,1)) == false) {
trim3 = 'a ' + randadjo + " ";
trim4 = c.substring(2);
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = trim3 + trim4;
}
if (c.substring(0,2) == "a " & /[aeiouAEIOU]/.test(randadjo.substring(0,1)) == true) {
trim3 = 'an ' + randadjo + " ";
trim4 = c.substring(2);
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = trim3 + trim4;
}
if (c.substring(0,3) == "an " & /[aeiouAEIOU]/.test(randadjo.substring(0,1)) == true) {
trim3 = 'an ' + randadjo + " ";
trim4 = c.substring(3);
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = trim3 + trim4;
}
if (c.substring(0,3) == "an " & /[aeiouAEIOU]/.test(randadjo.substring(0,1)) == false) {
trim3 = 'a ' + randadjo + " ";
trim4 = c.substring(3);
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = trim3 + trim4;
}
}

function chronol() {
document.getElementById("tit").style.display = "block";
let a1 = document.getElementById("subjices").innerHTML;
let a2 = document.getElementById("verbices").innerHTML;
let a3 = document.getElementById("objices").innerHTML;
//let b1 = document.getElementById("subjice").value;
//let b2 = document.getElementById("verbice").value;
//let b3 = document.getElementById("objice").value;
let c1 = document.getElementById("subjeng").innerHTML;
let c2 = document.getElementById("verbeng").innerHTML;
let c3 = document.getElementById("objeng").innerHTML;
let tabx = document.getElementById("chron");
var row1 = tabx.insertRow();
var cell1 = row1.insertCell();
cell1.innerHTML = count;
var cell2 = row1.insertCell();
cell2.innerHTML = c1;
var cell3 = row1.insertCell();
var cell4 = row1.insertCell();
cell3.innerHTML = c2;
cell4.innerHTML = c3;
//var row2 = tabx.insertRow();
//row2.insertCell();
//var cell5 = row2.insertCell();
//var cell6 = row2.insertCell();
//var cell7 = row2.insertCell();
//cell5.innerHTML = b1;
//cell6.innerHTML = b2;
//cell7.innerHTML = b3;
var row3 = tabx.insertRow();
row3.insertCell();
var cell8 = row3.insertCell();
var cell9 = row3.insertCell();
var cell10 = row3.insertCell();
cell8.innerHTML = a1;
cell9.innerHTML = a2;
cell10.innerHTML = a3;
if (document.getElementById("subjices").style.color !== "rgb(0, 255, 0)" || document.getElementById("verbices").style.color !== "rgb(0, 255, 0)" || document.getElementById("objices").style.color !== "rgb(0, 255, 0)") {
cell8.style.color = "#FF0000";
cell9.style.color = "#FF0000";
cell10.style.color = "#FF0000";
} else if (document.getElementById("subjices").style.color == "rgb(0, 255, 0)" && document.getElementById("verbices").style.color == "rgb(0, 255, 0)" && document.getElementById("subjices").style.color == "rgb(0, 255, 0)") {
cell8.style.color = "#000000";
cell9.style.color = "#000000";
cell10.style.color = "#000000";
totcorr++;
}
document.getElementById("totcount").innerHTML = "Correct sentences: " + totcorr + "/" + count;
}

function verif() {
document.getElementById("verif").disabled = true;
var x = document.getElementById("subjice").value.toLowerCase();
var y = document.getElementById("verbice").value.toLowerCase();
var z = document.getElementById("objice").value.toLowerCase();

if (adjsice == "" & varbut1 == 0) {
if (x == dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#00ff00";
document.getElementById("subjices").innerHTML = x;
document.getElementById("subjices").style.color = "#00ff00";
}
if (x !== dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#ff0000";
document.getElementById("subjices").innerHTML = dictsubj[randindex1][1];
document.getElementById("subjices").style.color = "#ff0000";
}
}

if (adjsice == "" & varbut1 == 1) {
document.getElementById("adjs").remove();
if (x == dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#00ff00";
document.getElementById("subjices").innerHTML = x;
document.getElementById("subjices").style.color = "#00ff00";
}
if (x !== dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#ff0000";
document.getElementById("subjices").innerHTML = dictsubj[randindex1][1];
document.getElementById("subjices").style.color = "#ff0000";
}
}

if (adjsice !== "") {
let wholestr = adjsice + " " + dictsubj[randindex1][1].toLowerCase();
console.log(wholestr);
console.log(adjsice);
if (x == wholestr) {
document.getElementById("subjice").style.color = "#00ff00";
document.getElementById("subjices").innerHTML = wholestr;
document.getElementById("subjices").style.color = "#00ff00";
} else {
document.getElementById("subjice").style.color = "#ff0000";
document.getElementById("subjices").innerHTML = wholestr;
document.getElementById("subjices").style.color = "#ff0000";
}
}

var yform = dictsubj[randindex1][2];
var yform1 = dictverb[randindex2][2];
var yform2 = arrayv[yform1][yform];

if (y == yform2.toLowerCase()) {
document.getElementById("verbice").style.color = "#00ff00";
document.getElementById("verbices").innerHTML = y;
document.getElementById("verbices").style.color = "#00ff00";
} else {
document.getElementById("verbice").style.color = "#ff0000";
document.getElementById("verbices").innerHTML = yform2;
document.getElementById("verbices").style.color = "#ff0000";
}

if (adjoice == "" & varbut2 == 0) {
if (z == dictobj[cx][1].toLowerCase()) {
document.getElementById("objice").style.color = "#00ff00";
document.getElementById("objices").innerHTML = z;
document.getElementById("objices").style.color = "#00ff00";
}
if (z !== dictobj[cx][1].toLowerCase()) {
document.getElementById("objice").style.color = "#ff0000";
document.getElementById("objices").innerHTML = dictobj[cx][1];
document.getElementById("objices").style.color = "#ff0000";
}
}

if (adjoice == "" & varbut2 == 1) {
document.getElementById("adjo").remove();
if (z == dictobj[cx][1].toLowerCase()) {
document.getElementById("objice").style.color = "#00ff00";
document.getElementById("objices").innerHTML = z;
document.getElementById("objices").style.color = "#00ff00";
}
if (z !== dictobj[cx][1].toLowerCase()) {
document.getElementById("objice").style.color = "#ff0000";
document.getElementById("objices").innerHTML = dictobj[cx][1];
document.getElementById("objices").style.color = "#ff0000";
}
}

if (adjoice !== "") {
let wholestr2 = adjoice + " " + dictobj[cx][1].toLowerCase();
if (z == wholestr2) {
document.getElementById("objice").style.color = "#00ff00";
document.getElementById("objices").innerHTML = wholestr2;
document.getElementById("objices").style.color = "#00ff00";
} else {
document.getElementById("objice").style.color = "#ff0000";
document.getElementById("objices").innerHTML = wholestr2;
document.getElementById("objices").style.color = "#ff0000";
}
}

if (x == "" & y == "" & z == "") {
document.getElementById("subjice").style.color = "#000000";
document.getElementById("verbice").style.color = "#000000";
document.getElementById("objice").style.color = "#000000";
document.getElementById("subjice").disabled = true;
document.getElementById("verbice").disabled = true;
document.getElementById("objice").disabled = true;
document.getElementById("subjices").style.color = "#0000ff";
document.getElementById("verbices").style.color = "#0000ff";
document.getElementById("objices").style.color = "#0000ff";
}

document.getElementById("gener").disabled = false;
}

function showinfo() {
document.getElementById("info").style.display = "block";
document.getElementById("about").style.display = "none";
document.getElementById("previous").style.display = "none";
document.getElementById("vocablistside").style.display = "none";
document.getElementById("settings").style.display = "none";
}

function showsett() {
    document.getElementById("info").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("previous").style.display = "none";
    document.getElementById("vocablistside").style.display = "none";
    document.getElementById("settings").style.display = "block";
}

function showvocab() {
    document.getElementById("vocablistside").style.display = "block";
    document.getElementById("info").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("previous").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function showabout() {
document.getElementById("info").style.display = "none";
document.getElementById("about").style.display = "block";
document.getElementById("previous").style.display = "none";
document.getElementById("vocablistside").style.display = "none";
document.getElementById("settings").style.display = "none";
}

function showprev() {
document.getElementById("info").style.display = "none";
document.getElementById("about").style.display = "none";
document.getElementById("previous").style.display = "block";
document.getElementById("vocablistside").style.display = "none";
document.getElementById("settings").style.display = "none";
}

function genvocab() {
    for (let a = 0; a < dictsubj.length; a++) {
        let v = dictsubj[a].slice();
        if (v[0].substring(0,2) == "A ") {
        v[0] = v[0].substring(2);
        }
        if (v[0].substring(0,3) == "An ") {
            v[0] = v[0].substring(3);
        }
        let va = v[v.length-1];
        if (va == "x") {
            vocabularylist.push([v[0], v[1], "nominal"]);
        }
    }
    for (let a = 0; a < arrayv.length; a++) {
        let v = arrayv[a];
        let va = v[v.length-1];
        let vx = dictverb[a];
        if (va == "n") {
            vocabularylist.push([vx[0], v[5], "verb"]);
        }
    }
    for (let a = 0; a < dictobj.length; a++) {
        let v = dictobj[a].slice();
        if (v[0].substring(0,2) == "a ") {
            v[0] = v[0].substring(2);
        }
        if (v[0].substring(0,3) == "an ") {
            v[0] = v[0].substring(3);
        }
        if (v[0].substring(0,4) == "the ") {
            v[0] = v[0].substring(4);
        }
        let va = v[v.length-1];
        if (Number.isInteger(va) == false) {
            vocabularylist.push([v[0], v[v.length-1], "nominal"]);
        }
    }
    vocabularylist.sort((a, b) => a[0].localeCompare(b[0]));
    for (let c = 0; c < vocabularylist.length; c++) {
        var table = document.getElementById("sbroc");
        var row = table.insertRow(c);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = "<p>" + vocabularylist[c][0].charAt(0).toUpperCase() + vocabularylist[c][0].substring(1) + "</p>";
        cell2.innerHTML = "<p>" + vocabularylist[c][1] + "</p>";
        cell3.innerHTML = "<p>" + vocabularylist[c][2] + "</p>";
    }
    var table = document.getElementById("sbroc");
    var head = table.createTHead();
    var rowt = head.insertRow(c);
    var cell1a = rowt.insertCell(0);
    var cell2a = rowt.insertCell(1);
    var cell3a = rowt.insertCell(2);
    cell1a.innerHTML = "<p><b>English lemma</b></p>";
    cell2a.innerHTML = "<p><b>Icelandic lemma</b></p>";
    cell3a.innerHTML = "<p><b>Type</b></p>";
}
