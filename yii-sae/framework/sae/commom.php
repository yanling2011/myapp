<?php
/*
* 获得sae平台的更目录 apps/appname/version
* 如我的是 apps/yiis/1 
*/
function get_sae_root()
{
    return dirname(dirname(dirname(dirname(__FILE__)))).'/'; 
}
/*
* 加密函数，原使用网上的dz加密函数，后发现部分assets是 加密后的目录url 再加上 文件名
* 所以改成隐藏系统目录的办法
*/
function saedisk_encrypt($txt, $key = '<yiis>')
{
    $dir = get_sae_root();
    $txt = str_replace($dir,'',$txt);
    return $txt;
	#srand((double)microtime() * 1000000);
	#$encrypt_key = md5(rand(0, 32000));
	$encrypt_key = md5($key);
	$ctr = 0;
	$tmp = '';
	for($i = 0;$i < strlen($txt); $i++) {
	$ctr = $ctr == strlen($encrypt_key) ? 0 : $ctr;
	$tmp .= $encrypt_key[$ctr].($txt[$i] ^ $encrypt_key[$ctr++]);
	}
	$str = base64_encode(passport_key($tmp, $key));
    return $str;
}
/*
* 解密函数
* 同上
*/
function saedisk_decrypt($txt, $key = '<yiis>')
{
    $dir = get_sae_root();
    $txt = $dir.$txt;
    return $txt;

	$txt = passport_key(base64_decode($txt), $key);
	$tmp = '';
	for($i = 0;$i < strlen($txt); $i++) {
	$md5 = $txt[$i];
	$tmp .= $txt[++$i] ^ $md5;
	}
	return $tmp;
}
/*
* 密钥函数
*/
function passport_key($txt, $encrypt_key)
{
	$encrypt_key = md5($encrypt_key);
	$ctr = 0;
	$tmp = '';
	for($i = 0; $i < strlen($txt); $i++) {
	$ctr = $ctr == strlen($encrypt_key) ? 0 : $ctr;
	$tmp .= $txt[$i] ^ $encrypt_key[$ctr++];
	}
	return $tmp;
}
/*
* 根据文件后缀名，获得mime信息，使用site/assets 发布到web时，头部信息
*/
function getMime($file)
{
	$_mimeTypes = array(
		//applications
		'ai'    => 'application/postscript',
		'eps'   => 'application/postscript',
		'exe'   => 'application/octet-stream',
		'doc'   => 'application/vnd.ms-word',
		'xls'   => 'application/vnd.ms-excel',
		'ppt'   => 'application/vnd.ms-powerpoint',
		'pps'   => 'application/vnd.ms-powerpoint',
		'pdf'   => 'application/pdf',
		'xml'   => 'application/xml',
		'odt'   => 'application/vnd.oasis.opendocument.text',
		'swf'   => 'application/x-shockwave-flash',
		// archives
		'gz'    => 'application/x-gzip',
		'tgz'   => 'application/x-gzip',
		'bz'    => 'application/x-bzip2',
		'bz2'   => 'application/x-bzip2',
		'tbz'   => 'application/x-bzip2',
		'zip'   => 'application/zip',
		'rar'   => 'application/x-rar',
		'tar'   => 'application/x-tar',
		'7z'    => 'application/x-7z-compressed',
		// texts
		'txt'   => 'text/plain',
		'php'   => 'text/x-php',
		'html'  => 'text/html',
		'htm'   => 'text/html',
		'js'    => 'text/javascript',
		'css'   => 'text/css',
		'rtf'   => 'text/rtf',
		'rtfd'  => 'text/rtfd',
		'py'    => 'text/x-python',
		'java'  => 'text/x-java-source',
		'rb'    => 'text/x-ruby',
		'sh'    => 'text/x-shellscript',
		'pl'    => 'text/x-perl',
		'sql'   => 'text/x-sql',
		// images
		'bmp'   => 'image/x-ms-bmp',
		'jpg'   => 'image/jpeg',
		'jpeg'  => 'image/jpeg',
		'gif'   => 'image/gif',
		'png'   => 'image/png',
		'tif'   => 'image/tiff',
		'tiff'  => 'image/tiff',
		'tga'   => 'image/x-targa',
		'psd'   => 'image/vnd.adobe.photoshop',
		//audio
		'mp3'   => 'audio/mpeg',
		'mid'   => 'audio/midi',
		'ogg'   => 'audio/ogg',
		'mp4a'  => 'audio/mp4',
		'wav'   => 'audio/wav',
		'wma'   => 'audio/x-ms-wma',
		// video
		'avi'   => 'video/x-msvideo',
		'dv'    => 'video/x-dv',
		'mp4'   => 'video/mp4',
		'mpeg'  => 'video/mpeg',
		'mpg'   => 'video/mpeg',
		'mov'   => 'video/quicktime',
		'wm'    => 'video/x-ms-wmv',
		'flv'   => 'video/x-flv',
		'mkv'   => 'video/x-matroska'
		);

	//获得后缀名
	$hx = '';
	$extend =explode(".", $file);
	if(!empty($extend))
	{
		$va=count($extend)-1;
		$hx= $extend[$va];
	}
	$type = $hx;
	//根据后缀名获得 mimetype
	if(!empty($_mimeTypes[$hx]))
	{
		$type = $_mimeTypes[$hx];
	}
	return $type;
}
