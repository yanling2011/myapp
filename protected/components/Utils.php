<?php
class Utils
{
	static function send_mail($to, $subject, $message)
	{
		$mail = new SaeMail();
		//$mail->setAttach( array("my_photo.jpg" => "照片的二进制数据" ));

		$mail->setOpt(array('content_type'=>"HTML",
				'subject'=>$subject,
				'content'=>$message,
				'smtp_host'=>'smtp.sina.com',
				'smtp_username'=>'notabigpig',
				'smtp_password'=>"12345678",
				'from'=>'notabigpig@sina.com',
				'to'=>$to,
				'charset'=>'gb2312',
				
				));
		$mail->send();
	}
	
	static function transTime($showTime,$date)
	{
		$currentTime=strtotime($showTime);
		
		$oldTime=strtotime($date);
		
		$past=$currentTime-$oldTime;
		
		if ($past>31536000)
		{
			$m=(int)($past/31536000);
			return $m."年前";
		}
		else if ($past>2592000)
		{
			$m=(int)($past/2592000);
			return $m."个月前";
		}
		else if ($past>604800)
		{
			$w=(int)($past/604800);
			return $w."周前";
		}
		else if ($past>86400)
		{
			$d=(int)($past/86400);
			return $d."天前";
		}
		else if ($past>3600)
		{
			$h=(int)($past/3600);
			return $h."小时前";
		}
		else if ($past>60)
		{
			$m=(int)($past/60);
			return $m."分钟前";
		}
		else
			return "1分钟内";
		
	}
}