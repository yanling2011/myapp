<?php
/**
 * CAssetManager class file.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright Copyright &copy; 2008-2011 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */


/**
 * CAssetManager is a Web application component that manages private files (called assets) and makes them accessible by Web clients.
 *
 * It achieves this goal by copying assets to a Web-accessible directory
 * and returns the corresponding URL for accessing them.
 *
 * To publish an asset, simply call {@link publish()}.
 *
 * The Web-accessible directory holding the published files is specified
 * by {@link setBasePath basePath}, which defaults to the "assets" directory
 * under the directory containing the application entry script file.
 * The property {@link setBaseUrl baseUrl} refers to the URL for accessing
 * the {@link setBasePath basePath}.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CAssetManager.php 3289 2011-06-18 21:20:13Z qiang.xue $
 * @package system.web
 * @since 1.0
 */

/**
 *   
  配合SAEAssetsAction,使用site/assets?path=aaa.txt 来访问 aaa.txt 的原文件
        $config['components']['assetManager'] = array('class' => 'SAEAssetManager','assetsAction'=>'site/assets');
        并且在siteControllder.php加入一个action
       public function actions()
       {
           return array(
               'assets'=>array(
                    'class'=>'SAEAssetsAction',
               ),
           );
       }
  并且在 urlManager 加入一条 rules ，使用path路径，浏览器会认为是静态文件*达到http304的目的.
        'assets/<path:.*?>'=>'site/assets',

 * @author biner <huanghuibin@gmail.com>
 */

class SAEAssetManager extends CAssetManager
{
    // 默认assets解析到哪个action
    public $assetsAction;
	private $_published=array();

	public function publish($path,$hashByName=false,$level=-1,$forceCopy=false)
	{
		if(isset($this->_published[$path]))
			return $this->_published[$path];
		else if(($src=realpath($path))!==false)
		{
            if(!empty($this->assetsAction))
            {
                #修改为action读取文件资料
                require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'commom.php';
                $path_test = Yii::app()->createUrl($this->assetsAction,array('path'=>saedisk_encrypt($path)));
                //createUrl 后自动转义,再转换回/
                $path_test = str_replace('%2F','/',$path_test);
                return $this->_published[$path]= $path_test;
            }
		}
		throw new CException(Yii::t('yii','The asset "{asset}" to be published does not exist.',
			array('{asset}'=>$path)));
	}
}
