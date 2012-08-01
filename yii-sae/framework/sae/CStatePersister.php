<?php
/**
 * This file contains classes implementing security manager feature.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright Copyright &copy; 2008-2011 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

/**
 * 原有函数是在直接修改 /protected/runtime/state.bin 文件
 * 新浪SAE不支持 I/O 修改为读取memcache
 * @author biner <huanghuibin@gmail.com>
 */
class CStatePersister extends CApplicationComponent implements IStatePersister
{
	/**
	 * @var string the file path storing the state data. Make sure the directory containing
	 * the file exists and is writable by the Web server process. If using relative path, also
	 * make sure the path is correct.
	 */
	public $stateFile;
	/**
	 * @var string the ID of the cache application component that is used to cache the state values.
	 * Defaults to 'cache' which refers to the primary cache application component.
	 * Set this property to false if you want to disable caching state values.
	 * @since 1.0.10
	 */
	public $cacheID='cache';

	/**
	 * Initializes the component.
	 * This method overrides the parent implementation by making sure {@link stateFile}
	 * contains valid value.
	 */
	public function init()
	{
		parent::init();
		if($this->stateFile===null)
			$this->stateFile=Yii::app()->getRuntimePath().DIRECTORY_SEPARATOR.'state.bin';
		$dir=dirname($this->stateFile);
		if(!is_dir($dir) || !is_writable($dir))
			throw new CException(Yii::t('yii','Unable to create application state file "{file}". Make sure the directory containing the file exists and is writable by the Web server process.',
				array('{file}'=>$this->stateFile)));
        if(defined('SAE_TMP_PATH'))
        {
            #新浪SAE的temp目录是随机的，所以要固定这个文件名
            $this->stateFile='runtimes'.DIRECTORY_SEPARATOR.'state.bin';
        }
	}

	/**
	 * Loads state data from persistent storage.
	 * @return mixed state data. Null if no state data available.
	 */
	public function load()
	{
		$stateFile=$this->stateFile;
		if($this->cacheID!==false && ($cache=Yii::app()->getComponent($this->cacheID))!==null)
		{
			$cacheKey='Yii.CStatePersister.'.$stateFile;
			if(($value=$cache->get($cacheKey))!==false)
				return unserialize($value);
			else if(($content=@file_get_contents($stateFile))!==false)
			{
				$cache->set($cacheKey,$content);
				#$cache->set($cacheKey,$content,0,new CFileCacheDependency($stateFile));
				return unserialize($content);
			}
			else
				return null;
		}
		else if(($content=@file_get_contents($stateFile))!==false)
			return unserialize($content);
		else
			return null;
	}

	/**
	 * Saves application state in persistent storage.
	 * @param mixed $state state data (must be serializable).
	 */
	public function save($state)
	{
		if($this->cacheID!==false && ($cache=Yii::app()->getComponent($this->cacheID))!==null)
		{
			$stateFile=$this->stateFile;
			$cacheKey='Yii.CStatePersister.'.$stateFile;
			$content = serialize($state);
			$cache=Yii::app()->getComponent($this->cacheID);
			$cache->set($cacheKey,$content);
			return true;
		}
		file_put_contents($this->stateFile,serialize($state),LOCK_EX);
	}
}
