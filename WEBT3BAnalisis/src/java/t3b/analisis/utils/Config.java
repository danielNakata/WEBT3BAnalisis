/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package t3b.analisis.utils;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

/**
 *
 * @author danie
 */
public class Config {
    public static String dbHost = "192.200.1.26";
    public static String dbPort = "2638";
    public static String dbUser = "dba";
    public static String dbPass = "5575349";
    public static String dbName = "master64";
    public static String dbJdni = "";
    public static String dbUrl = "jdbc:sybase:Tds:";
    public static String dbDriver = "com.sybase.jdbc4.jdbc.SybDriver";
    public static boolean isLoaded = false;
    public static String rutaArch = System.getProperty("user.dir")+File.separator+"config"+File.separator+"t3banalisis.properties";
    
    
    public static void cargaConfig(){
        try{
            Properties props = new Properties();
            props.load(new FileInputStream(rutaArch));
            System.out.println(rutaArch);
            dbHost  = props.getProperty("dbhost")       != null?props.getProperty("dbhost"):dbHost;
            dbPort   = props.getProperty("dbport")      != null?props.getProperty("dbport"):dbHost;
            dbUser   = props.getProperty("dbuser")      != null?props.getProperty("dbuser"):dbHost;
            dbPass   = props.getProperty("dbpass")      != null?props.getProperty("dbpass"):dbHost;
            dbName  = props.getProperty("dbname")       != null?props.getProperty("dbname"):dbHost;
            dbUrl     = props.getProperty("dburl")      != null?props.getProperty("dburl"):dbHost;            
            dbDriver  = props.getProperty("dbdriver")   != null?props.getProperty("dbdriver"):dbHost;
            isLoaded = true;
        }catch(Exception ex){
            
        }
    }
}
