<script>
var baseUrl="<?php echo Yii::app()->baseUrl==null?Yii::app()->request->baseUrl:Yii::app()->baseUrl;?>";
var userId=<?php echo Yii::app()->user->isGuest?1:Yii::app()->user->id;?>;
var userName="<?php echo Yii::app()->user->isGuest?"匿名用户":trim(Yii::app()->user->name);?>";
var action="public";
</script>
<?php  
  $baseUrl = Yii::app()->theme->baseUrl; 
  $cs = Yii::app()->getClientScript();

?>

<?php $this->pageTitle=Yii::app()->name;
$this->pageCaption="";
$this->pageDescription="首页";
?>


<?php 

// if (Yii::app()->user->isGuest)
{
// 	$this->widget('ext.eguiders.EGuider', array(
// 			'id'            => 'intro',
// 			'next'          => 'position',
// 			'title'         => '你知道吗？',
// 			'description'   => $this->renderPartial('pages/notice',null,true),
// 			'overlay'       => true,
// 			'xButton'       => true,
// 			'show'          => true
// 	)
// 	);
}


//$news=Message::model()->latest(10)->findAll();
?>

<?php
$dataProvider=School::model()->search();
$dataProvider->pagination=array('pageSize'=>20);
$this->widget('bootstrap.widgets.BootGridView', array(
	'type'=>'striped bordered condensed',
	'dataProvider'=>$dataProvider,
	'template'=>"{items}",
	'columns'=>array(
	    array(
		'class'=>'bootstrap.widgets.BootButtonColumn',
		'htmlOptions'=>array('style'=>'width: 50px'),
		'template'=>'{view}  {update} {delete}',
		'buttons'=>array
		(
		    'view' => array
		    (
			'url'=>'Yii::app()->createUrl("course/view",array("id"=>$data->id))',
		    ),
		    'update' => array
		    (
			'url'=>'Yii::app()->createUrl("course/update",array("id"=>$data->id))',
		    ),
		    'delete' => array
		    (
			'url'=>'Yii::app()->createUrl("course/delete",array("id"=>$data->id))',
		    ),
		),
	    ),
	)
    )
)
?>

<?php
    
$this->beginWidget('bootstrap.widgets.BootHero', array(
    'heading'=>'Hello, world!',
)); ?>
 
    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <p><?php $this->widget('bootstrap.widgets.BootButton', array(
        'type'=>'primary',
        'size'=>'large',
        'label'=>'Learn more',
    )); ?></p>
 
<?php $this->endWidget(); ?>