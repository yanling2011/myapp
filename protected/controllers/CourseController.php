<?php

class CourseController extends Controller
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

	public function actionCreate($id){
	    $school = School::model()->findbyPK($id);
	    if($school == NULL || ($school->userid != Yii::app()->user->id && !Yii::app()->user->getIsOwner()))
		throw new CHttpException(404,'The requested page does not exist.');
	    $model= $model = new Course();
	    if(isset($_POST['Course']))
	    {
		$model->attributes=$_POST['Course'];
		$model->schoolid = $id;
		$model->save(true,array('schoolid','coursename','studyarea','price1','price2', 'description'));
		$this->redirect (array (
		    'view',
		    'id' => $model->id
		    ));
	    }    
            $this->render('create',array('model'=>$model));
	}
}