/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var woorkbook, viz;
var arrCheck = ['chkCi2', 'chkRys', 'chkBar', 'chkMet', 'chkYau', 'chkTex', 'chkTla', 'chkCel', 'chkPue'];

var arrCmbs = ['cmbGrupo', 'cmbLinea'];

var filtroActual = {};
var filtroAnterior = {};

var fechaIni;
var fechaFin;
var cmbProveedor;
var cmbGrupo;
var cmbLinea;
var chkMP;
var chkMC;
var chkTP;
var chkIO;
var chkCi2;
var chkRys;
var chkBar;
var chkMet;
var chkYau;
var chkTex;
var chkTla;
var chkCel;
var chkPue;
var cmbUnidad;
var cmbMostrar;
var cmbAgrupacion;

var vizDiv;
var vizURL;
var options;

var controlPantallas = {
    piezasKgxGpo: {
        semana: 'DPzsKgxGpo'
        , dia: 'DPzsKgxGpoDia'
    }
    , piezasTipoxGpo: {
        semana: 'DPzsTipoxGpo'
        , dia: 'DPzsTipoxGpoDia'
        , tienda: 'DPzsTipoxGpoTdasAbtas'
    }
    , piezasTipoxGpoProv: {
        semana: 'DPzasTipoxGpoProv'
        , dia: 'DPzasTipoxGpoProvDia'
        , tienda: 'DPzasTipoxGpoProvTdasAbtas'
    }
    , costoTipoxGpo: {
        semana: 'DCstTipoxGpo'
        , dia: 'DCstTipoxGpoDia'
        , tienda: 'DCstTipoxGpoTdasAbtas'
    }
    , piezasProvProd: {
        semana: 'DPzsProvProd'
        , dia: 'DPzsProvProdDia'
        , tienda: 'DPzasProvProdTdaAbtas'
    }
    , costoProvProd: {
        semana: 'DCstProvProd'
        , dia: 'DCstProvProdDia'
        , tienda: 'DCstProvProdTdasAbtas'
    }
    , dashboard: {
        gpoCst: 'DashboardMainCst'
        , gpoPzs: 'DashboardMainPzs'
        , provCst: 'VtaProvCstTrmp'
        , provPzs: 'VtaProvPzasTrmp'
    }
    , compare: {
        provCst: 'DPctgProvCst'
        , provPzs: 'DPctgProvPzs'
        , gpoCst: 'DPctgGpoCst'
        , gpoPzs: 'DPctgGpoPzs'
    }

};
var tipoPagSel = 'dashboard';

function  tipoDash(tipo){
    switch(tipo){
        case 1: tipoPagSel = 'dashboard'; break;
        case 2: tipoPagSel = 'grupolinea'; break;
        case 3: tipoPagSel = 'proveedor'; break;
        case 4: tipoPagSel = 'producto'; break;
        case 5: tipoPagSel = 'compare'; break;
    }
    
    console.log('seleccionado: ' + tipoPagSel);
    accionAgrupa();
}

