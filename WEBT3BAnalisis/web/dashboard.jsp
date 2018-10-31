<%-- 
    Document   : dashboard
    Created on : 29/10/2018, 05:25:32 PM
    Author     : danie
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div class="container-fluid">
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
                    <select id="cmbProveedor" name="cmbProveedor" class="form-control">
                    </select>
                    <div class="mr-5">Grupo</div>
                    <select id="cmbGrupo" name="cmbGrupo" class="form-control" onclick="cargaLineasxGrupo(this.value)">
                    </select>
                    <div class="mr-5">Linea</div>
                    <select id="cmbLinea" name="cmbLinea" class="form-control" onclick="afGrupoLinea()">     
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
                    <div class="mr-5">Periodos</div>
                    <div class="container">
                        <div class="row">
                            <div class='col-sm-6'>
                                Inicio <input type='date' class="form-control" id='fechaIni' name='fechaIni' value="2017-01-01" onchange="afFechas()"/>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class='col-sm-6'>
                                Fin <input type='date' class="form-control" id='fechaFin' name='fechaFin' value="2018-10-01"  onchange="afFechas()"/>
                            </div>
                        </div>
                    </div>
                    Agrupar por: 
                    <select class="form-control" id='cmbAgrupacion' name='cmbAgrupacion'>
                        <option value='diario'>Diario</option>
                        <option value='semana'>Semanal</option>
                        <option value='Mes'>Mensual</option>
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

<script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/Chart.min.js"></script>
    <script src="js/jquery.dataTables.js"></script>
    <script src="js/dataTables.bootstrap4.js"></script>
    <script src="js/sb-admin.min.js"></script>
</div>
