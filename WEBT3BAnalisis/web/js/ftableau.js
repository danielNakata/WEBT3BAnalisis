/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var woorkbook, viz;
var arrCheck = ['chkCi2','chkRys','chkBar','chkMet','chkYau','chkTex','chkTla','chkCel','chkPue'];

var arrCmbs = ['cmbGrupo', 'cmbLinea'];

var filtroActual = {};
var filtroAnterior = {};

var fechaIni; var fechaFin; var cmbProveedor; var cmbGrupo; var cmbLinea; var chkMP; var chkMC; var chkTP; var chkIO;
var chkCi2; var chkRys; var chkBar; var chkMet; var chkYau; var chkTex; var chkTla; var chkCel; var chkPue;

function obtieneMaxWidth(){
    var maxHeight = screen.width;
    var pctg = maxHeight*80/100;
    return pctg;
}

function obtieneMaxHeight(){
    var maxHeight = screen.height;
    var pctg = maxHeight*60/100;
    return pctg;
}

function inicializaCmb(id){
    $('#'+id).html('');
}

function cargaCatalogos(){
    fechaIni = document.getElementById("fechaIni");
    fechaFin = document.getElementById("fechaFin");
    cmbProveedor = document.getElementById("cmbProveedor");
    cmbGrupo = document.getElementById("cmbGrupo");
    cmbLinea = document.getElementById("cmbLinea");
    chkMP    = document.getElementById("chkMP");
    chkMC   = document.getElementById("chkMC");
    chkTP   = document.getElementById("chkTP");
    chkIO   = document.getElementById("chkIO");
    chkCi2   = document.getElementById("chkCi2");
    chkRys   = document.getElementById("chkRys");
    chkBar   = document.getElementById("chkBar");
    chkMet   = document.getElementById("chkMet");
    chkYau   = document.getElementById("chkYau");
    chkTex   = document.getElementById("chkTex");
    chkTla   = document.getElementById("chkTla");
    chkCel   = document.getElementById("chkCel");
    chkPue   = document.getElementById("chkPue");
    var jsonCmb = "";
    //llamada a la consulta de grupos
    $.ajax({
        type: 'GET'
        ,url: 'ConsultaGrupos'
        ,dataType: 'json'
        ,success: function(result){
            jsonCmb = result;
            inicializaCmb('cmbGrupo');
            $.each(jsonCmb.grupos, function(i,item){
               $('#cmbGrupo').append('<option value="'+item.gclave+'-'+item.gdesc+'">'+item.gdesc+'</option>');
            });
            cargaLineasxGrupo(document.getElementById("cmbGrupo").value);
            cargaProveedores();
            actualizaFiltro();
        }
    });
}

function cargaLineasxGrupo(param){
    var jsonCmb2 = "";
    //llamada a la consulta de lineas
    $.ajax({
        type: 'GET'
        ,url: 'ConsultaLineasxGrupo?paIdGrupo='+param
        ,dataType: 'json'
        ,success: function(result){
            jsonCmb2 = result;
            inicializaCmb('cmbLinea');
            $.each(jsonCmb2.grupos, function(i,item){
               $('#cmbLinea').append('<option value="'+item.ldesc+'">'+item.ldesc+'</option>');
            });
        }
    });
}  

function cargaTipoProductos(){
    var jsonCmb2 = "";
    //llamada a la consulta de lineas
    $.ajax({
        type: 'GET'
        ,url: 'ConsultaTipoProds'
        ,dataType: 'json'
        ,success: function(result){
            jsonCmb2 = result;
            inicializaCmb('cmbTipo');
            $.each(jsonCmb2.tipos, function(i,item){
               $('#cmbTipo').append('<option value="'+item.itype+'-'+item.type_desc+'">'+item.type_desc+'</option>');
            });
        }
    });
}

function cargaProveedores(){
    var jsonCmb2 = "";
    $.ajax({
        type: 'GET'
        ,url: 'ConsultaProveedores'
        ,dataType: 'json'
        ,success: function(result){
            jsonCmb2 = result;
            inicializaCmb('cmbProveedor');
            $.each(jsonCmb2.proveedores, function(i,item){
               $('#cmbProveedor').append('<option value="'+item.pclave+'-'+item.pnombre+'">'+item.pnombre+'-'+item.pclave+'</option>');
            });
        }
    });
}