function accionAgrupa() {
    if (cmbAgrupacion.value === 'Grupo-Linea') {
        console.log("Seleccionado cmb grupo linea");
        if (tipoPagSel === 'dashboard') {
            console.log("Seleccionado cmb grupo linea tipo dashboard");
            if (cmbUnidad.value === 'pesos') {
                console.log("Seleccionado cmb grupo linea tipo dashboard cmb pesos");
                cargaDashboardTableau(controlPantallas.dashboard.gpoCst);
            } else {
                console.log("Seleccionado cmb grupo linea tipo dashboard cmb piezas");
                cargaDashboardTableau(controlPantallas.dashboard.gpoPzs);
            }
        }else{
            if(tipoPagSel === 'compare'){
                console.log("Seleccionado cmb grupo linea tipo compare");
                if (cmbUnidad.value === 'pesos') {
                    console.log("Seleccionado cmb grupo linea tipo compare cmb pesos");
                    cargaDashboardTableau(controlPantallas.compare.gpoCst);
                } else {
                    console.log("Seleccionado cmb grupo linea tipo compare cmb piezas");
                    cargaDashboardTableau(controlPantallas.compare.gpoPzs);
                }
            }else{
                if(tipoPagSel === 'proveedor'){
                    console.log("Seleccionado cmb grupo linea tipo proveedor");
                    if (cmbUnidad.value === 'pesos') {
                        console.log("Seleccionado cmb grupo linea tipo proveedor cmb pesos");
                        if(cmbMostrar.value='diario'){
                            console.log("Seleccionado cmb grupo linea tipo proveedor cmb pesos cmb diario");
                            cargaDashboardTableau(controlPantallas.costoProvProd.dia);
                        }else{
                            console.log("Seleccionado cmb grupo linea tipo proveedor cmb pesos cmb semana");
                            cargaDashboardTableau(controlPantallas.costoProvProd.semana);
                        }
                    } else {
                        console.log("Seleccionado cmb grupo linea tipo proveedor cmb piezas");
                        if(cmbMostrar.value='diario'){
                            console.log("Seleccionado cmb grupo linea tipo proveedor cmb piezas cmb diario");
                            cargaDashboardTableau(controlPantallas.piezasProvProd.dia);
                        }else{
                            console.log("Seleccionado cmb grupo linea tipo proveedor cmb piezas cmb semana");
                            cargaDashboardTableau(controlPantallas.piezasProvProd.semana);
                        }
                    }
                }else{
                    if(tipoPagSel === 'grupolinea'){
                        console.log("Seleccionado cmb grupo linea tipo grupo linea");
                        if (cmbUnidad.value === 'pesos') {
                            console.log("Seleccionado cmb grupo linea tipo grupo linea cmb pesos");
                            if(cmbMostrar.value='diario'){
                                console.log("Seleccionado cmb grupo linea tipo grupo linea cmb pesos cmb diario");
                                cargaDashboardTableau(controlPantallas.costoTipoxGpo.dia);
                            }else{
                                console.log("Seleccionado cmb grupo linea tipo grupo linea cmb pesos cmb semana");
                                cargaDashboardTableau(controlPantallas.costoTipoxGpo.semana);
                            }
                        } else {
                            console.log("Seleccionado cmb grupo linea tipo grupo linea cmb piezas");
                            if(cmbMostrar.value='diario'){
                                console.log("Seleccionado cmb grupo linea tipo grupo linea cmb piezas cmb diario");
                                cargaDashboardTableau(controlPantallas.piezasTipoxGpo.dia);
                            }else{
                                console.log("Seleccionado cmb grupo linea tipo grupo linea cmb piezas cmb semana");
                                cargaDashboardTableau(controlPantallas.piezasTipoxGpo.semana);
                            }
                        }
                    }
                }
            }
        }
    } else {
        console.log("Seleccionado cmb proveedor");
        if (tipoPagSel === 'dashboard') {
            console.log("Seleccionado cmb proveedor tipo dashboard");
            if (cmbUnidad.value === 'pesos') {
                console.log("Seleccionado cmb proveedor tipo dashboard cmb pesos");
                cargaDashboardTableau(controlPantallas.dashboard.provCst);
            } else {
                console.log("Seleccionado cmb proveedor tipo dashboard cmb piezas");
                cargaDashboardTableau(controlPantallas.dashboard.provPzs);
            }
        }else{
            if(tipoPagSel === 'compare'){
                console.log("Seleccionado cmb proveedor tipo compare");
                if (cmbUnidad.value === 'pesos') {
                    console.log("Seleccionado cmb proveedor tipo compare cmb pesos");
                    cargaDashboardTableau(controlPantallas.compare.provCst);
                } else {
                    console.log("Seleccionado cmb proveedor tipo compare cmb piezas");
                    cargaDashboardTableau(controlPantallas.compare.provPzs);
                }
            }else{
                if(tipoPagSel === 'proveedor'){
                    console.log("Seleccionado cmb proveedor tipo proveedor");
                    if (cmbUnidad.value === 'pesos') {
                        console.log("Seleccionado cmb grupo linea tipo proveedor cmb pesos");
                        if(cmbMostrar.value='diario'){
                            console.log("Seleccionado cmb proveedor tipo proveedor cmb pesos cmb diario");
                            cargaDashboardTableau(controlPantallas.costoProvProd.dia);
                        }else{
                            console.log("Seleccionado cmb proveedor tipo proveedor cmb pesos cmb semana");
                            cargaDashboardTableau(controlPantallas.costoProvProd.semana);
                        }
                    } else {
                        console.log("Seleccionado cmb proveedor tipo proveedor cmb piezas");
                        if(cmbMostrar.value='diario'){
                            console.log("Seleccionado cmb proveedor tipo proveedor cmb piezas cmb diario");
                            cargaDashboardTableau(controlPantallas.piezasProvProd.dia);
                        }else{
                            console.log("Seleccionado cmb proveedor tipo proveedor cmb piezas cmb semana");
                            cargaDashboardTableau(controlPantallas.piezasProvProd.semana);
                        }
                    }
                }else{
                    if(tipoPagSel === 'grupolinea'){
                        console.log("Seleccionado cmb proveedor tipo grupo linea");
                        if (cmbUnidad.value === 'pesos') {
                            console.log("Seleccionado cmb proveedor tipo grupo linea cmb pesos");
                            if(cmbMostrar.value='diario'){
                                console.log("Seleccionado cmb proveedor tipo grupo linea cmb pesos cmb diario");
                                cargaDashboardTableau(controlPantallas.costoTipoxGpo.dia);
                            }else{
                                console.log("Seleccionado cmb proveedor tipo grupo linea cmb pesos cmb semana");
                                cargaDashboardTableau(controlPantallas.costoTipoxGpo.semana);
                            }
                        } else {
                            console.log("Seleccionado cmb proveedor tipo grupo linea cmb piezas");
                            if(cmbMostrar.value='diario'){
                                console.log("Seleccionado cmb proveedor tipo grupo linea cmb piezas cmb diario");
                                cargaDashboardTableau(controlPantallas.piezasTipoxGpo.dia);
                            }else{
                                console.log("Seleccionado cmb proveedor tipo grupo linea cmb piezas cmb semana");
                                cargaDashboardTableau(controlPantallas.piezasTipoxGpo.semana);
                            }
                        }
                    }
                }
            }
        }
    }

}

