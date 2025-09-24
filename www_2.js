const http = require("http");
const fs = require("fs");
//lisame mooduli, et päringu URL-i mõista
const url = require("url");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Andrus Rinde, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ãœlikoolis</a> veebiprogrammeerimise kurusel ja ei oma mÃµistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageBanner = '<img src="vp_banner_2025_AA.jpg" alt="Kursuse bänner">';
const pageEnd = '\n</body>\n</html>';

http.createServer(function (req, res) {
    //vaatan päringut (req), mida klient tahab
    console.log("Praegune URL: " + req.url);
    //eraldame (parse) puhta URL-i ilma parameetrite jms kraamita
    let currentUrl = url.parse(req.url, true);
    console.log("Puhas url: " + currentUrl.pathNAME);

    //loon marsruudid erinevate URL-ide jaoks

    //avaleht
    if (currentUrl.pathname === "/") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(pageStart);
        res.write(pageBanner);
        res.write(pageBody);
        res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
        res.write('\n\t<p>Vaata ka valikut <a href="/vanasonad">vanasõnu</a>.</p>');
        res.write(pageEnd);
        return res.end();
    }

    else if (currentUrl.pathname === "/vanasonad") {
        res.writeHead(200, { "Content-type": "text/html" });
        fs.readFile(textRef, "utf8", (err, data) => {
            if (err) {
                res.write(pageStart);
                res.write(pageBanner);
                res.write(pageBody);
                res.write("\n\t<p>TÃ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tÃ¤naseks Ã¼htki vanasÃµna vÃ¤lja pakkuda pole!</p>");
                res.write(pageEnd);
                return res.end();
            } else {
                let oldWisdomList = data.split(";");
                let folkWisdomOutput = "\n\t<ol>";
                for (let i = 0; i < oldWisdomList.length; i++) {
                    folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
                }
                folkWisdomOutput += "\n\t</ol>";
                res.write(pageStart);
                res.write(pageBanner);
                res.write(pageBody);
                res.write("\n\t<p>TÃ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
                res.write("\n\t<h2>Valik Eesti vanasÃµnu</h2>")
                res.write(folkWisdomOutput);
                res.write(pageEnd);
                return res.end();
            }
        });
    } // "/vanasonad" lõppeb
    else if (currentUrl.pathname === "/vp_banner_2025_AA.jpg") {
        //liidame veebilehe aadressile vajaliku päris kataloogi nime
        let bannerPath = path.join(__dirname, "images");
        fs.readFile(bannerPath + currentUrl.pathname, (err, data) => {
            if (err) {
                throw (err);
            }
            else {
                res.writeHead(200, { "content-type": "image/jpeg" });
                res.end(data);
            }
        });
    } // /vp_banner" lõppeb 

    else {
        res.end("Viga 404, sellist lehte ei ole olemas!");
    } // else lõppeb
}).listen(5300);