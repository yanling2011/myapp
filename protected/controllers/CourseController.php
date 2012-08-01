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
	    $modelSchool=School::model()->findbyUserId($id);
            
            if($modelSchool === NULL) $modelSchool = new School();
            $this->render('manage',array('model'=>$modelSchool));
	}
}