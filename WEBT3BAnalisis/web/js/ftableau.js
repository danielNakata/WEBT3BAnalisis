/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var woorkbook, viz;
var arrCheck = ['chkCi2','chkRys','chkBar','chkMet','chkYau','chkTex','chkTla','chkCel','chkPue'];

var arrCmbs = ['cmbGrupo', 'cmbLinea'];



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
            cargaTipoProductos();
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
               $('#cmbLinea').append('<option value="'+item.lclave+'-'+item.ldesc+'">'+item.ldesc+'</option>');
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
    var hoja = viz.getWorkbook().getActiveSheet();
    arrHojas = hoja.getWorksheets();
    var chktodos = document.getElementById('chkTodos');
    for(var i=0; i < arrCheck.length; i++){
        document.getElementById(arrCheck[i]).checked = chktodos.checked;
        if(document.getElementById(arrCheck[i]).checked){
            for(var y = 0; y < arrHojas.length; y++){
                arrHojas[y].applyFilterAsync('Region', document.getElementById(arrCheck[i]).value, 'ADD');
            }
        }else{
            for(var y = 0; y < arrHojas.length; y++){
                arrHojas[y].applyFilterAsync('Region', document.getElementById(arrCheck[i]).value, 'REMOVE');
            }
        }
    }    
}

function checkInd(id){
    var chk = document.getElementById(id);
    var hoja = viz.getWorkbook().getActiveSheet();
    arrHojas = hoja.getWorksheets();
    if(chk.checked){
        for(var y = 0; y < arrHojas.length; y++){
            arrHojas[y].applyFilterAsync('Region', chk.value, 'ADD');
        }
    }else{
        for(var y = 0; y < arrHojas.length; y++){
            arrHojas[y].applyFilterAsync('Region', chk.value, 'REMOVE');
        }
    }
}

function afGrupoLinea(){
    var cmbGrupo = document.getElementById("cmbGrupo");
    var cmbLinea = document.getElementById("cmbLinea");
    var sGrupo = cmbGrupo.value.split("-")[1];
    var sLinea = cmbLinea.value.split("-")[1];
    var hoja = viz.getWorkbook().getActiveSheet();
    arrHojas = hoja.getWorksheets();
    for(var y = 0; y < arrHojas.length; y++){
        arrHojas[y].applyFilterAsync('GrupoLinea', sGrupo+" "+sLinea, 'REPLACE');
    }
}






