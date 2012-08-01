<style>
.span-19{
	width:910px;margin-right:20px;
}
</style>

<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array( 
    'id'=>'manage-form', 
    'enableAjaxValidation'=>false, 
    'htmlOptions'=>array('enctype'=>'multipart/form-data'),
)); ?>

				
    <?php 
    Yii::app()->user->setFlash('info', '<p>带<span class="required">*</span>的项是必须的.</p>');
    $this->widget('bootstrap.widgets.BootAlert'); ?>

    <?php echo $form->errorSummary($model); ?>
    <img src="<?php echo $model->getAvatar();?>"></img>
    <?php echo $form->FileFieldRow($model,'avatar',array('hint'=>'<strong>你可以上传一个驾校图像</strong>')); ?>

    <?php echo $form->textFieldRow($model,'schoolname',array('class'=>'span5','maxlength'=>255)); ?>
    
    <?php echo $form->textFieldRow($model,'phone',array('class'=>'span5','maxlength'=>255)); ?>

    <?php echo $form->textFieldRow($model,'coverscope',array('class'=>'span5','maxlength'=>255, 'hint'=>'<strong>以逗号隔开</strong>')); ?>
        
   <?php echo $form->textAreaRow($model,'description',array('rows'=>20, 'cols'=>50, 'class'=>'span8')); ?>

    
    <div class="form-actions"> 
        <?php $this->widget('bootstrap.widgets.BootButton', array( 
            'type'=>'success', 
            'label'=> '保存',
        	'icon'=>'ok', 
        	'size'=>'large',
        	'htmlOptions'=>array('onclick'=>'submit()'),
        )); ?>
        
    </div> 

<?php $this->endWidget(); ?>

<script>

function submit()
{
	form = document.forms[0];
	form.submit();
}
</script>