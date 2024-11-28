<?php
/**
 * Simple File server for php
 * this is in response to this: 
 * http://stackoverflow.com/questions/8792871/using-custom-url-rewrite-in-drupal-for-static-files
 * ---
 * in the process of using it I found a lot of places to refactor/clean it up, and correct some things
 */

define('CHUNK_SIZE',1048576);

function simple_file_server($filename='') { 
  if(!$filename || !($fd = fopen($filename, 'rb')){
    header('Status: 404');
    return;
  }
  ob_clean();
  header('Content-Type:' . filetype($filename)); 
  while(!feof($fd)) { 
      echo fread($fd,CHUNK_SIZE); 
      ob_flush(); 
  }
  fclose($fd);
}