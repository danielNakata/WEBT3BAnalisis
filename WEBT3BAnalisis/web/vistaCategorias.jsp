<%-- 
    Document   : menuPrincipal
    Created on : 22/10/2018, 05:36:42 PM
    Author     : Victor Daniel
--%>

<%@page import="org.json.JSONObject"%>
<%@page import="com.sun.xml.messaging.saaj.util.Base64"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String usuario = "";
    JSONObject usuarioJSON = null;
    boolean existe = false;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie c : cookies) {
            if (c.getName().equals("t3blogisticausuario")) {
                existe = true;
                usuario = c.getValue();
                usuario = Base64.base64Decode(usuario);
                System.out.println("usuario decodificado: " + usuario);
                usuarioJSON = new JSONObject(usuario);
                usuarioJSON = usuarioJSON.getJSONArray("tipos").getJSONObject(0);
            }
        }
        if (!existe) {
            try {
                usuario = request.getSession().getAttribute("usuario").toString();
                usuario = Base64.base64Decode(usuario);
                System.out.println("usuario decodificado sesion: " + usuario);
                usuarioJSON = new JSONObject(usuario);
                usuarioJSON = usuarioJSON.getJSONArray("tipos").getJSONObject(0);
            } catch (Exception ex) {
                response.sendRedirect("index.jsp");
            }
        }
    } else {
        response.sendRedirect("index.jsp");
    }

%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Analisis Compras">
        <meta name="author" content="voc">
        <title>.:T3B Analisis Compras:. Vista por Categorias<%= usuarioJSON.getString("ulogin") + " " + usuarioJSON.getString("unombre") + " " + usuarioJSON.getString("uapellidop")%></title>
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/all.min.css" rel="stylesheet" type="text/css" />
        <link href="css/dataTables.bootstrap4.css" rel="stylesheet" />
        <link href="jqueryui/jquery-ui.css" rel="stylesheet" />
        <link href="css/album.css" rel="stylesheet" />
        <link href="css/estilogral.css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="jqueryui/jquery-ui.js"></script>    
        <script type="text/javascript" src="https://online.tableau.com/javascripts/api/tableau-2.min.js"></script>
        <script type="text/javascript" src="js/ftableau.js"></script>
        <script type="text/javascript" >
        </script>
    </head>

    <body onload="cargaDashboardTableau2('DPzsRegionesxTipo', 'divgraficaCategoria')">
        <header>
            <div class="collapse bg-dark" id="navbarHeader">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 col-md-7 py-4">
                            <h4 class="text-white">Usuario</h4>
                            <p class="text-white">
                                Usuario: <strong><%= usuarioJSON.getString("ulogin")%></strong> <br />
                                Nombre: <strong><%= usuarioJSON.getString("unombre") + " " + usuarioJSON.getString("uapellidop")%></strong><br />
                                Area: <strong><%= usuarioJSON.getString("uarea")%></strong><br />
                                Perfil: <strong><%= usuarioJSON.getString("uclavegrupo")%></strong><br />
                                Email: <strong><%= usuarioJSON.getString("umail")%></strong><br />
                            </p>
                        </div>
                        <div class="col-sm-4 offset-md-1 py-4">
                            <h4 class="text-white">Opciones</h4>
                            <ul class="list-unstyled">
                                <li><a href="menuPrincipal.jsp" class="text-white">Volver al Menu</a></li>
                                <li><a href="#" class="text-white">Administrar Categorias</a></li>
                                <li><a href="index.jsp" class="text-white">Salir</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar navbar-dark bg-dark shadow-sm">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <strong>T3B Análisis: Categorias</strong>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>

        <main role="main">


            <section class="jumbotron text-center">
                <div class="container">
                    <p>
                        <a href="vistaRegional.jsp" class="btn btn-secondary my-2">Vista por Regiones</a>
                        <a href="vistaCategorias.jsp" class="btn btn-primary2 my-2">Vista por Categorias</a>
                        <a href="vistaProveedores.jsp" class="btn btn-secondary my-2">Vista por Proveedores</a>
                    </p>
                </div>
                <div class="container">
                    <h4 class="jumbotron-heading">Opciones</h4>
                    <p>
                        <a href="#" onclick="cargaDashboardTableau2('DPzsRegionesxTipo', 'divgraficaCategoria')" class="btn btn-secondary my-2">Tipo de Producto</a>
                        <a href="#" onclick="cargaDashboardTableau2('DPzsRegionesxTipo2', 'divgraficaCategoria')" class="btn btn-secondary my-2">Producto</a>
                    </p>
                </div>
            </section>

            <div id="divgraficaCategoria" style="height: auto; width: 80%; padding: 0px; margin-left: 10%;">

            </div>

        </main>

        <footer class="text-muted">
            <div class="container">
                <p class="float-right">
                    <a href="menuPrincipal.jsp">Volver al Menu Principal</a>
                </p>
                <p>T3B Logistica</p>
            </div>
        </footer>

        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/jquery.easing.min.js"></script>
        <script src="js/Chart.min.js"></script>
        <script src="js/jquery.dataTables.js"></script>
        <script src="js/dataTables.bootstrap4.js"></script>
        <script src="js/sb-admin.min.js"></script>

    </body>

</html>