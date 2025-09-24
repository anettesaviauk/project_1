const http = require("http");
const dateET = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Anette Saviauk, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Anette Saviauk, veebiprogrammeerimine</h1>\n<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu.</p><p>Veebiprogrammeerimine on tore.</p>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-type": "text/html" });
    //res.write("Juhhei! Läkski käima!");
    res.write(pageStart);
    res.write(pageBody);
    res.write("\n\t<p>Täna on " + dateET.weekDay() + " " + dateET.longDate() + ". Kell on " + dateET.time() + "</p>");
    res.write("\n\t<p>Programm töötab ka kodus!</p>")
    res.write(pageEnd);
    return res.end();

}).listen(5310);

const fs = require("fs");//fs -file system,saame failidele ligi ja muuta
const textRef = "txt/vanasonad.txt";

function pickOneValue(rawValue) {
    //teisendame teksti massiviks (list, array)
    let oldWisdomList = rawValue.split(";");
    // console.log(oldWisdomList);
    //loosime ühe vanasõna
    let wisdomCount = oldWisdomList.length;
    let randomNumber = Math.round(Math.random() * (wisdomCount - 1));
    console.log("Tänane vanasõna: " + oldWisdomList[randomNumber]);

}