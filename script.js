// Neistinn - Sentence building trainer for learners of Icelandic - A1/B1 level
// Ver 1.1 (Jun 2026)
// Author: Mirko Garofalo (mig@hi.is)

// Preparation of the page

let count;
let totcorr;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("verif").disabled = true;
    document.getElementById("subjice").disabled = true;
     document.getElementById("verbice").disabled = true;
     document.getElementById("objice").disabled = true;
     count = 0;
     totcorr = 0;

});

// Major variables and constant arrays

let dictsubj = [];
let dictverb = [];
let dicttimepl = [];

let subja1nom = [];
let subja1acc = [];
let subja2nom = [];
let subja2acc = [];
let subjb1nom = [];
let subjb1acc = [];
let verba1 = [];
let verba2 = [];
let verbb1 = [];
let obja1acc = [];
let obja1dat = [];
let obja1gen = [];
let obja2acc = [];
let obja2dat = [];
let obja2gen = [];
let objb1acc = [];
let objb1dat = [];
let objb1gen = [];

const modalverbs = [
["þurfa", "þarf", 5, 3, "þurf", "þurf", "þurft", "", "að", ["nt.", "þt."]],
["vilja", "vil", 8, 2, "vil", "vil", "viljað", "", "", ["nt.", "þt."]],
["verða", "verð", 2, 4, "varð", "urð", "orðið", "", "að", ["nt.", "þt."]],
["mega", "má", 7, 3, "mát", "mát", "mátt", "", "", ["nt.", "þt."]],
["eiga", "á", 7, 3, "át", "át", "átt", "", "að", ["nt.", "þt."]],
["geta", "get", 2, 10, "ga", "gát", "getað", "", "", ["nt.", "þt."]],
["hafa", "hef", 2, 1, "haf", "höf", "haft", "", "", ["nt.", "þt."]],
];

const dictsubjnom = [
["ég", "ég", 0],
["þú", "þú", 1],
["hann", "hann", 2],
["hún", "hún", 2],
["það", "það", 2],
["við", "við", 3],
["þið", "þið", 4],
["þeir", "þeir", 5],
["þær", "þær", 5],
["þau", "þau", 5],
["nemandi+gr.", "nemandinn", 2, "adj", ["íslenski", "nýi"], ["íslenskur", "nýr"]],
["nemandi", "nemandi", 2, "adj", ["íslenskur", "nýr"], ["íslensku", "nýr"]],
["kennari+gr.", "kennarinn", 2, "adj", ["gamli", "ljóshærði", "dökkhærði", "nýi"], ["gamall", "ljóshærður", "dökkhærður", "nýr"]],
["kennari", "kennari", 2, "adj", ["gamall", "ljóshærður", "dökkhærður"], ["gamall", "ljóshærður", "dökkhærður"]],
["ferðamaður+gr.", "ferðamaðurinn", 2, "adj", ["franski", "ungi"], ["franskur", "ungur"]],
["ferðamaður (ft.)", "ferðamenn", 5],
["ferðamaður+gr. (ft.)", "ferðamennirnir", 5, "adj", ["ungu", "bandarísku"], ["ungur", "bandarískur"]],
["ferðamaður", "ferðamaður", 2, "adj", ["franskur", "ungur"], ["franskur", "ungur"]],
["mamma - þinn", "mamma þín", 2],
["pabbi - þinn", "pabbi þinn", 2],
["systir - þinn", "systir þín", 2],
["bróðir - þinn", "bróðir þinn", 2],
["vinur (ft.) - minn", "vinir mínir", 5],
["vinur (ft.) - þinn", "vinir þínir", 5],
["vinur - þinn", "vinur þinn", 2],
["vinur - minn", "vinur minn", 2],
["leikkona", "leikkona", 2, "adj", ["fræg", "ung"], ["frægur", "ungur"]],
["leikkona+gr.", "leikkonan", 2, "adj", ["fræga", "unga"], ["frægur", "ungur"]],
["leikkona+gr. (ft.)", "leikkonurnar", 5, "adj", ["frægu", "ungu"], ["frægur", "ungur"]],
["kærasti+gr. - minn", "kærastinn minn", 2],
["kærasti+gr. - þinn", "kærastinn þinn", 2],
["kærasta+gr. - þinn", "kærastan þín", 2],
["kærasta+gr. - minn", "kærastan mín", 2],
["stjóri+gr.", "stjórinn", 2, "adj", ["ungi", "gamli"], ["ungur", "gamall"]],
["stjóri", "stjóri", 2, "adj", ["ungur", "gamall"], ["ungur", "gamall"]],
["nágranni", "nágranni", 2, "adj", ["ungur", "gamall"], ["ungur", "gamall"]],
["nágranni+gr.", "nágranninn", 2, "adj", ["ungi", "gamli"], ["ungur", "gamall"]],
["nágranni+gr. (ft.)", "nágrannarnir", 5, "adj", ["ungu", "gömlu"], ["ungur", "gamall"]],
["dóttir - minn", "dóttir mín", 2],
["sonur - minn", "sonur minn", 2],
["barn+gr. (ft.) - minn", "börnin mín", 5],
["dóttir (ft.) - minn", "dætur mínar", 5],
["sonur (ft.) - minn", "synir mínir", 5],
["dóttir - þinn", "dóttir þín", 2],
["sonur - þinn", "sonur þinn", 2],
["barn+gr. (ft.) - þinn", "börnin þín", 5],
["dóttir (ft.) - þinn", "dætur þínar", 5],
["sonur (ft.) - þinn", "synir þínir", 5],
["fjölskylda+gr. - minn", "fjölskyldan mín", 2],
["fjölskylda+gr. - þinn", "fjölskyldan þín", 2],
];

