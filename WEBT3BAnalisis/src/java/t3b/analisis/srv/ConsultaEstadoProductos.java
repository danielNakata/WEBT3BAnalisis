/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package t3b.analisis.srv;

import dnn.nominae.modulobdconexion.db.Consulta;
import dnn.nominae.modulobdconexion.db.utils.Conexion;
import dnn.nominae.modulobdconexion.dto.CampoDTO;
import dnn.nominae.modulobdconexion.dto.ColumnaDTO;
import dnn.nominae.modulobdconexion.dto.QryRespDTO;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import t3b.analisis.db.IQry;
import t3b.analisis.utils.Config;

/**
 *
 * @author danie
 */
public class ConsultaEstadoProductos extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = response.getWriter();
        String salidaJSON = "";
        String grupoJSON = "";
        Connection conn = null;
        try{
            if(!Config.isLoaded){
                Config.cargaConfig();
            }
            salidaJSON = "{\"res\":\"0\", \"msg\":\"NO SE PUDO CONECTAR A LA BD\"}";
            Conexion conex = new Conexion();
            conex.creaConexion(Config.dbHost, Config.dbUser, Config.dbPass, Config.dbPort, Config.dbName, Config.dbDriver, Config.dbUrl);
            conn = conex.getConexion();
            salidaJSON = "{\"res\":\"0\", \"msg\":\"NO SE PUDO REALIZAR LA CONSULTA\"}";
            if(conn != null){
                QryRespDTO resp = new Consulta().ejecutaSelectSP(conn, IQry.TAL_CONSULTAESTADOARTICULOS, null);
                salidaJSON = "{\"res\":\"0\", \"msg\":\"NO SE PUDO OBTENER DATOS DE LA CONSULTA\"}";
                if(resp.getRes() == 1){
                    ArrayList<ColumnaDTO> cols = resp.getColumnas();
                    salidaJSON = "{\"res\":\"0\", \"msg\":\"NO SE PUDO OBTENER LAS COLUMNAS DE LA CONSULTA\"}";
                    if(cols != null){
                        String filaaux = "";
                        for(HashMap<String, CampoDTO> fila: resp.getDatosTabla()){
                            filaaux = "";
                            for(ColumnaDTO col: cols){
                                switch(col.getIdTipo()){
                                    case java.sql.Types.INTEGER:
                                        filaaux += ",\""+col.getEtiqueta()+"\":"+Integer.parseInt(fila.get(col.getEtiqueta()).getValor().toString())+"";
                                        break;

                                    case java.sql.Types.DOUBLE:
                                        filaaux += ",\""+col.getEtiqueta()+"\":"+Double.parseDouble(fila.get(col.getEtiqueta()).getValor().toString())+"";
                                        break;

                                    case java.sql.Types.FLOAT:
                                        filaaux += ",\""+col.getEtiqueta()+"\":"+Float.parseFloat(fila.get(col.getEtiqueta()).getValor().toString())+"";
                                        break;

                                    case java.sql.Types.DECIMAL:
                                        filaaux += ",\""+col.getEtiqueta()+"\":"+Double.parseDouble(fila.get(col.getEtiqueta()).getValor().toString())+"";
                                        break;

                                    case java.sql.Types.NUMERIC:
                                        filaaux += ",\""+col.getEtiqueta()+"\":"+Double.parseDouble(fila.get(col.getEtiqueta()).getValor().toString())+"";
                                        break;

                                    case java.sql.Types.VARCHAR:
                                        filaaux += ",\""+col.getEtiqueta()+"\":\""+(fila.get(col.getEtiqueta()).getValor().toString())+"\"";
                                        break;

                                    default:
                                        filaaux += ",\""+col.getEtiqueta()+"\":\""+(fila.get(col.getEtiqueta()).getValor().toString())+"\"";
                                        break;
                                }   
                            }
                            filaaux = ",{"+filaaux.substring(1)+"}";
                            grupoJSON += filaaux;
                        }
                        grupoJSON = ",\"estados\": ["+grupoJSON.substring(1)+"]";
                        salidaJSON = "{\"res\":\"1\", \"msg\":\"CATALOGO DE ESTADO DE PRODUCTOS OBTENIDOS\""+grupoJSON+"}";
                    }
                }
            }
        }catch(Exception ex){
            salidaJSON = "{\"res\":\"0\", \"msg\":\"EXCEPCION GENERAL: "+ex.toString().replaceAll(",", "").replaceAll("\"", "").trim() + "\"}";
        }finally{
            out.write(salidaJSON);
             try{
                conn.close();
            }catch(Exception ex){
                
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
