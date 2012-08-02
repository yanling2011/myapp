<script>
var baseUrl="<?php echo Yii::app()->baseUrl==null?Yii::app()->request->baseUrl:Yii::app()->baseUrl;?>";
var userId=<?php echo Yii::app()->user->isGuest?1:Yii::app()->user->id;?>;
var userName="<?php echo Yii::app()->user->isGuest?"匿名用户":trim(Yii::app()->user->name);?>";
var avatar="<?php echo Yii::app()->user->isGuest?"http://img.t.sinajs.cn/t4/style/images/face/male_big.png":($model->getAvatar());?>";
var id=<?php echo $model->id;?>;
</script>

<body>
<?php
$this->pageCaption="驾校信息";
$this->pageDescription="$model->schoolname";

$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		$model->schoolname    
    ),
));

?>

<img src="<?php echo $model->getAvatar();?>"></img>
<t style="font-size:30px;font-weight:bold;margin:30px"><?php echo $model->schoolname;?></t>
<div style="float:right">
<?php 
$this->widget('bootstrap.widgets.BootButton', array(
		'type'=>'success',
		'label'=>'修改',
		'url'=>Yii::app()->createUrl('/course/modify',array('id'=>$model->userid)),
		'htmlOptions'=>array('data-dismiss'=>'modal','style'=>'margin:10px'),
		'size'=>'large',
		'icon'=>'pencil',
));
?>
</div>
<div>
    &nbsp;
</div>
<h4>用户名</h4>
<p><pre><?php echo Yii::app()->user->name;?></pre></p>
<h4>驾校名称</h4>
<p><pre><?php echo $model->schoolname;?></pre></p>
<h4>联系方式</h4>
<p><pre><?php echo $model->phone;?></pre></p>
<h4>覆盖区域</h4>
<p><pre><?php echo $model->coverscope;?></pre></p>
<h4>课程</h4>
<?php
$dataProvider=$courses->bySchoolId($model->id)->search();
$dataProvider->pagination=array('pageSize'=>20);
if ($dataProvider!=null){
    $this->widget('bootstrap.widgets.BootGridView', array(
    'type'=>'striped bordered condensed',
    'dataProvider'=>$dataProvider,
    'template'=>"{items}",
    'columns'=>array(
        array('name'=>'coursename', 'header'=>'coursename'),
        array('name'=>'studyarea', 'header'=>'studyarea'),
        array('name'=>'price1', 'header'=>'price1'),
        array('name'=>'price2', 'header'=>'price2'),
        array(
            'class'=>'bootstrap.widgets.BootButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
        ),
    ),
)); 
}
else{
    echo "<p><pre>no courses</pre><p>";
}
?>
<h4>驾校描述</h4>
<p><pre><?php echo $model->description;?></pre></p>