const dictsubjacc = [
["ég", "mig", 2],
["þú", "þig", 2],
["hann", "hann", 2],
["hún", "hana", 2],
["það", "það", 2],
["við", "okkur", 2],
["þið", "ykkur", 2],
["þeir", "þá", 2],
["þær", "þær", 2],
["þau", "þau", 2],
["nemandi+gr.", "nemandann", 2, "adj", ["íslenska", "nýja"], ["íslenskur", "nýr"]],
["nemandi", "nemanda", 2, "adj", ["íslenskan", "nýjan"], ["íslenskur", "nýr"]],
["kennari+gr.", "kennarann", 2, "adj", ["gamla", "ljóshærða", "dökkhærða", "nýja"], ["gamall", "ljóshærður", "dökkhærður", "nýr"]],
["kennari", "kennara", 2, "adj", ["gamlan", "ljóshærðan", "dökkhærðan"], ["gamall", "ljóshærður", "dökkhærður"]],
["ferðamaður+gr.", "ferðamanninn", 2, "adj", ["franska", "unga"], ["franskur", "ungur"]],
["ferðamaður (ft.)", "ferðamenn", 2],
["ferðamaður+gr. (ft.)", "ferðamennina", 2, "adj", ["ungu", "bandarísku"], ["ungur", "bandarískur"]],
["ferðamaður", "ferðamann", 2, "adj", ["franskan", "ungan"], ["franskur", "ungur"]],
["mamma - þinn", "mömmu þína", 2],
["pabbi - þinn", "pabba þinn", 2],
["systir - þinn", "systur þína", 2],
["bróðir - þinn", "bróður þinn", 2],
["vinur (ft.) - minn", "vini mína", 2],
["vinur (ft.) - þinn", "vini þína", 2],
["vinur - þinn", "vin þinn", 2],
["vinur - minn", "vin minn", 2],
["leikkona", "leikkonu", 2, "adj", ["fræga", "unga"], ["frægur", "ungur"]],
["leikkona+gr.", "leikkonuna", 2, "adj", ["frægu", "ungu"], ["frægur", "ungur"]],
["leikkona+gr. (ft.)", "leikkonurnar", 2, "adj", ["frægu", "ungu"], ["frægur", "ungur"]],
["kærasti+gr. - minn", "kærastann minn", 2],
["kærasti+gr. - þinn", "kærastann þinn", 2],
["kærasta+gr. - þinn", "kærustuna þína", 2],
["kærasta+gr. - minn", "kærustuna mína", 2],
["stjóri+gr.", "stjórann", 2, "adj", ["unga", "gamla"], ["ungur", "gamall"]],
["stjóri", "stjóra", 2, "adj", ["ungan", "gamlan"], ["ungur", "gamall"]],
["nágranni", "nágranna", 2, "adj", ["ungan", "gamlan"], ["ungur", "gamall"]],
["nágranni+gr.", "nágrannann", 2, "adj", ["unga", "gamla"], ["ungur", "gamall"]],
["nágranni+gr. (ft.)", "nágrannana", 2, "adj", ["ungu", "gömlu"], ["ungur", "gamall"]],
["dóttir - minn", "dóttur mína", 2],
["sonur - minn", "son minn", 2],
["barn+gr. (ft.) - minn", "börnin mín", 2],
["dóttir (ft.) - minn", "dætur mínar", 2],
["sonur (ft.) - minn", "syni mína", 2],
["dóttir - þinn", "dóttur þína", 2],
["sonur - þinn", "son þinn", 2],
["barn+gr. (ft.) - þinn", "börnin þín", 2],
["dóttir (ft.) - þinn", "dætur þínar", 2],
["sonur (ft.) - þinn", "syni þína", 2],
["fjölskylda+gr. - minn", "fjölskylduna mína", 2],
["fjölskylda+gr. - þinn", "fjölskylduna þína", 2],
];

const vbendingspres = [
["a", "ar", "ar", "um", "ið"],
["i", "ir", "ir", "um", "ið"],
["", "ur", "ur", "um", "ið"],
["", "ð", "", "um", "ið"],
["", "rð", "r", "um", "ið"],
["", "t", "", "um", "ið"],
["st", "st", "st", "umst", "ist"],
["", "tt", "", "um", "ið"],
["", "t", "l", "um", "ið"],
];

const vbendingspast = [
["aði", "aðir", "aði", "uðum", "uðuð","uðu"],
["ði", "ðir", "ði", "ðum", "ðuð","ðu"],
["di", "dir", "di", "dum", "duð","du"],
["ti", "tir", "ti", "tum", "tuð","tu"],
["", "st", "", "um", "uð", "u"],
["", "t", "", "um", "uð", "u"],
["aðist", "aðist", "aðist", "uðumst", "uðust", "uðust"],
["ðist", "ðist", "ðist", "ðumst", "ðust", "ðust"],
["dist", "dist", "dist", "dumst", "dust", "dust"],
["tist", "tist", "tist", "tumst", "tust", "tust"],
["t", "st", "t", "um", "uð", "u"],
];

