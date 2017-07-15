const express = require('express');

const app = express();

const port = 3000;

const formidable = require("formidable");
const util = require("util");

app.set('views', './');
app.set('view engine', 'jade');
app.use(express.static('public'));

function readForm(req,res,next){
  let form = new formidable.IncomingForm();

  form.uploadDir = `${__dirname}/public/uploads`;
  form.keepExtensions = true;

  form.parse(req, (err,fields, files) => {
      res.send('received upload:\n\n');
      res.status(200).send(util.inspect({fields: fields, files: files}));
  })
  next();
}

app.get('/', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/public/upload.html`);
});


app.get('/upload', (req,res)=>{
  res.status(200).sendFile(`${__dirname}/public/upload.html`);
});


app.post('/upload',(req,res,next) => {
  let form = new formidable.IncomingForm();

  form.uploadDir = `${__dirname}/public/uploads`;
  form.keepExtensions = true;

  form.parse(req, (err,fields, files) => {
      res.status(200).send(util.inspect({fields: fields, files: files}));
  })
});

app.get('/:id', (req, res) => {
    //res.status(200).sendFile(`index.html`);
    res.render('index', {titulo: `Hola`, mensaje: `baia baia  ${req.params.id}`});
});


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
