const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index'); // This assumes you have an 'index.ejs' file in your 'views' directory.
});

// JSON veritabanı dosyasının yolu
const dbPath = path.join(__dirname, 'db', 'database.json');

// Middleware olarak bodyParser kullanın
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index'); // Bu, 'views' dizininde 'index.ejs' dosyasının olduğunu varsayar.
});

app.post('/kaydet', (req, res) => {
  const url = req.body.metin; // Formdan gelen metin verisini alın
  const kod = req.body.kod; // Formdan gelen metin verisini alın

  let veritabani = [];

  try {
    // Veritabanı dosyasını okuyun (eğer varsa)
    veritabani = JSON.parse(fs.readFileSync(dbPath));
  } catch (error) {
    console.error('Veritabanı dosyası okunurken bir hata oluştu.');
  }

  // Veritabanına yeni veriyi ekleyin
  veritabani.push({ url, kod });

  try {
    // Veritabanı dosyasını güncelleyin
    fs.writeFileSync(dbPath, JSON.stringify(veritabani, null, 2));
  } catch (error) {
    console.error('Veritabanı dosyası güncellenirken bir hata oluştu.');
  }

  res.redirect('/'); // Ana sayfaya yönlendirin veya başka bir işlem yapabilirsiniz.
});

// Veritabanı dosyasının yolu

function getVeritabani() {
  try {
    // Veritabanı dosyasını okuyun
    const veri = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(veri);
  } catch (error) {
    console.error('Veritabanı dosyası okunurken bir hata oluştu.');
    return [];
  }
}

app.get('/:kod', (req, res) => {
  const kod = req.params.kod; // URL'den kodu alın

  // Veritabanından kodu arayın ve metni alın
  const veritabani = getVeritabani();
  const bulunanVeri = veritabani.find(entry => entry.kod === kod);

  if (bulunanVeri) {
    res.render('wait', { metin: bulunanVeri.metin });
  } else {
    res.send('Kod bulunamadı.'); // Kod bulunamazsa, istemciye bir hata mesajı gönderin veya farklı bir işlem yapın.
  }
});


//...
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor!`);
});
