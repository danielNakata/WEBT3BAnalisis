<%-- 
    Document   : index
    Created on : 22/10/2018, 04:36:07 PM
    Author     : Victor Daniel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Analisis Compras">
    <meta name="author" content="voc">
    <link rel="icon" href="css/favicon.ico">
    <title>.:T3B Analisis Compras:.</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body>
      <div class="container" style="height: auto; width: 60%; margin-left: 20%;">
      <form class="form-signin" action="InicioSesion">
        <img src="img/3B.png" style="width: 40%; height: 40%; margin-left: 30%;"/>
        <h2 class="form-signin-heading">Analisis Compras</h2>
        <label for="inputEmail" class="sr-only">Usuario</label>
        <input type="text" id="txtUsuario" name="txtUsuario" class="form-control" placeholder="Usuario" required autofocus>
        <label for="inputPassword" class="sr-only">Contraseña</label>
        <input type="password" id="txtContrasena" name="txtContrasena" class="form-control" placeholder="Contraeña" required>
        <div class="checkbox">
          <label>
            <input id="chkRecuerda" name="chkRecuerda" type="checkbox" value="1"> Recuerda
          </label>
        </div>
        <button class="btn btn-lg btn-primary2 btn-block" type="submit">Ingresar</button>
      </form>
    </div> 
  </body>
</html>