const dictverbnom = [
["aðstoða", "aðstoð", 0, 0, "aðstoð", "aðstoð", "aðstoðað", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 36, 37, 40], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["hjálpa", "hjálp", 0, 0, "hjálp", "hjálp", "hjálpað", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 39, 41], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["sakna", "sakn", 0, 0, "sakn", "sökn", "saknað", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], "", ["nt.", "þt.", "nt.md.", "þt.md."]],
["sjá", "sé", 4, 5, "sá", "sá", "séð", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 30, 31, 36, 37, 64, 65, 66, 67, 89, 90, 122], "", ["nt.", "þt.", "nt.md.", "þt.md."]],
["læra", "lær", 1, 1, "lær", "lær", "lært", [34, 35, 123], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["borða", "borð", 0, 0, "borð", "borð", "borðað", [42, 43, 44, 45, 132, 133, 134, 135, 136, 137], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["drekka", "drekk", 2, 4, "drakk", "drukk", "drukkið", [46, 47, 48, 49, 50, 123], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["horfa", "horf", 1, 1, "horf", "horf", "horft", [51, 52, 53, 123], "á", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["mála", "mál", 0, 0, "mál", "mál", "málað", [54, 55, 68, 69, 70], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["kaupa", "kaup", 1, 3, "keyp", "keyp", "keypt", [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76, 77, 78, 79, 80, 89, 90], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["selja", "sel", 2, 2, "sel", "sel", "selt", [30, 31, 42, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 64, 65, 66, 67, 75, 76, 77, 78, 79, 80, 89, 90], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["lesa", "les", 5, 5, "las", "lás", "lesið", [56, 57, 58, 59, 60, 61, 62, 63], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["skrifa", "skrif", 0, 0, "skrif", "skrif", "skrifað", [56, 57, 58, 59, 60, 61, 62, 63, 123], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["gleyma", "gleym", 1, 2, "gleym", "gleym", "gleymt", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 71, 72, 73, 74, 81, 82, 85, 86, 91, 92, 113, 124], "", ["nt.", "þt.", "nt.md.", "þt.md."]],
["týna", "týn", 1, 2, "týn", "týn", "týnt", [73, 74, 81, 82, 91, 92, 113], "", ["nt.", "þt.", "nt.md.", "þt.md."]],
["búa", "bý", 4, 4, "bjó", "bjugg", "búið", [42, 43, 50, 83, 84], "til", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["kasta", "kast", 0, 0, "kast", "köst", "kastað", [87, 88, 93, 94], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["henda", "hend", 1, 3, "hen", "hen", "hent", [71, 72], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["elda", "eld", 0, 0, "eld", "eld", "eldað", [42, 43, 44, 45, 123], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["stela", "stel", 2, 4, "stal", "stál", "stolið", [32, 33, 71, 74, 81, 87, 88, 91, 92, 93, 94, 113], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["skila", "skil", 0, 0, "skil", "skil", "skilað", [100, 101, 102, 103, 113], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["spila", "spil", 0, 0, "spil", "spil", "spilað", [97, 98, 99], "á", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["hlusta", "hlust", 0, 0, "hlust", "hlust", "hlustað", [104], "á", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["gleðjast", "gleð", 6, 8, "glad", "glöd", "glaðst", [105, 106, 107], "yfir", ["nt.", "þt.", "nt.md.", "þt.md."]],
["taka", "tek", 2, 4, "tók", "tók", "tekið", [108, 109, 110], "upp", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["taka", "tek", 2, 4, "tók", "tók", "tekið", [111, 112, 56, 57 ,75], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["opna", "opn", 0, 0, "opn", "opn", "opnað", [56, 57, 75, 114, 116, 117], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["loka", "lok", 0, 0, "lok", "lok", "lokað", [115, 118, 119], "", ["nt.", "þt.", "s.nt.", "s.þt.", "s.frt.", "nt.md.", "þt.md."]],
["hafa", "hef", 2, 1, "haf", "höf", "haft", [120, 121], "", ["nt.", "þt.", "nt.md.", "þt.md."]],
["fara", "fer", 3, 4, "fór", "fór", "farið", [125, 126, 127, 128, 129, 130, 131], "í", ["nt.", "þt.", "nt.md.", "þt.md."]],
];

const dictverbacc = [
["langa", "lang", 0, 0, "lang", "lang", "langað", [89, 123, 43, 45, 46, 132, 133, 134, 135, 136, 137], "í", ["nt.", "þt."]],
["vanta", "vant", 0, 0, "vant", "vant", "vantað", [64, 89, 65, 56, 57], "", ["nt.", "þt."]],
];

const dictobj = [
["ég", "mig", "þf.", 0],
["þú", "þig", "þf.", 1],
["hann", "hann", "þf.", 2],
["hún", "hana", "þf.", 3],
["það", "það", "þf.", 4],
["við", "okkur", "þf.", 5],
["þið", "ykkur", "þf.", 6],
["þeir", "þá", "þf.", 7],
["þær", "þær", "þf.", 8],
["þau", "þau", "þf.", 9],
["ég", "mér", "þgf.", 10],
["þú", "þér", "þgf.", 11],
["hann", "honum", "þgf.", 12],
["hún", "henni", "þgf.", 13],
["það", "því", "þgf.", 14],
["við", "okkur", "þgf.", 15],
["þið", "ykkur", "þgf.", 16],
["þeir", "þeim", "þgf.", 17],
["þær", "þeim", "þgf.", 18],
["þau", "þeim", "þgf.", 19],
["ég", "mín", "ef.", 20],
["þú", "þín", "ef.", 21],
["hann", "hans", "ef.", 22],
["hún", "hennar", "ef.", 23],
["það", "þess", "ef.", 24],
["við", "okkar", "ef.", 25],
["þið", "ykkar", "ef.", 26],
["þeir", "þeirra", "ef.", 27],
["þær", "þeirra", "ef.", 28],
["þau", "þeirra", "ef.", 29],
["hundur+gr.", "hundinn", "þf.", "adj", ["hvíta", "svarta", "stóra", "brúna"], ["hvítur", "svartur", "stór", "brúnn"], 30],
["hundur", "hund", "þf.", "adj", ["hvítan", "svartan", "stóran", "brúnan"], ["hvítur", "svartur", "stór", "brúnn"], 31],
["hundur+gr.", "hundinum", "þgf.", "adj", ["hvíta", "svarta", "stóra", "brúna"], ["hvítur", "svartur", "stór", "brúnn"], 32],
["hundur", "hundi", "þgf.", "adj", ["hvítum", "svörtum", "stórum", "brúnum"], ["hvítur", "svartur", "stór", "brúnn"], 33],
["málfræði", "málfræði", "þf.", 34],
["enska", "ensku", "þf.", 35],
["stelpa+gr.", "stelpuna", "þf.", "adj", ["ljóshærðu", "hávöxnu"], ["ljóshærður", "hávaxinn"], 36],
["stelpa", "stelpu", "þf.", "adj", ["ljóshærða", "hávaxna"], ["ljóshærður", "hávaxinn"], 37],
["stelpa+gr.", "stelpunni", "þgf.", "adj", ["ljóshærðu", "hávöxnu"], ["ljóshærður", "hávaxinn"], 38],
["stelpa", "stelpu", "þgf.", "adj", ["ljóshærðri", "hávaxinni"], ["ljóshærður", "hávaxinn"], 39],
["fólk", "fólk", "þf.", 40],
["fólk", "fólki", "þgf.", 41],
["samloka+gr.", "samlokuna", "þf.", 42],
["samloka", "samloku", "þf.", 43],
["kjúklingur+gr.", "kjúklinginn", "þf.", 44],
["kjúklingur", "kjúkling", "þf.", 45],
["vatn", "vatn", "þf.", 46],
["safi", "safa", "þf.", 47],
["bjór", "bjór", "þf.", 48],
["vín", "vín", "þf.", 49],
["kaffi", "kaffi", "þf.", 50],
["bíómynd+gr.", "bíómyndina", "þf.", "adj", ["nýju", "vinsælu", "leiðinlegu"], ["nýr", "vinsæll", "leiðinlegur"], 51],
["bíómynd", "bíómynd", "þf.", "adj", ["nýja", "vinsæla", "leiðinlega"], ["nýr", "vinsæll", "leiðinlegur"], 52],
["bíómynd (ft.)", "bíómyndir", "þf.", "adj", ["rómantískar", "vinsælar", "leiðinlegar"], ["rómantískur", "vinsæll", "leiðinlegur"], 53],
["mynd+gr.", "myndina", "þf.", 54],
["mynd", "mynd", "þf.", "adj", ["fallega", "nýja"], ["fallegur", "nýr"], 55],
["bók", "bók", "þf.", "adj", ["gamla", "þykka"], ["gamall", "þykkur"], 56],
["bók+gr.", "bókina", "þf.", "adj", ["gömlu", "þykku"], ["gamall", "þykkur"], 57],
["bók (ft.)", "bækur", "þf.", "adj", ["gamlar", "nýjar"], ["gamall", "nýr"], 58],
["bók+gr. (ft.)", "bækurnar", "þf.", "adj", ["gömlu", "nýju"], ["gamall", "nýr"], 59],
["bréf", "bréf", "þf.", "adj", ["langt", "stutt"], ["langur", "stuttur"], 60],
["bréf+gr.", "bréfið", "þf.", "adj", ["langa", "stutta"], ["langur", "stuttur"], 61],
["bréf (ft.)", "bréf", "þf.", "adj", ["löng", "stutt"], ["langur", "stuttur"], 62],
["bréf+gr. (ft.)", "bréfin", "þf.", "adj", ["löngu", "stuttu"], ["langur", "stuttur"], 63],
["stóll", "stól", "þf.", "adj", ["fallegan", "hvítan", "svartan"], ["fallegur", "hvítur", "svartur"], 64],
["stóll+gr.", "stólinn", "þf.", "adj", ["fallega", "hvíta", "svarta"], ["fallegur", "hvítur", "svartur"], 65],
["stóll (ft.)", "stóla", "þf.", "adj", ["fallega", "hvíta", "svarta"], ["fallegur", "hvítur", "svartur"], 66],
["stóll+gr. (ft.)", "stólana", "þf.", "adj", ["fallegu", "hvítu", "svörtu"], ["fallegur", "hvítur", "svartur"], 67],
["veggur", "vegg", "þf.", 68],
["veggur+gr.", "vegginn", "þf.", 69],
["veggur+gr. (ft.)", "veggina", "þf.", 70],
["samloka+gr.", "samlokunni", "þgf.", 71],
["samloka", "samloku", "þgf.", 72],
["veski", "veski", "þgf.", "adj", ["hvítu", "svörtu", "brúnu"], ["hvítur", "svartur", "brúnn"], 73],
["veski+gr.", "veskinu", "þgf.", "adj", ["hvíta", "svarta", "brúna"], ["hvítur", "svartur", "brúnn"], 74],
["veski+gr.", "veskið", "þf.", "adj", ["hvíta", "svarta", "brúna"], ["hvítur", "svartur", "brúnn"], 75],
["veski", "veski", "þf.", "adj", ["hvítt", "svart", "brúnt"], ["hvítur", "svartur", "brúnn"], 76],
["hús", "hús", "þf.", "adj", ["nýtt", "lítið", "stórt"], ["nýr", "lítill", "stór"], 77],
["hús+gr.", "húsið", "þf.", "adj", ["nýja", "litla", "stóra"], ["nýr", "lítill", "stór"], 78],
["íbúð", "íbúð", "þf.", "adj", ["nýja", "litla", "stóra"], ["nýr", "lítill", "stór"], 79],
["íbúð+gr.", "íbúðina", "þf.", "adj", ["nýju", "litla", "stóru"], ["nýr", "lítill", "stór"], 80],
["bakpoki", "bakpoka", "þgf.", "adj", ["hvítum", "svörtum", "brúnum"], ["hvítur", "svartur", "brúnn"], 81],
["bakpoki+gr.", "bakpokanum", "þgf.", "adj", ["hvíta", "svarta", "brúna"], ["hvítur", "svartur", "brúnn"], 82],
["lag", "lag", "þf.", "adj", ["nýtt", "fallegt"], ["nýr", "fallegur"], 83],
["lag+gr.", "lagið", "þf.", "adj", ["nýja", "fallega"], ["nýr", "fallegur"], 84],
["lag", "lagi", "þgf.", "adj", ["nýju", "fallegu"], ["nýr", "fallegur"], 85],
["lag+gr.", "laginu", "þgf.", "adj", ["nýja", "fallega"], ["nýr", "fallegur"], 86],
["bolti", "bolta", "þgf.", "adj", ["hvítum", "svörtum", "brúnum"], ["hvítur", "svartur", "brúnn"], 87],
["bolti+gr.", "boltanum", "þgf.", "adj", ["hvíta", "svarta", "brúna"], ["hvítur", "svartur", "brúnn"], 88],
["sími", "síma", "þf.", "adj", ["nýjan", "notaðan"], ["nýr", "notaður"], 89],
["sími+gr.", "símann", "þf.", "adj", ["nýja", "notaða"], ["nýr", "notaður"], 90],
["sími", "síma", "þgf.", "adj", ["nýjum", "notuðum"], ["nýr", "notaður"], 91],
["sími+gr.", "símanum", "þgf.", "adj", ["nýja", "notaða"], ["nýr", "notaður"], 92],
["bolti (ft.)", "boltum", "þgf.", "adj", ["hvítum", "svörtum", "brúnum"], ["hvítur", "svartur", "brúnn"], 93],
["bolti+gr. (ft.)", "boltunum", "þgf.", "adj", ["hvítu", "svörtu", "brúnu"], ["hvítur", "svartur", "brúnn"], 94],
["rusl", "rusli", "þgf.", 95],
["rusl+gr.", "ruslinu", "þgf.", 96],
["píanó", "píanó", "þf.", 97],
["gítar", "gítar", "þf.", 98],
["flauta", "flautu", "þf.", 99],
["umsókn", "umsókn", "þgf.", "adj", ["nýrri", "langri"], ["nýr", "langur"], 100],
["umsókn+gr.", "umsókninni", "þgf.", "adj", ["nýju", "löngu"], ["nýr", "langur"], 101],
["handrit", "handriti", "þgf.", "adj", ["nýju", "gömlu", "þykku", "rafrænu"], ["nýr", "gamall", "þykkur", "rafrænn"], 102],
["handrit+gr.", "handritinu", "þgf.", "adj", ["nýja", "ranga", "rétta", "rafræna"], ["nýr", "rangur", "réttur", "rafrænn"], 103],
["tónlist", "tónlist", "þf.", "adj", ["klassíska", "íslenska", "ítalska"], ["klassískur", "íslenskur", "ítalskur"], 104],
["útskrift+gr.", "útskriftinni", "þgf.", 105],
["tónleikar+gr.", "tónleikunum", "þgf.", 106],
["viðtal+gr.", "viðtalinu", "þgf.", 107],
["viðtal+gr.", "viðtalið", "þf.", 108],
["viðtal", "viðtal", "þf.", 109],
["útsending+gr.", "útsendinguna", "þf.", 110],
["lykill+gr.", "lykilinn", "þf.", 111],
["lykill+gr. (ft.)", "lyklana", "þf.", 112],
["lykill+gr. (ft.)", "lyklunum", "þgf.", 113],
["hurð+gr.", "hurðina", "þf.", 114],
["hurð+gr.", "hurðinni", "þgf.", 115],
["skúffa+gr.", "skúffuna", "þf.", 116],
["skúffa+gr. (ft.)", "skúffurnar", "þf.", 117],
["skúffa+gr.", "skúffunni", "þgf.", 118],
["skúffa+gr. (ft.)", "skúffunum", "þgf.", 119],
["tími", "tíma", "þf.", 120, "tími"],
["hugmynd", "hugmynd", "þf.", 121],
["einhver", "einhvern", "þf.", 122],
["eitthvað", "eitthvað", "þf.", 123],
["eitthvað", "einhverju", "þgf.", 124],
["úlpa+gr. - minn", "úlpuna mína", "þf.", 125],
["úlpa", "úlpun", "þf.", 126],
["peysa+gr. - minn", "peysuna mína", "þf.", 127],
["peysa", "peysu", "þf.", 128],
["skyrta+gr. - minn", "skyrtuna mína", "þf.", 129],
["skyrta", "skyrtu", "þf.", 130],
["stuttermabolur", "stuttermabol", "þf.", 131],
["hamborgari", "hamborgara", "þf.", 132],
["fiskur", "fisk", "þf.", 133],
["kartafla (ft.)", "kartöflur", "þf.", 134],
["súpa", "súpu", "þf.", 135],
["fiskibolla (ft.)", "fiskibollur", "þf.", 136],
["kaka", "köku", "þf.", 137],
];

const prestime = [
["mánudagur (ft.)","á mánudögum", "þgf.", "á"],
["þriðjudagur (ft.)","á þriðjudögum", "þgf.", "á"],
["miðvikudagur (ft.)","á miðvikudögum", "þgf.", "á"],
["fimmtudagur (ft.)","á fimmtudögum", "þgf.", "á"],
["föstudagur (ft.)","á föstudögum", "þgf.", "á"],
["laugardagur (ft.)","á laugardögum", "þgf.", "á"],
["sunnudagur (ft.)","á sunnudögum", "þgf.", "á"],
["helgi (ft.)","um helgar", "þf.", "um"],
["kvöld+gr. (ft.)","á kvöldin", "þf.", "á"],
];

const pasttime = [
["mánudagur+gr.","á mánudaginn", "þf.", "á"],
["þriðjudagur+gr.","á þriðjudaginn", "þf.", "á"],
["miðvikudagur+gr.","á miðvikudaginn", "þf.", "á"],
["fimmtudagur+gr.","á fimmtudaginn", "þf.", "á"],
["föstudagur+gr.","á föstudaginn", "þf.", "á"],
["laugardagur+gr.","á laugardaginn", "þf.", "á"],
["sunnudagur+gr.","á sunnudaginn", "þf.", "á"],
];

const presprtime = [
["dagur", "í dag", "þf.", "í"],
["morgunn", "í morgun", "þf.", "í"],
["kvöld", "í kvöld", "þf.", "í"],
];

const pastprtime = [
["mánudagur+gr.","á mánudaginn", "þf.", "á"],
["þriðjudagur+gr.","á þriðjudaginn", "þf.", "á"],
["miðvikudagur+gr.","á miðvikudaginn", "þf.", "á"],
["fimmtudagur+gr.","á fimmtudaginn", "þf.", "á"],
["föstudagur+gr.","á föstudaginn", "þf.", "á"],
["laugardagur+gr.","á laugardaginn", "þf.", "á"],
["sunnudagur+gr.","á sunnudaginn", "þf.", "á"],
];

const futtime = [
["mánudagur+gr.","á mánudaginn", "þf.", "á"],
["þriðjudagur+gr.","á þriðjudaginn", "þf.", "á"],
["miðvikudagur+gr.","á miðvikudaginn", "þf.", "á"],
["fimmtudagur+gr.","á fimmtudaginn", "þf.", "á"],
["föstudagur+gr.","á föstudaginn", "þf.", "á"],
["laugardagur+gr.","á laugardaginn", "þf.", "á"],
["sunnudagur+gr.","á sunnudaginn", "þf.", "á"],
["morgunn", "á morgun", "þf.", "á"],
["hálftími", "eftir hálftíma", "þf.", "eftir"],
["dagur", "í dag", "þf.", "í"],
["kvöld", "í kvöld", "þf.", "í"],
];

let vocabularylist = [];
let vocabtrans = ["assist", "backpack", "American", "child", "movie", "beer", "book", "ball", "eat", "letter", "brother", "brown", "live", "dark-haired", "daughter", "drink", "I", "have to", "someone", "something", "cook", "English language", "beautiful", "go", "tourist", "fishcake", "fish", "family", "flute", "people", "famous", "French", "old", "can", "guitar", "rejoice", "forget", "have", "hamburger", "manuscript", "he", "tall", "throw", "help", "listen", "watch", "idea", "she", "dog", "door", "house", "white", "apartment", "Icelandic", "Icelandic", "Italian", "girlfriend", "boyfriend", "coffee", "cake", "potato", "throw", "buy", "teacher", "chicken", "classical", "learn", "song", "want", "long", "boring", "actress", "read", "small", "blonde", "close", "key", "paint", "grammar", "mom", "may", "picture", "neighbor", "student", "used", "new","open", "dad", "sweater", "piano", "electronic", "wrong", "right", "romantic", "trash", "juice", "miss", "sandwich", "sell", "phone", "see", "return", "write", "drawer", "shirt", "son", "play", "steal", "girl", "manager", "chair", "big", "t-shirt", "short", "soup", "black", "sister", "take", "time", "concert", "music", "lose", "parka", "application", "young", "broadcast", "graduation", "lack", "water", "wall", "must", "wallet", "we", "interview", "want","wine", "popular", "friend", "it", "they (feminine)", "they (neuter)", "they (masculine)", "you (plural)", "you (singular)", "need", "thick"];
let vocabularyf = [];

let randindex1;
let randindex2;
let randindex3;
let randindex4;
let randindex5;
let randindex6;
let cx;
let a;
let b;
let c;
let dindex;
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
let randgenind;
let arrv = [];
let vbchoice;
let pooltense;
let casesubj;
let strx;
let randindexmod;
let verba;

// Generator preparation

genvocab();

document.getElementById("subjeng").innerHTML = "-";
document.getElementById("verbeng").innerHTML = "-";
document.getElementById("objeng").innerHTML = "-";
document.getElementById("subjice").value = "";
document.getElementById("verbice").value = "";
document.getElementById("objice").value = "";
document.getElementById("timeng").innerHTML = "-";
document.getElementById("timice").value = "";

function generate() {
if (count > 0) {
chronol();
}
dictsubj.length = 0;
dictverb.length = 0;
dicttimepl.length = 0;
randgenind = Math.floor(Math.random() * 10);
if (randgenind == 9) {
    dictsubj = [...dictsubjacc];
    dictverb = [...dictverbacc];
    casesubj = "þf.";

} else {
    dictsubj = [...dictsubjnom];
    dictverb = [...dictverbnom];
    casesubj = "nf.";
}
adjs = "";
trim1 = "";
trim2 = "";
adjsice = "";
adjo = "";
trim3 = "";
trim4 = "";
adjoice = "";
vartimepl = "";
vartimepleng = "";
varbut1 = 0;
varbut2 = 0;
document.getElementById("subjice").value = "";
document.getElementById("verbice").value = "";
document.getElementById("objice").value = "";
document.getElementById("timice").value = "";
document.getElementById("subjice").style.color = "#000000";
document.getElementById("verbice").style.color = "#000000";
document.getElementById("objice").style.color = "#000000";
document.getElementById("timice").style.color = "#000000";
document.getElementById("subjices").innerHTML = "-";
document.getElementById("verbices").innerHTML = "-";
document.getElementById("objices").innerHTML = "-";
document.getElementById("timices").innerHTML = "-";
document.getElementById("subjices").style.color = "#000000";
document.getElementById("verbices").style.color = "#000000";
document.getElementById("objices").style.color = "#000000";
document.getElementById("timices").style.color = "#000000";
document.getElementById("subjice").disabled = false;
document.getElementById("verbice").disabled = false;
document.getElementById("objice").disabled = false;
document.getElementById("timice").disabled = false;
randindex1 = Math.floor(Math.random() * dictsubj.length);
randindex2 = Math.floor(Math.random() * dictverb.length);
randindex3 = Math.floor(Math.random() * dictverb[randindex2][7].length);

a = dictsubj[randindex1][0];
b = [dictverb[randindex2][0],dictverb[randindex2][1],dictverb[randindex2][2],dictverb[randindex2][3],dictverb[randindex2][4],dictverb[randindex2][5],dictverb[randindex2][6]];

randindex5 = Math.floor(Math.random() * dictverb[randindex2][9].length);
pooltense = dictverb[randindex2][9];
verbfinalpattern(b, pooltense, randindex5);

vbchoice = arrv[dictsubj[randindex1][2]];
cx = dictverb[randindex2][7][randindex3];
c = dictobj[cx][0];
trim1 = dictverb[randindex2][0];

if (pooltense[randindex5] == "nt.") {
    dicttimepl = [...prestime];
} else if (pooltense[randindex5] == "þt.") {
    dicttimepl = [...pasttime];
} else if (pooltense[randindex5] == "s.nt.") {
    dicttimepl = [...presprtime];
} else if (pooltense[randindex5] == "s.þt.") {
    dicttimepl = [...pastprtime];
} else if (pooltense[randindex5] == "s.frt.") {
    dicttimepl = [...futtime];
} else if (pooltense[randindex5] == "nt.md.") {
    dicttimepl = [...prestime];
} else if (pooltense[randindex5] == "þt.md.") {
    dicttimepl = [...pasttime];
}

randindex6 = Math.floor(Math.random() * dicttimepl.length);

vartimepleng = dicttimepl[randindex6][1];
vartimepl = '<span class="phrase-pp">' + dicttimepl[randindex6][3] + '</span> <span class="phrase-n">' + dicttimepl[randindex6][0] + '</span>';

if (dictsubj[randindex1][3] == "adj" & a.includes("-") == true) {
document.getElementById("subjeng").innerHTML = '<span class="phrase-n">' + a.substring(0,a.lastIndexOf("-")-1) +'</span> <span class="phrase-p">' + a.substring(a.lastIndexOf("-")+1,a.length) + '</span> <button id="adjs" onclick="addadjs()">+adj</button>';
varbut1 = 1;
} else if (dictsubj[randindex1][3] == "adj" & a.includes("-") == false) {
    document.getElementById("subjeng").innerHTML = '<span class="phrase-n">' + a +'</span> <button id="adjs" onclick="addadjs()">+adj</button>';
    varbut1 = 1;
} else if (dictsubj[randindex1][3] !== "adj" & a.includes("-") == true) {
document.getElementById("subjeng").innerHTML = '<span class="phrase-n">' + a.substring(0,a.lastIndexOf("-")-1) +'</span> <span class="phrase-p">' + a.substring(a.lastIndexOf("-")+1,a.length) + '</span>';
} else if (dictsubj[randindex1][3] !== "adj" & a.includes("-") == false) {
    document.getElementById("subjeng").innerHTML = '<span class="phrase-n">' + a +'</span>';
}

if (dictverb[randindex2][8] == "" & pooltense[randindex5].substring(0,1) !== "" & pooltense[randindex5] !== "nt.md." & pooltense[randindex5] !== "þt.md.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + trim1 + " (" + pooltense[randindex5] + ')</span>';
} else if (dictverb[randindex2][8] !== "" & pooltense[randindex5].substring(0,1) !== "s" & pooltense[randindex5] !== "nt.md."  & pooltense[randindex5] !== "þt.md.") {
    trim1 = dictverb[randindex2][0];
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + trim1 + " (" + pooltense[randindex5] + ')</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] == "" & pooltense[randindex5] == "s.nt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">vera (nt.)</span> <span class="phrase-v">' + trim1 + '</span>';
} else if (dictverb[randindex2][8] == "" & pooltense[randindex5] == "s.þt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">vera (þt.)</span> <span class="phrase-v">' + trim1 + '</span>';
} else if (dictverb[randindex2][8] == "" & pooltense[randindex5] == "s.frt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">ætla (nt.)</span> <span class="phrase-v">' + trim1 + '</span>';
} else if (dictverb[randindex2][8] !== "" & pooltense[randindex5] == "s.nt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">vera (nt.)</span> <span class="phrase-v">' + trim1 + '</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
}  else if (dictverb[randindex2][8] !== "" & pooltense[randindex5] == "s.þt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">vera (þt.)</span> <span class="phrase-v">' + trim1 + '</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] !== "" & pooltense[randindex5] == "s.frt.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">ætla (nt.)</span> <span class="phrase-v">' + trim1 + '</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] == "" & pooltense[randindex5] == "nt.md.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + verba[0] + ' (nt.)</span> <span class="phrase-v">' + dictverb[randindex2][0] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] !== "" & pooltense[randindex5] == "nt.md.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + verba[0] + ' (nt.)</span> <span class="phrase-v">' + dictverb[randindex2][0] + '</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] == "" & pooltense[randindex5] == "þt.md.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + verba[0] + ' (þt.)</span> <span class="phrase-v">' + dictverb[randindex2][0] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
} else if (dictverb[randindex2][8] !== "" & pooltense[randindex5] == "þt.md.") {
    document.getElementById("verbeng").innerHTML = '<span class="phrase-v">' + verba[0] + ' (þt.)</span> <span class="phrase-v">' + dictverb[randindex2][0] + '</span> <span class="phrase-pp">' + dictverb[randindex2][8] + '</span>';
    vbchoice = vbchoice + " " + dictverb[randindex2][8];
}


if (dictobj[cx][3] == "adj" & c.includes("-") == true) {
document.getElementById("objeng").innerHTML = '<span class="phrase-n">' + c.substring(0,c.lastIndexOf("-")-1) +'</span> <span class="phrase-p">' + c.substring(c.lastIndexOf("-")+1,c.length) + '</span> <button id="adjo" onclick="addadjo()">+adj</button>';
varbut2 = 1;
} else if (dictobj[cx][3] == "adj" & c.includes("-") == false) {
    document.getElementById("objeng").innerHTML = '<span class="phrase-n">' + c +'</span> <button id="adjo" onclick="addadjo()">+adj</button>';
    varbut2 = 1;
} else if (dictobj[cx][3] !== "adj" & c.includes("-") == true)  {
document.getElementById("objeng").innerHTML = '<span class="phrase-n">' + c.substring(0,c.lastIndexOf("-")-1) +'</span> <span class="phrase-p">' + c.substring(c.lastIndexOf("-")+1,c.length) + '</span>';
} else if (dictobj[cx][3] !== "adj" & c.includes("-") == false)  {
    document.getElementById("objeng").innerHTML = '<span class="phrase-n">' + c +'</span>';
}

document.getElementById("timeng").innerHTML = vartimepl;

document.getElementById("verif").disabled = false;
document.getElementById("subjice").disabled = false;
document.getElementById("verbice").disabled = false;
document.getElementById("objice").disabled = false;
document.getElementById("timice").disabled = false;
document.getElementById("gener").disabled = true;
count++;
}

function verbfinalpattern(x, t, y) {
    if (t[y] == "nt." & x[2] == 0 & x[0].slice(-2) !== "st") {
        let inf = x[0].slice(0,x.lastIndexOf("a"));
        arrv = [x[1] + vbendingspres[x[2]][0], x[1] + vbendingspres[x[2]][1], x[1] + vbendingspres[x[2]][2], x[5] + vbendingspres[x[2]][3], inf + vbendingspres[x[2]][4], x[0]];
    } if (t[y] == "nt." & x[2] == 0 & x[0].slice(-2) == "st") {
        let inf = x[0].slice(0,-3);
        arrv = [x[1] + vbendingspres[x[2]][0], x[1] + vbendingspres[x[2]][1], x[1] + vbendingspres[x[2]][2], x[5] + vbendingspres[x[2]][3], inf + vbendingspres[x[2]][4], x[0]];
    } else if (t[y] == "nt." & x[2] !== 0) {
        let inf = x[0].slice(0,x.lastIndexOf("a"));
        arrv = [x[1] + vbendingspres[x[2]][0], x[1] + vbendingspres[x[2]][1], x[1] + vbendingspres[x[2]][2], inf + vbendingspres[x[2]][3], inf + vbendingspres[x[2]][4], x[0]];
    } else if (t[y] == "þt.") {
        let inf = x[0].slice(0,x.lastIndexOf("a"));
        arrv = [x[4] + vbendingspast[x[3]][0], x[4] + vbendingspast[x[3]][1], x[4] + vbendingspast[x[3]][2], x[5] + vbendingspast[x[3]][3], x[5] + vbendingspast[x[3]][4], x[5] + vbendingspast[x[3]][5]];
    } else if (t[y] == "s.nt.") {
        arrv = ["er að " + x[0], "ert að " + x[0], "er að " + x[0], "erum að " + x[0], "eruð að " + x[0], "eru að " + x[0]];
    } else if (t[y] == "s.þt.") {
        arrv = ["var að " + x[0], "varst að " + x[0], "var að " + x[0], "vorum að " + x[0], "voruð að " + x[0], "voru að " + x[0]];
    } else if (t[y] == "s.frt.") {
        arrv = ["ætla að " + x[0], "ætlar að " + x[0], "ætlar að " + x[0], "ætlum að " + x[0], "ætlið að " + x[0], "ætla að " + x[0]];
    } else if (t[y] == "nt.md.") {
        randindexmod = Math.floor(Math.random() * modalverbs.length);
        verba = modalverbs[randindexmod].slice();
        let inf = verba[0].slice(0,x.lastIndexOf("a"));
        if (verba[0] == "geta" || verba[0] == "hafa") {
            arrv = [verba[1] + vbendingspres[verba[2]][0] +  " " + x[6], verba[1] + vbendingspres[verba[2]][1] + " " + x[6], verba[1] + vbendingspres[verba[2]][2] + " " + x[6], inf + vbendingspres[verba[2]][3] + " " + x[6], inf + vbendingspres[verba[2]][4] + " " + x[6], verba[0] + " " + x[6]];
        } else {
        arrv = [verba[1] + vbendingspres[verba[2]][0] + " " + verba[8] + " " + x[0], verba[1] + vbendingspres[verba[2]][1] + " " + verba[8] + " " + x[0], verba[1] + vbendingspres[verba[2]][2] + " " + verba[8] + " " + x[0], inf + vbendingspres[verba[2]][3] + " " + verba[8] + " " + x[0], inf + vbendingspres[verba[2]][4] + " " + verba[8] + " " + x[0], verba[0] + " " + verba[8] + " " + x[0]];
        }
    } else if (t[y] == "þt.md.") {
        randindexmod = Math.floor(Math.random() * modalverbs.length);
        verba = modalverbs[randindexmod].slice();
        let inf = verba[0].slice(0,x.lastIndexOf("a"));
        if (verba[0] == "geta" || verba[0] == "hafa") {
            arrv = [verba[4] + vbendingspast[verba[3]][0] +  " " + x[6], verba[4] + vbendingspast[verba[3]][1] + " " + x[6], verba[4] + vbendingspast[verba[3]][2] + " " + x[6], verba[5] + vbendingspast[verba[3]][3] + " " + x[6], verba[5] + vbendingspast[verba[3]][4] + " " + x[6], verba[5] + vbendingspast[verba[3]][5] + " " + x[6]];
        } else {
            arrv = [verba[4] + vbendingspast[verba[3]][0] + " " + verba[8] + " " + x[0], verba[4] + vbendingspast[verba[3]][1] + " " + verba[8] + " " + x[0], verba[4] + vbendingspast[verba[3]][2] + " " + verba[8] + " " + x[0], verba[5] + vbendingspast[verba[3]][3] + " " + verba[8] + " " + x[0], verba[5] + vbendingspast[verba[3]][4] + " " + verba[8] + " " + x[0], verba[5] + vbendingspast[verba[3]][5] + " " + verba[8] + " " + x[0]];
        }
    }
}

// Functions: adding adjectives to subjects and objects

function addadjs() {
document.getElementById("adjs").remove();
let f = document.getElementById("subjeng").innerHTML;
randadjsn = Math.floor(Math.random() * dictsubj[randindex1][5].length);
randadjs = dictsubj[randindex1][5][randadjsn];
adjsice = dictsubj[randindex1][4][randadjsn];
document.getElementById("subjeng").innerHTML = '<span class="phrase-a">' + randadjs + '</span> ' + f;
}

function addadjo() {
document.getElementById("adjo").remove();
let f = document.getElementById("objeng").innerHTML;
randadjon = Math.floor(Math.random() * dictobj[cx][5].length);
randadjo = dictobj[cx][5][randadjon];
adjoice = dictobj[cx][4][randadjon];
document.getElementById("objeng").innerHTML = '<span class="phrase-a">' + randadjo + '</span> ' + f;
}

// Functions: copying sentences into the chronological list on the side

function chronol() {
document.getElementById("tit").style.display = "block";
let a1 = document.getElementById("subjices").innerHTML;
let a2 = document.getElementById("verbices").innerHTML;
let a3 = document.getElementById("objices").innerHTML;
let a4 = document.getElementById("timices").innerHTML;
let c1 = document.getElementById("subjeng").innerHTML;
let c2 = document.getElementById("verbeng").innerHTML;
let c3 = document.getElementById("objeng").innerHTML;
let c4 = document.getElementById("timeng").innerHTML;
let tabx = document.getElementById("chron");
var row1 = tabx.insertRow();
var cell1 = row1.insertCell();
cell1.innerHTML = count;
var cell2 = row1.insertCell();
cell2.innerHTML = c1;
var cell3 = row1.insertCell();
var cell4 = row1.insertCell();
var cell5 = row1.insertCell();
cell3.innerHTML = c2;
cell4.innerHTML = c3;
cell5.innerHTML = c4;
var row3 = tabx.insertRow();
row3.insertCell();
var cell8 = row3.insertCell();
var cell9 = row3.insertCell();
var cell10 = row3.insertCell();
var cell11 = row3.insertCell();
cell8.innerHTML = a1;
cell9.innerHTML = a2;
cell10.innerHTML = a3;
cell11.innerHTML = a4;
if (document.getElementById("subjices").style.color !== "rgb(0, 255, 0)" || document.getElementById("verbices").style.color !== "rgb(0, 255, 0)" || document.getElementById("objices").style.color !== "rgb(0, 255, 0)" || document.getElementById("timices").style.color !== "rgb(0, 255, 0)") {
cell8.style.color = "#FF0000";
cell9.style.color = "#FF0000";
cell10.style.color = "#FF0000";
cell11.style.color = "#FF0000";
} else if (document.getElementById("subjices").style.color == "rgb(0, 255, 0)" && document.getElementById("verbices").style.color == "rgb(0, 255, 0)" && document.getElementById("subjices").style.color == "rgb(0, 255, 0)" && document.getElementById("timices").style.color == "rgb(0, 255, 0)") {
cell8.style.color = "#00ff00";
cell9.style.color = "#00ff00";
cell10.style.color = "#00ff00";
cell11.style.color = "#00ff00";
totcorr++;
if (Number.isInteger(totcorr / 10) == true & totcorr !== 0) {
    let mess = document.getElementById("result").innerHTML;
    let wordisl = ["Frábært!", "Koma svo!", "Flott!", "Ljómandi!", "Gott!"];
    let rnd = Math.floor(Math.random() * wordisl.length);
    document.getElementById("result").innerHTML = wordisl[rnd] + " " + mess + '<span id="numbset">' + totcorr + "</span> sentences!";
    document.getElementById("messagearea").style.display = "block";
    document.getElementById("mainarea").style.display = "none";
    document.getElementById("butt12").style.display = "none";
}
}
document.getElementById("totcount").innerHTML = "Correct sentences: " + totcorr + "/" + count;
}

// Functions: Styling correct and wrong answers with verification

function verif() {
document.getElementById("verif").disabled = true;
var x = document.getElementById("subjice").value.toLowerCase();
var y = document.getElementById("verbice").value.toLowerCase();
var z = document.getElementById("objice").value.toLowerCase();
var zt = document.getElementById("timice").value.toLowerCase();
x = x.trimEnd();
y = y.trimEnd();
z = z.trimEnd();
zt = zt.trimEnd();

if (adjsice == "" & varbut1 == 0) {
if (x == dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#00ff00";
document.getElementById("subjices").innerHTML = x;
document.getElementById("subjices").style.color = "#00ff00";
}
if (x !== dictsubj[randindex1][1].toLowerCase()) {
document.getElementById("subjice").style.color = "#ff0000";
document.getElementById("subjices").innerHTML = dictsubj[randindex1][1] + ' <span class="phrase-c">← ' + casesubj + '</span>';
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
document.getElementById("subjices").innerHTML = dictsubj[randindex1][1] + ' <span class="phrase-c">← ' + casesubj + '</span>';
document.getElementById("subjices").style.color = "#ff0000";
}
}

if (adjsice !== "") {
let wholestr = adjsice + " " + dictsubj[randindex1][1].toLowerCase();
if (x == wholestr) {
document.getElementById("subjice").style.color = "#00ff00";
document.getElementById("subjices").innerHTML = wholestr;
document.getElementById("subjices").style.color = "#00ff00";
} else {
document.getElementById("subjice").style.color = "#ff0000";
document.getElementById("subjices").innerHTML = wholestr + ' <span class="phrase-c">← ' + casesubj + '</span>';
document.getElementById("subjices").style.color = "#ff0000";
}
}

if (vbchoice == y.toLowerCase()) {
document.getElementById("verbice").style.color = "#00ff00";
document.getElementById("verbices").innerHTML = y;
document.getElementById("verbices").style.color = "#00ff00";
} else {
document.getElementById("verbice").style.color = "#ff0000";
document.getElementById("verbices").innerHTML = vbchoice;
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
document.getElementById("objices").innerHTML = dictobj[cx][1] + ' <span class="phrase-c">← ' + dictobj[cx][2] + '</span>';
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
document.getElementById("objices").innerHTML = dictobj[cx][1] + ' <span class="phrase-c">← ' + dictobj[cx][2] + '</span>';
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
document.getElementById("objices").innerHTML = wholestr2 + ' <span class="phrase-c">← ' + dictobj[cx][2] + '</span>';
document.getElementById("objices").style.color = "#ff0000";
}
}

if (zt == vartimepleng) {
    document.getElementById("timice").style.color = "#00ff00";
    document.getElementById("timices").innerHTML = vartimepleng;
    document.getElementById("timices").style.color = "#00ff00";
} else if (zt !== vartimepleng) {
    document.getElementById("timice").style.color = "#ff0000";
    document.getElementById("timices").innerHTML = vartimepleng;
    document.getElementById("timices").style.color = "#ff0000";
}

if (x == "" & y == "" & z == "" & zt == "") {
document.getElementById("subjice").style.color = "#000000";
document.getElementById("verbice").style.color = "#000000";
document.getElementById("objice").style.color = "#000000";
document.getElementById("timice").style.color = "#000000";
document.getElementById("subjice").disabled = true;
document.getElementById("verbice").disabled = true;
document.getElementById("objice").disabled = true;
document.getElementById("timice").disabled = true;
document.getElementById("subjices").style.color = "#0000ff";
document.getElementById("verbices").style.color = "#0000ff";
document.getElementById("objices").style.color = "#0000ff";
document.getElementById("timices").style.color = "#0000ff";
}

document.getElementById("gener").disabled = false;
}

// Functions: Showning and hiding sections of the page

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

function clmess() {
document.getElementById("messagearea").style.display = "none";
document.getElementById("mainarea").style.display = "block";
document.getElementById("butt12").style.display = "block";
}

// Functions: Vocabulary generation

function genvocab() {
    for (let a = 0; a < dictsubjnom.length; a++) {
        let v = dictsubjnom[a].slice();
        let p = v[0].slice();
        if (p.slice(-7) == " - minn") {
        p = p.slice(0,-7);
        } else if (p.slice(-7) == " - þinn") {
        p = p.slice(0,-7);
        }
        if (p.slice(-6) == " (ft.)") {
        p = p.slice(0,-6);
        }
        if (p.slice(-4) == "+gr.") {
        p = p.slice(0,-4);
        }
        vocabularylist.push([p, "", "nominal"]);
        }
        for (let a = 0; a < dictsubjnom.length; a++) {
            if (dictsubjnom[a][3] == "adj") {
                let v = dictsubjnom[a][5].slice();
                vocabularyf.push(v);
            }
        }
      for (let a = 0; a < dictobj.length; a++) {
          if (dictobj[a][3] == "adj") {
              let v = dictobj[a][5].slice();
              vocabularyf.push(v);
        }
      }
      vocabularyf = [...new Set(vocabularyf.flat())];
      for (let a = 0; a < vocabularyf.length; a++) {
         vocabularylist.push([vocabularyf[a], "", "adjective"]);
       }
        for (let a = 0; a < dictverbnom.length; a++) {
            let v = dictverbnom[a].slice();
            let p = v[0].slice();
            vocabularylist.push([p, "", "verb"]);
        }
        for (let a = 0; a < dictverbacc.length; a++) {
            let v = dictverbacc[a].slice();
            let p = v[0].slice();
            vocabularylist.push([p, "", "verb"]);
        }
        for (let a = 0; a < modalverbs.length; a++) {
           let v = modalverbs[a].slice();
           let p = v[0].slice();
           vocabularylist.push([p, "", "verb"]);
       }
        for (let a = 0; a < dictobj.length; a++) {
            let v = dictobj[a].slice();
            let p = v[0].slice();
            if (p.slice(-7) == " - minn") {
                p = p.slice(0,-7);
            } else if (p.slice(-7) == " - þinn") {
                p = p.slice(0,-7);
            }
            if (p.slice(-6) == " (ft.)") {
                p = p.slice(0,-6);
            }
            if (p.slice(-4) == "+gr.") {
                p = p.slice(0,-4);
            }
            vocabularylist.push([p, "", "nominal"]);
        }


        const seen = new Map();
        const uniqueList = vocabularylist.filter(item => {
            const key = `${item[0]}|${item[1]}`; // Unique key combining English and Icelandic
            return seen.has(key) ? false : seen.set(key, true);
        });
        vocabularylist.length = 0;
        vocabularylist.push(...uniqueList);
    vocabularylist.sort((a, b) => a[0].localeCompare(b[0]));
//    let fslr = JSON.stringify(vocabularylist);
//    console.log(fslr);
    for (let a = 0; a < vocabularylist.length; a++) {
        vocabularylist[a][1] = vocabtrans[a];
    }
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
    cell1a.innerHTML = "<p><b>Icelandic lemma</b></p>";
    cell2a.innerHTML = "<p><b>English lemma</b></p>";
    cell3a.innerHTML = "<p><b>Type</b></p>";
}
