<?php
$this->pageTitle=Yii::app()->name . ' - Error';

$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
				'错误',
		),
));
?>

<h2>Error <?php echo $code; ?></h2>

<div class="error">
<?php echo CHtml::encode($message); ?>
</div>