function cargaDashboardTableau(paginaTableau) {
    var ancho = obtieneMaxWidth();
    var alto = obtieneMaxHeight();
    ancho += 'px';
    alto += 'px';
    vizDiv = document.getElementById("divgrafica");
    vizURL = "https://us-west-2b.online.tableau.com/t/tiendas3b/views/20181018ComprasRegional/" + paginaTableau;
    options = {
        width: ancho
        , height: alto
        , hideToolbar: true
        , hideTabs: true
        , onFirstInteractive: function () {
            woorkbook = viz.getWorkbook();
        }
        ,onLoad: function(){
            actualizaFiltro();
        }
    };
    try {
        viz.dispose();
    } catch (ex) {
        console.log("excepcion en el dispose: " + ex.message);
    }
    viz = new tableauSoftware.Viz(vizDiv, vizURL, options);    
}

function obtieneMaxWidth() {
    var maxHeight = screen.width;
    var pctg = maxHeight * 80 / 100;
    return pctg;
}

function obtieneMaxHeight() {
    var maxHeight = screen.height;
    var pctg = maxHeight * 60 / 100;
    return pctg;
}

function inicializaCmb(id) {
    $('#' + id).html('');
}


/**
 * Metodo para cargar los catalogos
 * @returns {undefined}
 */
