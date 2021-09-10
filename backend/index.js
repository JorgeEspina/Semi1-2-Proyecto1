var express = require("express");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var app = express();
const cors = require("cors");
const mysql = require("mysql");
var uuid = require("uuid");
const aws_keys = require("./creds");
const saltRounds = 10;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
var port = 9000;
app.listen(port);
console.log("Listening on port", port);

const db_credentials = require("./db_creds");
var conn = mysql.createPool(db_credentials);

//instanciamos el sdk
var AWS = require("aws-sdk");
//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);
//const ddb = new AWS.DynamoDB(aws_keys.dynamodb);
//const rek = new AWS.Rekognition(aws_keys.rekognition);
//const translate = new AWS.Translate(aws_keys.translate);
//const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);

//--------------------------------------------------ALMACENAMIENTO---------------------------------------

//subir archivos en s3
app.post("/subirArchivo", function (req, res) {
  const { nombre, tipo, extension, archivo } = req.body;

  //carpeta y nombre que quieran darle a la imagen
  let encodedFile = archivo;
  let decodedFile = Buffer.from(encodedFile, "base64");
  let filename = `${nombre}-${uuid()}.${extension}`;
  let tipoContenido;
  
  if(extension === "pdf"){
    tipoContenido = "application/pdf"
  }else if (extension === "txt"){
    tipoContenido = "text/plain";
  }else if(extension === "png" || extension === "PNG" || extension === "JPG" || extension === "jpg"){
    tipoContenido = "image";
  }

  let bucketname = "archivos-2-p1";
  let folder = "archivos/";
  let filepath = `${folder}${filename}`;
  var uploadParamsS3 = {
    Bucket: bucketname,
    Key: filepath,
    Body: decodedFile,
    ContentType: tipoContenido,
    ACL: "public-read",
  };

  s3.upload(uploadParamsS3, async function (er, data) {
    if (er) {
      res.send({ mensaje: "Error al subir archivo" });
    } else {
      let consulta = "INSERT INTO Archivo (nombre, tipo, path, extension) VALUES(?,?,?,?)";
      conn.query(
        consulta,
        [nombre, tipo, data.Location, extension],
        function (err, result) {
          if (err) throw err;
          data ={
            "path": data.Location
          }
          let consulta2 = "select * from Archivo where ?"
           conn.query(consulta2,[data], async function(e,d){
            if(e) throw e
            await res.status(200).json({ "idArchivo": d[0].idArchivo })
          })
        }
      );
    }
  });
});

app.post('/detalleArchivo', async function(req,res){
  const { Archivo_idArchivo, Usuario_idUsuario, Usuario_correo } =  req.body;
  //console.log(req.body);
  let consulta = 'INSERT INTO Detalle_Archivo (Archivo_idArchivo, Usuario_idUsuario, Usuario_correo) VALUES (?,?,?)'

  await conn.query(consulta, [Archivo_idArchivo,Usuario_idUsuario,Usuario_correo], function(err, result){
    if(err) throw err;
    res.status(200).json({
      msg: true
    });
  })
})

//obtener foto en s3
app.post("/obtenerfoto", function (req, res) {
  var id = req.body.id;
  //direcccion donde esta el archivo a obtener
  var nombrei = "fotos/" + id + ".pdf";
  var getParams = {
    Bucket: "archivos-2-p1",
    Key: nombrei,
  };
  s3.getObject(getParams, function (err, data) {
    if (err) res.json({ mensaje: "error" });
    //de bytes a base64
    var dataBase64 = Buffer.from(data.Body).toString("base64");
    res.json({ mensaje: dataBase64 });
  });
});

