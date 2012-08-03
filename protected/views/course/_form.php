<style>
.span-19{
	width:910px;margin-right:20px;
}
</style>

<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array( 
    'id'=>'course-form', 
    'enableAjaxValidation'=>false, 
    'htmlOptions'=>array('enctype'=>'multipart/form-data'),
)); ?>

    <?php 
    Yii::app()->user->setFlash('info', '<p>带<span class="required">*</span>的项是必须的.</p>');
    $this->widget('bootstrap.widgets.BootAlert'); ?>

    <?php echo $form->errorSummary($model); ?>

    <?php echo $form->textFieldRow($model,'coursename',array('class'=>'span5','maxlength'=>255)); ?>
    <?php echo $form->textFieldRow($model,'studyarea',array('class'=>'span5','maxlength'=>255)); ?>
    <?php echo $form->textFieldRow($model,'price1',array('class'=>'span5')); ?>
    <?php echo $form->textFieldRow($model,'price2',array('class'=>'span5')); ?>
    <?php echo $form->textAreaRow($model,'description',array('rows'=>20, 'cols'=>50, 'class'=>'span8')); ?>

    
    <div class="form-actions"> 
        <?php $this->widget('bootstrap.widgets.BootButton', array( 
            'type'=>'success', 
            'label'=> '保存',
	    'icon'=>'ok', 
	    'size'=>'large',
	    'htmlOptions'=>array('onclick'=>'submit()'),
        )); ?>
        <?php $this->widget('bootstrap.widgets.BootButton', array( 
            'type'=>'info', 
            'label'=> '取消',
	    'icon'=>'arrow-right', 
	    'size'=>'large',
	    'url'=>Yii::app()->createUrl('school/view',array('id'=>Yii::app()->user->id)),
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