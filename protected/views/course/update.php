<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->pageTitle="课程管理";
$this->pageCaption="课程管理";
$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		'更新课程信息'
	    ),
	));
?>
<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
