var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var app = express();
const cors = require('cors');
const mysql = require('mysql');
var uuid = require('uuid');
const aws_keys = require('./creds');
const saltRounds = 10;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 9000;
app.listen(port);
console.log('Listening on port', port);


const db_credentials = require('./db_creds');
var conn = mysql.createPool(db_credentials);


//instanciamos el sdk
var AWS = require('aws-sdk');
//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);
//const ddb = new AWS.DynamoDB(aws_keys.dynamodb);
//const rek = new AWS.Rekognition(aws_keys.rekognition);
//const translate = new AWS.Translate(aws_keys.translate);
//const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);



//--------------------------------------------------ALMACENAMIENTO---------------------------------------

//subir foto en s3
app.post('/subirfoto', function (req, res) {

  var id = req.body.id;
  var foto = req.body.foto;
  //carpeta y nombre que quieran darle a la imagen

  var nombrei = "archivos/" + id + ".png";
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64');

  const params = {
    Bucket: "archivos-2-p1",
    Key: nombrei,
    Body: buff,
    ContentType: "image",
    ACL: 'public-read'
  };
  const putResult = s3.putObject(params).promise();
  res.json({ "mensaje": putResult })
});

//obtener foto en s3
app.post('/obtenerfoto', function (req, res) {
  var id = req.body.id;
  //direcccion donde esta el archivo a obtener
  var nombrei = "fotos/" + id + ".pdf";
  var getParams = {
    Bucket: 'archivos-2-p1',
    Key: nombrei
  }
  s3.getObject(getParams, function (err, data) {
    if (err)
      res.json({ mensaje: "error" })
    //de bytes a base64
    var dataBase64 = Buffer.from(data.Body).toString('base64');
    res.json({ mensaje: dataBase64 })
  });
});

//--------------------------------------------------BASES DE DATOS ---------------------------------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  consulta = "select * from Usuario where ? ";

  var data = {
    correo: email
  }
  let hash;
  conn.query(consulta, data, function (err, result) {
    if (err)
      throw err;
    if (result.length > 0) {
      hash = result[0].password;
      bcrypt.compare(password, hash).then(function (r) {
        if (r) {
          res.json({
            msg: true,
            DatosUsuario: {
              "codigo": result[0].idUsuario,
              "nombre": result[0].nombre,
              "correo": result[0].correo,
              "foto": result[0].foto
            }
          })
        }
      });
    }
  })
})

app.post('/signup', async (req, res) => {
  const { nombre, correo, password, fotobase64, extension } = req.body
  let encodedImage = fotobase64;
  let decodedImage = Buffer.from(encodedImage, 'base64');
  let filename = `${nombre}-${uuid()}.${extension}`;

  let bucketname = 'archivos-2-p1';
  let folder = 'fotoUsuarios/';
  let filepath = `${folder}${filename}`;
  var uploadParamsS3 = {
    Bucket: bucketname,
    Key: filepath,
    Body: decodedImage,
    ACL: 'public-read',
  };
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send({ "mensaje": "Algo paso con el hash" });
    } else {
      s3.upload(uploadParamsS3, async function (er, data) {
        if (er) {
          res.send({ "mensaje": "Error al subir foto" });
        } else {
          let consulta = 'INSERT INTO Usuario (nombre, correo, password, foto) VALUES(?,?,?,?)'
          conn.query(consulta, [nombre, correo, hash, data.Location], function (err, result) {
            if (err)
              throw err;
            res.status(200).json({
              msg: true
            })
          })
        }
      });
    }
  });
})

app.get('/listausuarios', async (req,res) => {
  let consulta = 'SELECT idUsuario, nombre, correo, foto FROM Usuario'
  conn.query(consulta, [], function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/agregarAmigo',(req,res)=>{
  const {idLog, correoLog, idAmigo, correoAmigo} = req.body

  let consulta = 'INSERT INTO Detalle_Amigo (Usuario_idUsuario, Usuario_correo, Usuario_idUsuario1, Usuario_correo1) VALUES (?,?,?,?)'
  conn.query(consulta, [idLog, correoLog, idAmigo, correoAmigo], function(err,resul){
    if(err) throw err;
    res.status(200).json({
      msg: true
    })
  })
})