function cargaCatalogos() {
    fechaIni = document.getElementById("fechaIni");
    fechaFin = document.getElementById("fechaFin");
    cmbProveedor = document.getElementById("cmbProveedor");
    cmbGrupo = document.getElementById("cmbGrupo");
    cmbLinea = document.getElementById("cmbLinea");
    chkMP = document.getElementById("chkMP");
    chkMC = document.getElementById("chkMC");
    chkTP = document.getElementById("chkTP");
    chkIO = document.getElementById("chkIO");
    chkCi2 = document.getElementById("chkCi2");
    chkRys = document.getElementById("chkRys");
    chkBar = document.getElementById("chkBar");
    chkMet = document.getElementById("chkMet");
    chkYau = document.getElementById("chkYau");
    chkTex = document.getElementById("chkTex");
    chkTla = document.getElementById("chkTla");
    chkCel = document.getElementById("chkCel");
    chkPue = document.getElementById("chkPue");
    cmbUnidad = document.getElementById("cmbUnidad");
    cmbMostrar = document.getElementById("cmbMostrar");
    cmbAgrupacion = document.getElementById("cmbAgrupacion");
    cargaProveedores();
    var jsonCmb = "";
    //llamada a la consulta de grupos
    $.ajax({
        type: 'GET'
        , url: 'ConsultaGrupos'
        , dataType: 'json'
        , success: function (result) {
            jsonCmb = result;
            inicializaCmb('cmbGrupo');
            $.each(jsonCmb.grupos, function (i, item) {
                $('#cmbGrupo').append('<option value="' + item.gclave + '-' + item.gdesc + '">' + item.gdesc + '</option>');
            });
            cargaLineasxGrupo(document.getElementById("cmbGrupo").value);
            actualizaFiltro();
        }
    });
}

function cargaLineasxGrupo(param) {
    var jsonCmb2 = "";
    //llamada a la consulta de lineas
    $.ajax({
        type: 'GET'
        , url: 'ConsultaLineasxGrupo?paIdGrupo=' + param
        , dataType: 'json'
        , success: function (result) {
            jsonCmb2 = result;
            inicializaCmb('cmbLinea');
            $.each(jsonCmb2.grupos, function (i, item) {
                $('#cmbLinea').append('<option value="' + item.ldesc + '">' + item.ldesc + '</option>');
            });
        }
    });

    if (tipoPagSel === 'dashboard') {
        actualizaFiltro();
    }
}

function cargaTipoProductos() {
    var jsonCmb2 = "";
    //llamada a la consulta de lineas
    $.ajax({
        type: 'GET'
        , url: 'ConsultaTipoProds'
        , dataType: 'json'
        , success: function (result) {
            jsonCmb2 = result;
            inicializaCmb('cmbTipo');
            $.each(jsonCmb2.tipos, function (i, item) {
                $('#cmbTipo').append('<option value="' + item.itype + '-' + item.type_desc + '">' + item.type_desc + '</option>');
            });
        }
    });
}

function cargaProveedores() {
    try {
        var jsonCmb2 = "";
        $.ajax({
            type: 'GET'
            , url: 'ConsultaProveedores'
            , dataType: 'json'
            , success: function (result) {
                jsonCmb2 = result;
                inicializaCmb('cmbProveedor');
                $.each(jsonCmb2.proveedores, function (i, item) {
                    $('#cmbProveedor').append('<option value="' + item.pclave + '-' + item.pnombre + '">' + item.pnombre + '-' + item.pclave + '</option>');
                });
            }
        });
    } catch (ex) {
        console.log('Excepcion cmb Proveedores' + x.message);
    }
}

/**
 * Esto lo carga siempre al inicio
 * @returns {undefined}
 */
