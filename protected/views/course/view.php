<script>
var baseUrl="<?php echo Yii::app()->baseUrl==null?Yii::app()->request->baseUrl:Yii::app()->baseUrl;?>";
var userId=<?php echo Yii::app()->user->isGuest?1:Yii::app()->user->id;?>;
var userName="<?php echo Yii::app()->user->isGuest?"匿名用户":trim(Yii::app()->user->name);?>";
var id=<?php echo $model->id;?>;
</script>

<body>
<?php
$this->pageCaption="课程信息";
$this->pageDescription="$model->coursename";

$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		$model->coursename    
    ),
));

?>

<t style="font-size:30px;font-weight:bold"><?php echo $model->coursename;?></t>
<div style="float:right">
<?php 
$this->widget('bootstrap.widgets.BootButton', array(
		'type'=>'success',
		'label'=>'修改',
		'url'=>Yii::app()->createUrl('/course/update',array('id'=>$model->id)),
		'htmlOptions'=>array('data-dismiss'=>'modal','style'=>'margin:10px'),
		'size'=>'large',
		'icon'=>'pencil',
));

    $this->widget('bootstrap.widgets.BootButton', array( 
            'type'=>'info', 
            'label'=> '主页',
	    'icon'=>'arrow-right', 
	    'size'=>'large',
	    'url'=>Yii::app()->createUrl('school/view',array('id'=>Yii::app()->user->id)),
        )); 
    ?>

</div>
<div>
    &nbsp;
</div>
<h4>课程名称</h4>
<p><pre><?php echo $model->coursename;?></pre></p>
<h4>学车地点</h4>
<p><pre><?php echo $model->studyarea;?></pre></p>
<h4>市场价格</h4>
<p><pre><?php echo $model->price1;?></pre></p>
<h4>网上价格</h4>
<p><pre><?php echo $model->price2;?></pre></p>
<h4>详细描述</h4>
<p><pre><?php echo $model->description;?></pre></p>

