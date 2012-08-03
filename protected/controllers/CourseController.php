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
	
	//param: schoolId
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
	public function actionView($id){
	    $model = Course::model()->findbyPK($id);
	    if($model != NULL)
	    {
		$school = School::model()->findByPK($model->schoolid);
		if ($school->userid!=Yii::app()->user->id && !Yii::app()->user->getIsOwner())
		    throw new CHttpException(404,'The requested page does not exist.');
		$this->render('view',array(
		    'model'=>$model,
		));
	    }
	    else{
		throw new CHttpException(404,'The requested page does not exist.');
	    }
	}
	public function actionUpdate($id){
	    $model= Course::model()->findbyPK($id);
	    $school = School::model()->findbyPK($model->schoolid);
	    if($school == NULL || ($school->userid != Yii::app()->user->id && !Yii::app()->user->getIsOwner()))
		throw new CHttpException(404,'The requested page does not exist.');
	    if(isset($_POST['Course']))
	    {
		$model->attributes=$_POST['Course'];
		$model->save(true,array('schoolid','coursename','studyarea','price1','price2', 'description'));
		$this->redirect (array (
		    'view',
		    'id' => $model->id
		    ));
	    }    
            $this->render('update',array('model'=>$model));
	}
	public function actionDelete($id){
	    $model= Course::model()->findbyPK($id);
	    $model->delete();
	}
}