window.onload = function(){
    var ancho = obtieneMaxWidth();
    var alto = obtieneMaxHeight();
    ancho+='px';
    alto+='px';
    var vizDiv  = document.getElementById("divgrafica");
    var vizURL  = "https://us-west-2b.online.tableau.com/t/tiendas3b/views/20181018ComprasRegional/DPzsKgxGpo";
    var options = {
        width: ancho
        ,height: alto
        ,hideToolbar: true
        ,hideTabs: true
        ,onFirstInteractive: function (){
            woorkbook = viz.getWorkbook();
        }
    };
    viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
    cargaCatalogos();
}

/*Funciones de tableau*/
function switchView(sheetName){
    workbook.activateSheetAsync(sheetName);
}


function checkTodos(){
    var chktodos = document.getElementById('chkTodos');
    for(var i=0; i < arrCheck.length; i++){
        document.getElementById(arrCheck[i]).checked = chktodos.checked;
        actualizaFiltro();
    }
}

function checkInd(id){
    actualizaFiltro();
}

function checkTipoProd(id){
    actualizaFiltro();
}

function afGrupoLinea(){
    actualizaFiltro();
}

function afFechas(){    
    actualizaFiltro();
}

function actualizaFiltro(){
    var hoja = viz.getWorkbook().getActiveSheet();
    arrHojas = hoja.getWorksheets();
    filtroActual = {
                periodos:{
                    nombre:'Fecha'
                    ,valores:{
                        min:fechaIni.value
                        ,max:fechaFin.value
                    }
                }
                ,grupoLinea:{
                    nombre:'GrupoLinea'
                    ,valores:{
                        grupo:cmbGrupo.value.split("-")[1]
                        ,linea:cmbLinea.value
                    }
                }
                ,proveedor:{
                    nombre:'Proveedor'
                    ,valores:{
                        pnombre:cmbProveedor.value
                    }
                }
                ,tipoProductos:{
                    nombre:'Tipo Producto'
                    ,valores:[
                        {tipo: 'MP', valor: (chkMP.checked===true?'MP':'')}
                        ,{tipo: 'MC', valor: (chkMC.checked===true?'MC':'')}
                        ,{tipo: 'TP', valor: (chkTP.checked===true?'TP':'')}
                        ,{tipo: 'IO', valor: (chkIO.checked===true?'IO':'')}
                    ]
                }
                ,regiones:{
                    nombre:'Regiones'
                    ,valores:[
                        {region: 'R01 - CI2', valor: (chkCi2.checked===true?'R01 - CI2':'')}
                        ,{region: 'R02 - RYS', valor: (chkRys.checked===true?'R02 - RYS':'')}
                        ,{region: 'R03 - BAR', valor: (chkBar.checked===true?'R03 - BAR':'')}
                        ,{region: 'R04 - MET', valor: (chkMet.checked===true?'R04 - MET':'')}
                        ,{region: 'R05 - YAU', valor: (chkYau.checked===true?'R05 - YAU':'')}
                        ,{region: 'R06 - TEX', valor: (chkTex.checked===true?'R06 - TEX':'')}
                        ,{region: 'R07 - TLA', valor: (chkTla.checked===true?'R07 - TLA':'')}
                        ,{region: 'R08 - CEL', valor: (chkCel.checked===true?'R08 - CEL':'')}
                        ,{region: 'R09 - PUE', valor: (chkPue.checked===true?'R09 - PUE':'')}
                    ]
                }
            };
    for(var y = 0; y < arrHojas.length; y++){
        arrHojas[y].applyRangeFilterAsync(filtroActual.periodos.nombre, {min: new Date(filtroActual.periodos.valores.min), max: new Date(filtroActual.periodos.valores.max)},'REPLACE');
        arrHojas[y].applyFilterAsync(filtroActual.grupoLinea.nombre, filtroActual.grupoLinea.valores.grupo+" "+filtroActual.grupoLinea.valores.linea, 'REPLACE');
        for(var i = 0; i<filtroActual.tipoProductos.valores.length; i++){
            if(filtroActual.tipoProductos.valores[i].valor === ''){
                arrHojas[y].applyFilterAsync(filtroActual.tipoProductos.nombre, filtroActual.tipoProductos.valores[i].tipo, 'REPLACE');
            }else{
                arrHojas[y].applyFilterAsync(filtroActual.tipoProductos.nombre, filtroActual.tipoProductos.valores[i].tipo, 'ADD');
            }
        }
        for(var i = 0; i<filtroActual.regiones.valores.length; i++){
            if(filtroActual.regiones.valores[i].valor === ''){
                arrHojas[y].applyFilterAsync(filtroActual.regiones.nombre, filtroActual.regiones.valores[i].tipo, 'REPLACE');
            }else{
                arrHojas[y].applyFilterAsync(filtroActual.regiones.nombre, filtroActual.regiones.valores[i].tipo, 'ADD');
            }
        }
    }
}