<?php
$this->pageTitle=Yii::app()->name . ' - Login';
$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		    '登录',
		),
	));
?>

<div class="form">
    <?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm', array(
	    'id'=>'login-form',
		    'enableAjaxValidation'=>false,
    )); ?>

    <?php 
    Yii::app()->user->setFlash('info', '<p>带<span class="required">*</span>的项是必须的.</p>');

    $this->widget('bootstrap.widgets.BootAlert'); ?>
    <?php echo $form->errorSummary($model); ?>

    <?php echo $form->textFieldRow($model,'username'); ?>

    <?php echo $form->passwordFieldRow($model,'password'); ?>

    <?php echo $form->checkBoxRow($model,'rememberMe'); ?>
    <div class="form-actions">
	<?php $this->widget('bootstrap.widgets.BootButton', array( 
	    'buttonType'=>'submit',
	    'type'=>'success', 
	    'label'=>'登录',
	    'icon'=>'arrow-right',
	    'size'=>'large',
    )); ?>
    </div>

<?php $this->endWidget(); ?>
</div><!-- form -->
