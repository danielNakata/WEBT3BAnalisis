<%-- 
    Document   : menuPrincipal
    Created on : 22/10/2018, 05:36:42 PM
    Author     : Victor Daniel
--%>

<%@page import="com.sun.xml.messaging.saaj.util.Base64"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String usuario = "";
    boolean existe = false;
    Cookie[] cookies = request.getCookies();
    if(cookies != null){
        for(Cookie c : cookies){
            if(c.getName().equals("t3blogisticausuario")){
                existe = true;
                usuario = c.getValue();
                usuario = Base64.base64Decode(usuario);
                System.out.println("usuario decodificado: " + usuario);
            }               
        }
        if(!existe){
            response.sendRedirect("index.jsp");
        }
    }else{
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
        <title>.:T3B Analisis Compras:.</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/all.min.css" rel="stylesheet" type="text/css" />
        <link href="css/dataTables.bootstrap4.css" rel="stylesheet" />
        <link href="jqueryui/jquery-ui.css" rel="stylesheet" />
        <link href="css/sb-admin.css" rel="stylesheet" />
        <link href="css/estilogral.css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="jqueryui/jquery-ui.js"></script>    
        <script type="text/javascript" src="https://online.tableau.com/javascripts/api/tableau-2.min.js"></script>
        <script type="text/javascript" src="js/ftableau.js"></script>
        <script type="text/javascript" >
        </script>
    </head>

    <body id="page-top">
        <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
            <a class="navbar-brand mr-1" href="index.jsp">Analisis Compras</a>
            <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                <i class="fas fa-bars"></i>
            </button>

            <!-- Navbar Search -->
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>

            <!-- Navbar -->
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <i class="fas fa-user-circle fa-fw"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">Usuario</a>
                        <a class="dropdown-item" href="#">Opciones</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Salir</a>
                    </div>
                </li>
            </ul>

        </nav>

        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="sidebar navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="menuPrincipal.jsp" onclick="cargaPagina('dashboard')">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Niveles</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                        <h6 class="dropdown-header">Compras</h6>
                        <a class="dropdown-item" href="#" onclick="tipoDash(1)">Dashboard</a>
                        <a class="dropdown-item" href="#" onclick="tipoDash(5)">Compare</a>
                        <a class="dropdown-item" href="#" onclick="tipoDash(3)">Proveedores</a>
                        <a class="dropdown-item" href="#" onclick="tipoDash(2)">Grupos</a>
                        <a class="dropdown-item" href="#" onclick="tipoDash(4)">Productos</a>                        
                    </div>
                </li>

            </ul>

            <div id="content-wrapper">

                <div class="container-fluid" id="contenido">
                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Overview</li>
                    </ol>

                    <!-- Icon Cards -->
                    <div class="row">
                        <div class="col-xl-6 col-sm-6 mb-3">
                            <div class="card text-white bg-primary o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-comments"></i>
                                    </div>
                                    <div class="mr-5">Regiones </div>
                                    <input class="form-check-inline" type="checkbox" id="chkTodos" name="chkTodos" checked="true" value="0" onclick="checkTodos()" />Todos
                                    <table class="table">
                                        <tr>
                                            <td><input class="form-check-inline" type="checkbox" id="chkCi2" name="chkCi2" value="R01 - CI2" checked="true" onclick="checkInd(this.id)" />R01 - CI2</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkRys" name="chkRys" value="R02 - RYS" checked="true" onclick="checkInd(this.id)" />R02 - RYS</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkBar" name="chkBar" value="R03 - BAR" checked="true" onclick="checkInd(this.id)" />R03 - BAR</td>
                                        </tr>
                                        <tr>
                                            <td><input class="form-check-inline" type="checkbox" id="chkMet" name="chkMet" value="R04 - MET" checked="true" onclick="checkInd(this.id)" />R04 - MET</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkYau" name="chkYau" value="R05 - YAU" checked="true" onclick="checkInd(this.id)" />R05 - YAU</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkTex" name="chkTex" value="R06 - TEX" checked="true" onclick="checkInd(this.id)" />R06 - TEX</td>
                                        </tr>
                                        <tr>
                                            <td><input class="form-check-inline" type="checkbox" id="chkTla" name="chkTla" value="R07 - TLA" checked="true" onclick="checkInd(this.id)" />R07 - TLA</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkCel" name="chkCel" value="R08 - CEL" checked="true" onclick="checkInd(this.id)" />R08 - CEL</td>
                                            <td><input class="form-check-inline" type="checkbox" id="chkPue" name="chkPue" value="R09 - PUE" checked="true" onclick="checkInd(this.id)" />R09 - PUE</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">Periodos</td>
                                        </tr>
                                        <tr>
                                            <td>Inicio: <input type='date' class="form-control" id='fechaIni' name='fechaIni' value="2017-01-01" onchange="afFechas()"/></td>
                                            <td>Fin <input type='date' class="form-control" id='fechaFin' name='fechaFin' value="2018-10-01"  onchange="afFechas()"/></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-warning o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-list"></i>
                                    </div>
                                    <div class="mr-5">Proveedor</div>
                                    <select id="cmbProveedor" name="cmbProveedor" class="form-control" onchange="afProveedor()">
                                    </select>
                                    <div class="mr-5">Grupo</div>
                                    <select id="cmbGrupo" name="cmbGrupo" class="form-control" onchange="cargaLineasxGrupo(this.value)">
                                    </select>
                                    <div class="mr-5">Linea</div>
                                    <select id="cmbLinea" name="cmbLinea" class="form-control" onchange="afGrupoLinea()">     
                                    </select>
                                    <div class="mr-5">Tipo de Productos</div>
                                    <table class="table">
                                        <tr>
                                            <td><input type="checkbox" value="MP" id="chkMP" name="chkMP" checked="true" onclick="checkTipoProd(this.id)" />MP</td>
                                            <td><input type="checkbox" value="MC" id="chkMC" name="chkMC" checked="true"  onclick="checkTipoProd(this.id)" />MC</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" value="TP" id="chkTP" name="chkTP" checked="true"  onclick="checkTipoProd(this.id)" />TP</td>
                                            <td><input type="checkbox" value="IO" id="chkIO" name="chkIO" checked="true"  onclick="checkTipoProd(this.id)" />IO</td>
                                        </tr>
                                    </table> 
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-success o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-shopping-cart"></i>
                                    </div>
                                    Unidad: 
                                    <select class="form-control" id='cmbUnidad' name='cmbUnidad'  onchange="accionAgrupa()">
                                        <option value='pesos'>Costo</option>
                                        <option value='piezas'>Piezas</option>
                                    </select>
                                    Mostrar por: 
                                    <select class="form-control" id='cmbMostrar' name='cmbMostrar' onchange="accionAgrupa()">
                                        <option value='diario'>Diario</option>
                                        <option value='semana'>Semana</option>
                                    </select>
                                    Agrupar por: 
                                    <select class="form-control" id='cmbAgrupacion' name='cmbAgrupacion' onchange="accionAgrupa()">
                                        <option value='Grupo-Linea'>Grupo-Linea</option>
                                        <option value='Proveedor'>Proveedor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graficas -->
                <div class="card mb-3">
                    <div class="card-header">
                        <i class="fas fa-chart-area"></i>
                        Area Chart Example</div>
                    <div class="card-body">
                        <div id="divgrafica"></div>
                    </div>
                </div>

            </div>
            <!-- /.container-fluid -->

            <!-- Sticky Footer -->
            <footer class="sticky-footer">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright © Tiendas 3B 2018</span>
                    </div>
                </div>
            </footer>

        </div>
        <!-- /.content-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/Chart.min.js"></script>
    <script src="js/jquery.dataTables.js"></script>
    <script src="js/dataTables.bootstrap4.js"></script>
    <script src="js/sb-admin.min.js"></script>

</body>

</html>