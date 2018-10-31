/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package t3b.analisis.db;

/**
 *
 * @author danie
 */
public interface IQry {
    
    
    public static String TAL_CONSULTAGRUPOS             = "{ call TAL_CONSULTAGRUPOS() }";
    public static String TAL_CONSULTALINEASXGRUPO       = "{ call TAL_CONSULTALINEASXGRUPO(?) }";
    public static String TAL_CONSULTAPRODUCTOS          = " { call TAL_CONSULTAPRODUCTOS(?,?) } ";
    public static String TAL_CONSULTAPROVEEDORES        = " { call TAL_CONSULTAPROVEEDORES() } ";
    public static String TAL_CONSULTAESTADOARTICULOS    = " { call TAL_CONSULTAESTADOARTICULOS() } ";
    public static String TAL_CONSULTATIPOARTICULOS      = " { call TAL_CONSULTATIPOARTICULOS() } ";
    
    public static String TAL_CONSULTADATOSUSUARIO       = " { call TAL_CONSULTADATOSUSUARIO(?) } ";
    public static String TAL_INICIOSESION               = " { call TAL_INICIOSESION(?,?,?,?) } ";
    
}
