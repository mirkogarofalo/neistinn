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
["I", "ég", 0],
["You", "þú", 1],
["He", "hann", 2],
["She", "hún", 2],
["It", "það", 2],
["We", "við", 3],
["You (pl)", "þið", 4],
["They (m)", "þeir", 5],
["They (f)", "þær", 5],
["They (n)", "þau", 5],
["The doctor", "læknirinn", 2, "adj", ["góði", "nýi", "gamli", "frægi"], ["good", "new", "old", "famous"]],
["A doctor", "læknir", 2, "adj", ["góður", "nýr", "gamall", "frægur"], ["good", "new", "old", "famous"]],
["The actress", "leikkonan", 2, "adj", ["góða", "skemmtilega", "fræga"], ["good", "fun", "famous"]],
["An actress", "leikkonan", 2, "adj", ["góð", "skemmtileg", "fræg"], ["good", "fun", "famous"]],
["The teacher", "kennarinn", 2, "adj", ["góði", "nýi"], ["good", "new"]],
["The teachers", "kennararnir", 5, "adj", ["góðu", "nýju"], ["good", "new"]],
["The man", "maðurinn", 2, "adj", ["góði", "skemmtilegi", "gamli"], ["good", "fun", "old"]],
["A teacher", "kennari", 2, "adj", ["góður", "nýr"], ["good", "new"]],
["A man", "maður", 2, "adj", ["góður", "skemmtilegur", "gamall"], ["good", "fun", "old"]],
["A girl", "stelpa", 2, "adj", ["góð", "íslensk", "frönsk", "ítölsk", "lítil"], ["good", "Icelandic", "French", "Italian", "little"]],
["Someone", "einhver", 2],
];
const dictverb = [
["store", "stores", 0, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29] ],
["take", "takes", 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29] ],
["eat", "eats", 2, [5, 6, 7, 8, 14, 15, 16, 17, 35] ],
["drink", "drinks", 3, [12, 13, 37, 38]],
["play", "plays", 4, [18, 19, 20, 21] ],
["read", "reads", 5, [8, 9, 10, 11] ],
["help", "helps", 6, [22, 23, 24, 25] ],
["miss", "misses", 7, [30, 31] ],
["watch", "watches", 8, [18, 19, 20, 21, 32, 33, 34] ],
["cook", "cooks", 9, [35, 36] ],
["stored", "stored", 10, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29] ],
["took", "took", 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29] ],
["ate", "ate", 12, [5, 6, 7, 8, 14, 15, 16, 17, 35] ],
["drank", "drank", 13, [12, 13, 37, 38]],
];

const arrayv = [
["geymi", "geymir", "geymir", "geymum", "geymið", "geyma"],
["tek", "tekur", "tekur", "tökum", "takið", "taka"],
["borða", "borðar", "borðar", "borðum", "borðið", "borða"],
["drekk", "drekkur", "drekkur", "drekkum", "drekkið", "drekka"],
["spila", "spilar", "spilar", "spilum", "spilið", "spila"],
["les", "lest", "les", "lesum", "lesið", "lesa"],
["hjálpa", "hjálpar", "hjálpar", "hjálpum", "hjálpið", "hjálpa"],
["sakna", "saknar", "saknar", "söknum", "saknið", "sakna"],
["horfi á", "horfir á", "horfir á", "horfum á", "horfið á", "horfa á"],
["elda", "eldar", "eldar", "eldum", "eldið", "elda"],
["geymdi", "geymdir", "geymdir", "geymdum", "geymduð", "geymdu"],
["tók", "tókst", "tók", "tókum", "tókuð", "tóku"],
["borðaði", "borðaðir", "borðaði", "borðuðum", "borðuðuð", "borðuðu"],
["drakk", "drakkst", "drakk", "drukkum", "drukkuð", "drukku"],
];

const dictobj = [
["the dog", "hundinn", "acc", "adj", ["hvíta", "svarta", "stóra", "brúna"], ["white", "black", "big", "brown"], 0],
["the dogs", "hundana", "acc", "adj", ["hvítu", "svörtu", "stóru", "brúnu"], ["white", "black", "big", "brown"], 1],
["a dog", "hund", "acc", "adj", ["hvítan", "svartan", "stóran", "brúnan"], ["white", "black", "big", "brown"], 2],
["dogs", "hunda", "acc", 3],
["the horse", "hestinn", "acc", "adj", ["hvíta", "svarta", "stóra"], ["white", "black", "big"], 4],
["the horses", "hestana", "acc", 5],
["a horse", "hest", "acc", 6],
["horses", "hesta", "acc", 7],
["the book", "bókina", "acc", 8],
["the books", "bækurnar", "acc", 9],
["a book", "bók", "acc", "adj", ["hvíta", "svarta", "stóra", "nýja"], ["white", "black", "big", "new"], 10],
["books", "bækur", "acc", "adj", ["hvítar", "svartar", "stórar", "nýjar"], ["white", "black", "big", "new"], 11],
["the milk", "mjólkina", "acc", 12],
["milk", "mjólk", "acc", 13],
["the sandwich", "samlokuna", "acc", 14],
["the sandwiches", "samlokurnar", "acc", 15],
["a sandwich", "samloku", "acc", 16],
["sandwiches", "samlokur", "acc", 17],
["the video", "myndbandið", "acc", "adj", ["hræðilega", "skemmtilega", "langa", "nýja"], ["horrible", "fun", "long", "new"], 18],
["the videos", "myndböndin", "acc", "adj", ["hræðilegu", "skemmtilegu", "löngu", "nýju"], ["horrible", "fun", "long", "new"], 19],
["a video", "myndband", "acc", 20],
["videos", "myndbönd", "acc", 21],
["the girl", "stelpunni", "dat", 22],
["the girls", "stelpunum", "dat", 23],
["a girl", "stelpu", "dat", 24],
["girls", "stelpum", "dat", 25],
["the picture", "myndina", "acc", 26],
["the pictures", "myndirnar", "acc", 27],
["a picture", "mynd", "acc", 28],
["pictures", "myndir", "acc", 29],
["the family", "fjölskyldunnar", "gen", 30],
["the horses", "hestanna", "gen", 31],
["the TV", "sjónvarpið", "acc", 32],
["the movie", "bíómyndina", "acc", "adj", ["hræðilegu", "skemmtilegu", "löngu", "nýju", "spennandi"], ["horrible", "fun", "long", "new", "exciting"], 33],
["a movie", "bíómynd", "acc", "adj", ["hræðilega", "skemmtilega", "langa", "nýja", "spennandi"], ["horrible", "fun", "long", "new", "exciting"], 34],
["food", "mat", "acc", "adj", ["íslenskan", "franskan", "ítalskan", "góðan", "sterkan"], ["Icelandic", "French", "Italian", "good", "spicy"], 35],
["a dish", "rétt", "acc", "adj", ["íslenskan", "franskan", "ítalskan", "góðan", "sterkan"], ["Icelandic", "French", "Italian", "good", "spicy"], 36],
["the juice", "safann", "acc", 37],
["juice", "safa", "acc", 38],
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
}

function showabout() {
document.getElementById("info").style.display = "none";
document.getElementById("about").style.display = "block";
document.getElementById("previous").style.display = "none";
}

function showprev() {
document.getElementById("info").style.display = "none";
document.getElementById("about").style.display = "none";
document.getElementById("previous").style.display = "block";
}
