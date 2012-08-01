<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->pageTitle="修改信息";
$this->pageCaption="驾校管理";
$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		'管理驾校信息'
	    ),
	));
?>
<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
