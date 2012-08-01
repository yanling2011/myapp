<?php
$this->pageTitle=Yii::app()->name . ' - Register';
$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
	'links'=>array(
	'注册',
        ),
    ));
?>



<div class="form">
<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm', array(
	'id'=>'register-form',
		'enableAjaxValidation'=>false,
)); ?>

        <?php 
        Yii::app()->user->setFlash('info', '<p>带<span class="required">*</span>的项是必须的.</p>');

        $this->widget('bootstrap.widgets.BootAlert'); ?>
        <?php echo $form->errorSummary($model); ?>
        <?php echo $form->textFieldRow($model,'username'); ?>
        <?php echo $form->passwordFieldRow($model,'password'); ?>
        <?php echo $form->passwordFieldRow($model,'passwordRepeat'); ?> 
        <?php echo $form->textFieldRow($model,'email'); ?>
        <?php echo $form->radioButtonListRow($model,'accesslevel',array("普通用户","我是商家"), array(0,1)); ?>
        <?php if(CCaptcha::checkRequirements()): ?>
	<div class="row">
		<?php echo $form->labelEx($model,'verifyCode'); ?>
		<div>
		<?php $this->widget('CCaptcha'); ?>
		<?php echo $form->textField($model,'verifyCode'); ?>
		</div>
		<div class="hint">请输入验证码.
		<br/>不区分大小写.</div>
		<?php echo $form->error($model,'verifyCode'); ?>
	</div>
	<?php endif; ?>
    
        <div class="form-actions">
		 <?php $this->widget('bootstrap.widgets.BootButton', array( 
		 	'buttonType'=>'submit',
            'type'=>'success', 
            'label'=>'注册',
            'icon'=>'arrow-right',
            'size'=>'large',
        )); ?>
        </div>

<?php $this->endWidget(); ?>
</div><!-- form -->