window.onload = function () {
    var ancho = obtieneMaxWidth();
    var alto = obtieneMaxHeight();
    ancho += 'px';
    alto += 'px';
    vizDiv = document.getElementById("divgrafica");
    vizURL = "https://us-west-2b.online.tableau.com/t/tiendas3b/views/20181018ComprasRegional/" + controlPantallas.dashboard.gpoCst;
    options = {
        width: ancho
        , height: alto
        , hideToolbar: true
        , hideTabs: true
        , onFirstInteractive: function () {
            woorkbook = viz.getWorkbook();
        }
    };
    try {
        viz.dispose();
    } catch (ex) {
        console.log("excepcion en el dispose: " + ex.message);
    }
    viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
    cargaCatalogos();
}

/*Funciones de tableau*/
function switchView(sheetName) {
    workbook.activateSheetAsync(sheetName);
}


function checkTodos() {
    var chktodos = document.getElementById('chkTodos');
    for (var i = 0; i < arrCheck.length; i++) {
        document.getElementById(arrCheck[i]).checked = chktodos.checked;
    }
    actualizaFiltro();
}

function checkInd(id) {
    actualizaFiltro();
}

function checkTipoProd(id) {
    actualizaFiltro();
}

function afGrupoLinea() {
    actualizaFiltro();
}

function afFechas() {
    actualizaFiltro();
}

function afProveedor(){
    actualizaFiltro();
}

/**
 * Supermetodo para actualizar TODOS los fucking filtros de TODOS los dashboard de tableau
 * Al mismo fucking tiempo
 * @returns {undefined}
 */
