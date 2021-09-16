# Manual técnico

# U-Storage 

## Indice

  - [Objetivos](#objetivos)
  - [Arquitectura](#arquitectura)
  - [Usuarios IAM](#usuarios-iam)
  - [Pasos](#pasos)
  - [Conclusion](#conclusion)


## Objetivos
### General
- Cloud permite la innovación a través del acceso a nuevas tecnologías de forma
rápida, segura y fácil.

### Específicos
- Aplicar los conocimientos adquiridos tanto de la clase magistral y el laboratorio.
- Implementar una arquitectura utilizando servicios en la nube.
- Integrar servicios de AWS.
- Aplicar las tecnologías de la nube a un entorno real.

## Arquitectura

![Arquitectura](img/arquitectura.PNG "Arquitectura")

## Usuario IAM
  
  ### Usuarios Administrador
  Administrador_201403632
  Administrador_201603052
  
  ### Usuario para bucket
  s3_user
 
 ## Pasos
  ### Creación de bucket
  Para la creación de un Bucket primero se debe de buscar S3
  
 ![Arquitectura](ImgAWS/SearchS3.JPG "Nombre Region bucket")  
 
  luego ir a boton "Crear Bucket" al presionar este boton saldran los siguientes datos que se deben de llenar:
  
  1. Primero se debe de ingresar el nombre de Bucket y región en la cuál se desea crear.
 
 ![Arquitectura](ImgAWS/BucketNombreRegion.JPG "Nombre Region bucket")  
 
 2. Luego se ingresa si deseamos tener nuestro bucket privado o público, para nuestro caso será publico por lo que desmarcaremos "Block all public access"
 
 ![Arquitectura](ImgAWS/BucketAccesibilidad.JPG "Accesibilidad bucket") 
 
 3. Al ingresar los datos anteriores veremos una opción la cuál nos permite tener versionamientos de bucket, para nuestro caso la dejaremos "Disabled", también podremos      agregar Tags.
 
 ![Arquitectura](ImgAWS/BucketVersioningTags.JPG "Versionamiento bucket") 
  
  4. Encriptacion la dejaremos por defecto, para finalizar presionamos el botón "Crear Bucket"
  
 ![Arquitectura](ImgAWS/FinalCrear.JPG "Versionamiento bucket") 

  5. Al final podremos ver el Bucket creado.

 ![Arquitectura](ImgAWS/BucketCreado.JPG "Creado bucket") 
 
 ### Creación de RDS (Base de datos)
  
  1. Vamos a buscar RDS luego escogemos la primero opción que indica.

  ![Arquitectura](ImgAWS/SearchRds.JPG "Search RDS")
  
  2. Antes de crear una base de datos, se creara una Subnet Groups.
  
  ![Arquitectura](ImgAWS/SubnetGroupsDashboard.JPG "Subnet Groups Dashboard")
  
  3. Presionamos el Boton "Create DB Subnet Group"
  
  ![Arquitectura](ImgAWS/BotonSubnetGroupCrear.JPG "Boton Subnet Groups")
  
  4. Luego de presionar el botón mostrara la siguiente pantalla para ingresar los siguientes datos:

  ![Arquitectura](ImgAWS/NombreVpcSubnetGroup.JPG "Vpc Subnet Groups")
  
  ![Arquitectura](ImgAWS/AgregarSubnetGroup.JPG "Agregar Subnet Group")
  
  5. Por último podremos ver las Subnet creadas.

  ![Arquitectura](ImgAWS/SubnetGroupCreada.JPG "Subnet Groups Creada")
  
  6. Luego de creada la Subnet Group, crearemos la base de datos para ellos nos dirigiremos a "Databases" tal y como se muestra en la siguiente imagen.

  ![Arquitectura](ImgAWS/DatabaseDashborard.JPG "Database Dashboard")
  
  7. Para crear la base de datos, presionaremos el botón "Create Database"

  ![Arquitectura](ImgAWS/BotonDatabaseCrear.JPG "Boton crear Database")
  
  8. Luego de presionar el botón, se mostrara una pantalla para escoger el metodo de creación y el motor de base de datos a utilizar
  
  ![Arquitectura](ImgAWS/MetodoMotorDatabase.JPG "Motor y metodo database")
  
  9. También escogeremos la prueba gratiuta para crear nuestra base de datos.
  
  ![Arquitectura](ImgAWS/PruebaGratisDatabase.JPG "Gratis database")
  
  10. Luego podremos escribir el nombre de nuestra base de datos y las credenciales como el nombre y contraseña
  
  ![Arquitectura](ImgAWS/SettingDatabase.JPG "Configuración database")
  
  11. En la instancia no modificaremos por lo que lo dejaremos tal y como aparece en la imagen siguiente.
  
  ![Arquitectura](ImgAWS/DbInstanciaClass.JPG "Instancia database")
  
  12. En almacenamiento de igual forma lo dejaremos como esta predeterminado.
  
  ![Arquitectura](ImgAWS/StorageDatabase.JPG "Storage database")
  
  13. En conectividad escogeremos la vpc, esta puede ser una que hayamos creado o ya sea la que este por defecto.

  ![Arquitectura](ImgAWS/Conectividad1.JPG "Conectividad database")
  
  ![Arquitectura](ImgAWS/Conectividad2.JPG "Conectividad database")
  
  14. Para la autencticación escogeremos por contraseña, y este metodo nos permitira ingresar con la contraseña escrita el pasos anteriores.
  
  ![Arquitectura](ImgAWS/AutenticacionDatabase.JPG "Autenticacion database")
  
  15. Ya para finalizar nos mostrara un pequeño resumen de los costos que podremos tener al crear la base de datos, en nuestro caso al elegir la capa gratuita no tenemos un costo estimado y por último presionaremos el boton "Create Database".

  ![Arquitectura](ImgAWS/CostoCrearDatabase.JPG "Costo crear database")
  
  16. Al finalizar podremos visualizar nuestras bases de datos creadas.
  
  ![Arquitectura](ImgAWS/DatabaseCreada.JPG "Creada database")
  
  ### Creación de VPC
  
  ![Arquitectura](ImgAWS/SubnetGroupCreada.JPG "Arquitectura")
