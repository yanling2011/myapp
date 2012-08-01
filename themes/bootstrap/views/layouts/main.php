<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Le styles -->
	<link href="<?php echo Yii::app()->theme->baseUrl; ?>/css/bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo Yii::app()->theme->baseUrl; ?>/css/application.min.css" rel="stylesheet">
	<link href="<?php echo Yii::app()->theme->baseUrl; ?>/css/bootstrap-responsive.css" rel="stylesheet">

	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
		<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Le fav and touch icons -->
	<link rel="shortcut icon" href="<?php echo Yii::app()->request->baseUrl; ?>/images/favicon.ico">
	<link rel="apple-touch-icon" href="<?php echo Yii::app()->request->baseUrl; ?>/images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo Yii::app()->request->baseUrl; ?>/images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo Yii::app()->request->baseUrl; ?>/images/apple-touch-icon-114x114.png">
</head>

<body>
	<div class="navbar">
		<div class="navbar-inner">
			<div class="container">
			
				<a class="brand" href="<?php echo $this->createAbsoluteUrl('//'); ?>"><?php echo CHtml::encode(Yii::app()->name); ?></a>
				<?php 
				$noticeNum=User::model()->findByPk(Yii::app()->user->id)->noticeNum;
				if ($noticeNum==0)
				{
					$style="";
					$label="无新消息";
				}
				else
				{
					$label='新消息('.$noticeNum.')';
					$style='color:red';
				}
				$this->widget('zii.widgets.CMenu',array(
					'items'=>array(
				array('label'=>'首页', 'url'=>array('/site/index')),
                array('label'=>'生成数据库', 'url'=>array('/site/createDb'),'visible'=>Yii::app()->user->getIsAdmin()),
				array('label'=>'用户管理', 'url'=>array('/user/admin'),'visible'=>Yii::app()->user->getIsAdmin()),
				array('label'=>'名单', 'url'=>array('/user/lookup')),
				array('label'=>'我的留言簿','url'=>array('/user/view/','id'=>Yii::app()->user->id),'visible'=>!Yii::app()->user->isGuest),
				array('label'=>'帐号管理','url'=>array('/user/update/','id'=>Yii::app()->user->id),'visible'=>!Yii::app()->user->isGuest),
				array('label'=>$label, 'url'=>array('/user/notice'),'linkOptions'=>array('style'=>$style)),
				array('label'=>'关于', 'url'=>array('/site/page', 'view'=>'about')),
				array('label'=>'登录', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'登出 ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest),
				),
					'htmlOptions'=>array(
						'class'=>'nav',
					),
				)); ?>
				<?php
				// $this->widget('zii.widgets.CMenu',array(
// 					'items'=>array(
// 						array('label'=>Yii::app()->user->name, 'url'=>array('site/profile'), 'visible'=>!Yii::app()->user->isGuest),
// 						array('label'=>'Logout', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest, 'htmlOptions'=>array('class'=>'btn'))
// 					),
// 					'htmlOptions'=>array(
// 						'class'=>'nav pull-right',
// 					),
// 				)); ?>
			</div>
		</div>
	</div>
	
	<div class="container">
	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('BBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
			'separator'=>' / ',
		)); ?><!-- breadcrumbs -->
	<?php endif?>
	</div>
	
	<?php echo $content; ?>
	
	
</body>
</html>