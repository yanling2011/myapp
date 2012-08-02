
<?php

//url manage server setting
//http://www.cppblog.com/huangjianfu/archive/2011/07/26/151865.html
// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.



$config = array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
		
	'name'=>'My Test WebSite',
	//��վ���� ���������ã���Ӧ protected/messages/zh_cn
	'language'=>'zh_cn',
	//ʱ������
	'timeZone' => 'Asia/Shanghai',

	// preloading 'log' component
	'preload'=>array('log','layoutHandler','bootstrap'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'ext.bootstrap-theme.widgets.*',
		'ext.bootstrap-theme.helpers.*',
		'ext.bootstrap-theme.behaviors.*',
		'application.extensions.tinymce.ETinyMce',
		'application.helpers.*',
	),
		

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		'gii'=>array(
				'generatorPaths'=>array(
						'bootstrap.gii', // since 0.9.1
				),
			'class'=>'system.gii.GiiModule',
			'password'=>'123456',
		 	// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('*','::1'),
		),
	),
		


	// application components
	'components'=>array(
	'bootstrap'=>array(
			'class'=>'ext.bootstrap.components.Bootstrap', // assuming you extracted bootstrap under extensions
	),
	'layoutHandler'=>array(
			'class'=>'application.components.LayoutHandler',
	),
	'image'=>array(
			'class'=>'application.extensions.image.CImageComponent',
			// GD or ImageMagick
			'driver'=>'GD',
			// ImageMagick setup path
// 			'params'=>array('directory'=>'/opt/local/bin'),
	),
		'user'=>array(
			// enable cookie-based authentication
			'class'=>'WebUser',
			'allowAutoLogin'=>true,
		),
		
		'urlManager'=>array(
            // 静态化
            //'urlSuffix'=>'.html',
            //路径模式的URL,方便SEO,搜索引擎搜索
             'urlFormat'=>'path',
            //不显示脚本名 index.php
            'showScriptName'=>false,
            //主域名 直接访问controllers
            #'baseUrl'=>'http://'.SUB_DOMAIN_main,
            'rules'=>array(
                'post/<id:\d+>/<title:.*?>'=>'post/view',
                'posts/<tag:.*?>'=>'post/index',
                //assets目录发布到web，使用path路径，浏览器会认为是静态文件*达到http304的目的
                'assets/<path:.*?>'=>'site/assets',
                '<controller:\w+>/<action:\w+>'=>'<controller>/<action>', 
            ),
        ),
        
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/test.db',
		),
		// uncomment the following to use a MySQL database
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=test',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => 'root',
			'charset' => 'utf8',
		),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
            'errorAction'=>'site/error',
        ),
	'log'=>array(
		'class'=>'CLogRouter',
		'routes'=>array(
			array(
				'class'=>'CFileLogRoute',
				'levels'=>'error, warning',
			),
			// uncomment the following to show log messages on web pages
			/*
			array(
				'class'=>'CWebLogRoute',
			),
			*/
		),
	    ),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);

//������˳�������Ĭ��Ϊ��SAE������
if(defined('SAE_TMP_PATH'))
{
    //SAE ��֧��I/O
    $config['runtimePath'] = SAE_TMP_PATH;
    //����Ϊ SAEDbConnection �򲻱ؿ����û������� ���Զ���д����
    $config['components']['db'] = array(
            'class'=>'SAEDbConnection',
            'charset' => 'utf8',
            'emulatePrepare' => true,
            //����sql ��¼
            'enableProfiling'=>true,
            'enableParamLogging'=>true,
            //cache
            'schemaCachingDuration'=>0,
    );
     $config['components']['assetManager'] = array('class' => 'SAEAssetManager','assetsAction'=>'site/assets');
	
      $config['components']['cache'] = array(
            'class'=> 'SAEMemCache',
            'servers'=>array(
                array('host'=>'localhost', 'port'=>11211, 'weight'=>100),
            ),
        );
}
return $config;
?>