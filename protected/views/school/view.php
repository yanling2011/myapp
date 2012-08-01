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

// $this->menu=array(
// 	array('label'=>'List User', 'url'=>array('index')),
// 	array('label'=>'Create User', 'url'=>array('create')),
// 	array('label'=>'Update User', 'url'=>array('update', 'id'=>$model->id)),
// 	array('label'=>'Delete User', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
// 	array('label'=>'Manage User', 'url'=>array('admin')),
// );

?>

<img src="<?php echo $model->getAvatar();?>"></img>
<t style="font-size:30px;font-weight:bold;margin:30px"><?php echo $model->schoolname;?>的详细信息</t>
<div style="float:right">
<?php 
$this->widget('bootstrap.widgets.BootButton', array(
		'type'=>'success',
		'label'=>'修改',
		'url'=>Yii::app()->createUrl('/school/manage',array('id'=>$model->userid)),
		'htmlOptions'=>array('data-dismiss'=>'modal','style'=>'margin:10px'),
		'size'=>'large',
		'icon'=>'pencil',
));

$this->widget('bootstrap.widgets.BootButton', array(
		'type'=>'success',
		'label'=>'添加课程',
		'url'=>Yii::app()->createUrl('/course/create',array('id'=>$model->id)),
		'htmlOptions'=>array('data-dismiss'=>'modal'),
		'size'=>'large',
		'icon'=>'flag',
));

	// $this->widget('zii.widgets.CListView', array(
// 	'dataProvider'=>new CActiveDataProvider(Message::model()->to($model->id)),
// 	'itemView'=>'../message/_view',
// )); 

?>
</div>
<?php 
$this->widget('bootstrap.widgets.BootDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		array(
				'label'=>'用户名',
				'value'=>'0'.$model->id,
				),
		'schoolname',
		'phone',
		'coverscope',
		'description',	
	),
));
?>

