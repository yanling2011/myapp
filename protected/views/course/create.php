<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->pageTitle="添加课程";
$this->pageCaption="添加课程";
$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
		'添加课程'
	    ),
	));
?>
<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
