const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");



const dbPath = path.join(__dirname, "db", "database.json");

function getVeritabani() {
  try {
    const veri = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(veri);
  } catch (error) {
    console.error("Veritabanı dosyası okunurken bir hata oluştu.");
    return [];
  }
}



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.render("index");
});
app.get("/:kod", (req, res) => {
  const kod = req.params.kod;

  const veritabani = getVeritabani();
  const bulunanVeri = veritabani.find((entry) => entry.kod === kod);

  if (bulunanVeri) {
    res.render("wait", { metin: bulunanVeri.metin });
  } else {
    res.send("Kod bulunamadı.");
  }
});



app.post("/kaydet", (req, res) => {
  const url = req.body.metin;
  const kod = req.body.kod;

  let veritabani = [];

  try {
    veritabani = JSON.parse(fs.readFileSync(dbPath));
  } catch (error) {
    console.error("Veritabanı dosyası okunurken bir hata oluştu.");
  }

  veritabani.push({ url, kod });

  try {
    fs.writeFileSync(dbPath, JSON.stringify(veritabani, null, 2));
  } catch (error) {
    console.error("Veritabanı dosyası güncellenirken bir hata oluştu.");
  }

  res.render("complate" );
});



app.listen(port, () => {
  console.log(`SURL BAŞARILI ŞEKİLDE BAŞLATILDI 🟢`);
});