app.get("/listpublic", async (req, res) => {
  //var id = parseInt(req.query.id + '');
  let consulta ="select distinct Archivo.nombre,Archivo.extension,Archivo.path from Usuario,Archivo,Detalle_Archivo where Detalle_Archivo.Usuario_idUsuario="+ req.query.id + 
  " and  Detalle_Archivo.Archivo_idArchivo=Archivo.idArchivo and Archivo.tipo = 0"
  conn.query(consulta, [], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/listprivate", async (req, res) => {
  //var id = parseInt(req.query.id + '');
  let consulta ="select distinct Archivo.nombre,Archivo.extension,Archivo.path from Usuario,Archivo,Detalle_Archivo where Detalle_Archivo.Usuario_idUsuario="+ req.query.id + 
  " and  Detalle_Archivo.Archivo_idArchivo=Archivo.idArchivo and Archivo.tipo = 1"
  conn.query(consulta, [], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/listpublicfriends", async (req, res) => {
  //var id = parseInt(req.query.id + '');
  let consulta ="select Archivo.idArchivo,Usuario.nombre as usuario,Archivo.nombre,Archivo.extension,Archivo.path from Usuario,Archivo,Detalle_Archivo,Detalle_Amigo where Detalle_Amigo.Usuario_idUsuario = "+ req.query.id + 
  " and Detalle_Amigo.Usuario_idUsuario1 = Usuario.idUsuario and Detalle_Archivo.Usuario_idUsuario=Usuario.idUsuario and Detalle_Archivo.Archivo_idArchivo=Archivo.idArchivo and Archivo.tipo = '0'"
  conn.query(consulta, [], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
//--------------------------------------------------BASES DE DATOS ---------------------------------------
app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  consulta = "select * from Usuario where ? ";

  var data = {
    correo: correo,
  };
  let hash;
  conn.query(consulta, data, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      hash = result[0].password;
      bcrypt.compare(password, hash).then(function (r) {
        if (r) {
          res.json({
            /*msg: true,*/
            /* DatosUsuario: {*/
            id: result[0].idUsuario,
            nombre: result[0].nombre,
            correo: result[0].correo,
            foto: result[0].foto,
            /*},*/
          });
        }
      });
    }
  });
});

app.post("/signup", async (req, res) => {
  const { nombre, correo, password, foto, extension } = req.body;
  let encodedImage = foto;
  let decodedImage = Buffer.from(encodedImage, "base64");
  let filename = `${nombre}-${uuid()}.${extension}`;

  let bucketname = "archivos-2-p1";
  let folder = "fotoUsuarios/";
  let filepath = `${folder}${filename}`;
  var uploadParamsS3 = {
    Bucket: bucketname,
    Key: filepath,
    Body: decodedImage,
    ContentType: "image",
    ACL: "public-read",
  };
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send({ mensaje: "Algo paso con el hash" });
    } else {
      s3.upload(uploadParamsS3, async function (er, data) {
        if (er) {
          res.send({ mensaje: "Error al subir foto" });
        } else {
          let consulta =
            "INSERT INTO Usuario (nombre, correo, password, foto) VALUES(?,?,?,?)";
          conn.query(
            consulta,
            [nombre, correo, hash, data.Location],
            function (err, result) {
              if (err) throw err;
              res.status(200).json({
                msg: true,
              });
            }
          );
        }
      });
    }
  });
});

app.get("/listausuarios", async (req, res) => {
  //var id = parseInt(req.query.id + '');
  let consulta =
  "select idUsuario,nombre,correo,foto,(select count(*) from Detalle_Archivo,Archivo where Detalle_Archivo.Archivo_idArchivo=Archivo.idArchivo and Archivo.tipo = '0' and Detalle_Archivo.Usuario_idUsuario=Usuario.idUsuario) as archivospublicos from Usuario where idUsuario!="+ req.query.id
  // console.log(consulta) 
  /*let consulta = 'select count(idArchivo) cuenta, us.nombre, us.idUsuario, us.foto, us.correo from Usuario us\
  join Detalle_Archivo da on da.Usuario_idUsuario = us.idUsuario\
  join Archivo ar on ar.idArchivo = da.Archivo_idArchivo\
  where ar.tipo = 0 and us.idUsuario !='+req.query.id+'\
  group by us.nombre'*/
  conn.query(consulta, [], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/agregarAmigo", (req, res) => {
  const { id, correo, idAmigo, correoAmigo } = req.body;
  //console.log(req.body);
  let consulta =
    "INSERT INTO Detalle_Amigo (Usuario_idUsuario, Usuario_correo, Usuario_idUsuario1, Usuario_correo1) VALUES (?,?,?,?)";
  conn.query(
    consulta,
    [id, correo, idAmigo, correoAmigo],
    function (err, resul) {
      if (err) throw err;
      res.status(200).json({
        msg: true,
      });
    }
  );
});
