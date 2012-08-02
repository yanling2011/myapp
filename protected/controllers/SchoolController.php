<?php

class SchoolController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
			'assets'=>array(
				'class'=>'SAEAssetsAction',
			),
		);
	}

	
	
	public function actionManage($id){
	    if ($id!=Yii::app()->user->id && !Yii::app()->user->getIsOwner())
		throw new CHttpException(404,'The requested page does not exist.');
	    $model=School::model()->findbyUserId($id);
	    if($model === NULL) $model = new School();
	    if(isset($_POST['School']))
	    {
		$model->attributes=$_POST['School'];
		$model->userid = $id;
		$file=CUploadedFile::getInstance($model,'avatar');
		$hasFile=true;
		if(is_object($file) && get_class($file) === 'CUploadedFile' )
		{
			$filename=$file->getName();          //获取文件名
			$ext=explode(".",$filename);
			$ext=$ext[count($ext)-1];
			$filename=md5($filename.$model->userid).".$ext";
			$model->avatar=$filename;                	 //数据库中要存放文件名
		}
		else
			$hasFile=false;
		if ($hasFile)
		{
			$res=$model->save(true,array('userid','schoolname','phone','coverscope', 'description', 'avatar'));
		}
		else
		{
			$res=$model->save(true,array('userid','schoolname','phone','coverscope', 'description'));
		}
		if($res)
		{
		    if( is_object($file) && get_class($file) === 'CUploadedFile' )
		    {
			    $filesize=$file->getSize();                 //获取文件大小
			    $filetype=$file->getType();                //获取文件类型
			    Yii::import('application.extensions.image.KImage');
			    $image = new KImage($file->getTempName());
//			    $image =Yii::app()->image->load($file->getTempName());
			    $image->resize(512, 512,KImage::WIDTH)->crop(512,512);
			    ob_start();
			    $image->render();
			    $data=ob_get_contents();
			    ob_end_clean();
			    if (defined('SAE_TMP_PATH'))
			    {
				    $s = new SaeStorage();
				    $s->write('avatar',$filename,$data);
			    }
			    else
			    {
				    $uploadfile="./assets/avatar/".$filename;
				    $f=fopen($uploadfile,"wb");
				    fwrite($f,$data);
			    }
		    }
		    $this->redirect (array (
			'view',
			'id' => $model->userid
			));
		}
	    }
           
            $this->render('manage',array('model'=>$model));
	}
	
	public function actionView($id)
	{	
		$model = School::model()->findbyUserId($id);
		if($model != NULL)
		{
		    if ($model->userid!=Yii::app()->user->id && !Yii::app()->user->getIsOwner())
			throw new CHttpException(404,'The requested page does not exist.');
		    $courses=new Course('search');
		    $courses->unsetAttributes();  // clear any default values
		    $this->render('view',array(
			'model'=>$model,
			'courses'=>$courses
		    ));
		}
		else{
		     $this->redirect (array (
			'manage',
			'id' => Yii::app()->user->id
		    ));
		}
	}
	
	
}