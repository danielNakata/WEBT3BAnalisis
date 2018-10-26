/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package t3b.analisis.utils;

import java.security.MessageDigest;

/**
 *
 * @author danie
 */
public class Encriptador {
    /**
     * Metodo que encripta la cadena recivida al algoritmo de MD5
     * @param textoPlano
     * @return 
     */
    public static String getMD5(String textoPlano){
        try{
           byte[] bytes = textoPlano.getBytes();
           byte[] dig = null;
           MessageDigest msgdgt = MessageDigest.getInstance("MD5");
           msgdgt.reset();
           msgdgt.update(bytes);
           
           dig = msgdgt.digest();
           
           String aux = "";
           for(byte bit: dig){
               int b = bit & 0xff;
               if(Integer.toHexString(b).length() == 1)
                   aux += "0";
               
               aux += Integer.toHexString(b);
           }
           return aux;
        }catch (Exception ex){
            System.out.println("WEBT3BLogistica Clase: t3b.logistica.utils.Encriptador.java Metodo: getMD5 Excepcion: " + ex.getMessage());
            return null;
        }
    }
}