function actualizaFiltro() {
    var hoja = viz.getWorkbook().getActiveSheet();
    arrHojas = hoja.getWorksheets();
    filtroActual = {
        periodos: {
            nombre: 'Fecha'
            , valores: {
                min: fechaIni.value
                , max: fechaFin.value
            }
        }
        ,mesannio:{
            nombre: 'Fecha'
            ,valores: {
                fecha: fechaFin.value
            }
        }
        , grupoLinea: {
            nombre: 'GrupoLinea'
            , valores: {
                grupo: jQuery.trim(cmbGrupo.value.split("-")[1])
                , linea: cmbLinea.value
            }
        }
        , grupo: {
            nombre: 'Grupo'
            , valores: {
                grupo: jQuery.trim(cmbGrupo.value.split("-")[1])
            }
        }
        , proveedor: {
            nombre: 'Proveedor'
            , valores: {
                pnombre: jQuery.trim(cmbProveedor.value.split("-")[1])
            }
        }
        , tipoProductos: {
            nombre: 'Tipo Producto'
            , valores: [
                {tipo: 'MP', valor: (chkMP.checked === true ? 'MP' : 'vacio')}
                , {tipo: 'MC', valor: (chkMC.checked === true ? 'MC' : 'vacio')}
                , {tipo: 'TP', valor: (chkTP.checked === true ? 'TP' : 'vacio')}
                , {tipo: 'IO', valor: (chkIO.checked === true ? 'IO' : 'vacio')}
            ]
        }
        , regiones: {
            nombre: 'Regiones'
            , valores: [
                {region: 'R01 - CI2', valor: (chkCi2.checked === true ? 'R01 - CI2' : 'vacio')}
                , {region: 'R02 - RYS', valor: (chkRys.checked === true ? 'R02 - RYS' : 'vacio')}
                , {region: 'R03 - BAR', valor: (chkBar.checked === true ? 'R03 - BAR' : 'vacio')}
                , {region: 'R04 - MET', valor: (chkMet.checked === true ? 'R04 - MET' : 'vacio')}
                , {region: 'R05 - YAU', valor: (chkYau.checked === true ? 'R05 - YAU' : 'vacio')}
                , {region: 'R06 - TEX', valor: (chkTex.checked === true ? 'R06 - TEX' : 'vacio')}
                , {region: 'R07 - TLA', valor: (chkTla.checked === true ? 'R07 - TLA' : 'vacio')}
                , {region: 'R08 - CEL', valor: (chkCel.checked === true ? 'R08 - CEL' : 'vacio')}
                , {region: 'R09 - PUE', valor: (chkPue.checked === true ? 'R09 - PUE' : 'vacio')}
            ]
        }
    };
    console.log(JSON.stringify(filtroActual));
    for (var y = 0; y < arrHojas.length; y++) {
        if (tipoPagSel === 'dashboard') {
            
        }else{
            if (tipoPagSel === 'compare') {
                
            }else{
                arrHojas[y].applyRangeFilterAsync(filtroActual.periodos.nombre, {min: new Date(filtroActual.periodos.valores.min), max: new Date(filtroActual.periodos.valores.max)}, 'REPLACE');
            }
            
        }
        

        //valida que si esta seleccionado el dashboard, no lo haga por grupoLinea
        if (tipoPagSel === 'dashboard') {
            console.log('Dashboard seleccionado');
            if(cmbAgrupacion.value === 'Grupo-Linea'){
                console.log('Agrupacion de Grupo-Linea: ' + filtroActual.grupo.nombre);
                arrHojas[y].applyFilterAsync(filtroActual.grupo.nombre, filtroActual.grupo.valores.grupo, 'REPLACE');
            }else{
                console.log('Agrupacion proveedor: ' + filtroActual.proveedor.nombre);
                arrHojas[y].applyFilterAsync(filtroActual.proveedor.nombre, filtroActual.proveedor.valores.pnombre, 'REPLACE');
            }
        } else {
            if (tipoPagSel === 'compare') {
                console.log('compare seleccionado');
                if(cmbAgrupacion.value === 'Grupo-Linea'){
                    console.log('Agrupacion de Grupo-Linea: ' + filtroActual.grupo.nombre);
                    arrHojas[y].applyFilterAsync(filtroActual.grupo.nombre, filtroActual.grupo.valores.grupo, 'REPLACE');
                }else{
                    console.log('Agrupacion proveedor: ' + filtroActual.proveedor.nombre);
                    arrHojas[y].applyFilterAsync(filtroActual.proveedor.nombre, filtroActual.proveedor.valores.pnombre, 'REPLACE');
                }
            }else{
                if (tipoPagSel === 'proveedor') {
                    console.log('tipo proveedor: ' + filtroActual.proveedor.nombre);
                    arrHojas[y].applyFilterAsync(filtroActual.proveedor.nombre, filtroActual.proveedor.valores.pnombre, 'REPLACE');
                }else{
                    if (tipoPagSel === 'grupolinea') {
                        console.log('tipo grupolinea: ' + filtroActual.grupoLinea.nombre);
                        arrHojas[y].applyFilterAsync(filtroActual.grupoLinea.nombre, filtroActual.grupoLinea.valores.grupo + " " + filtroActual.grupoLinea.valores.linea, 'REPLACE');
                    }else{
                        console.log('Pues solo quedan los productos');
                    }
                }
                
            }
            
        }
        
        console.log('Tipos de Productos');
        for (var i = 0; i < filtroActual.tipoProductos.valores.length; i++) {
            if (filtroActual.tipoProductos.valores[i].valor === 'vacio') {
                arrHojas[y].applyFilterAsync(filtroActual.tipoProductos.nombre, filtroActual.tipoProductos.valores[i].tipo, 'REMOVE');
            } else {
                arrHojas[y].applyFilterAsync(filtroActual.tipoProductos.nombre, filtroActual.tipoProductos.valores[i].tipo, 'ADD');
            }
        }
        
        console.log('Regiones Seleccionadas');
        for (var i = 0; i < filtroActual.regiones.valores.length; i++) {
            if (filtroActual.regiones.valores[i].valor === 'vacio') {
                arrHojas[y].applyFilterAsync(filtroActual.regiones.nombre, filtroActual.regiones.valores[i].region, 'REMOVE');
            } else {
                arrHojas[y].applyFilterAsync(+filtroActual.regiones.nombre, filtroActual.regiones.valores[i].region, 'ADD');
            }
        }
    }
}