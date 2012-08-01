<style>
.span-19{
	width:910px;margin-right:20px;
}
</style>

<?php
$this->pageTitle=Yii::app()->name . ' - Calendar';

$this->widget('bootstrap.widgets.BootBreadcrumbs', array(
		'links'=>array(
	'关于',
),
));
?>

<h1> How To Play</h1>
<hr>
<p>本网站由08级毕业活动组文艺活动小组制作</p>
<p style="color:#B452CD">只有初次登录时才会自动跳转到这个页面</p>
<h1>最近更新</h1>
<hr>
<h3>5.13</h3>
<li>评论现在可以收起和展开</li>
<li>现在排序机制和论坛的一样,有新评论的也会提到前面去</li>
<li>再次大幅更换了界面风格。</li>
<li>优化了一些操作，比如描述界面现在操作更直观了，并且自定义标签会直接加到当前栏里。</li>
<br>
<h3>5.12</h3>
<li>匿名用户现在可以留言。</li>
<li>更换了界面风格。</li>
<br>
<h3>5.11</h3>
<li>添加了删除按钮。只能删除属于自己（由自己发出或接受）的留言。</li>
<li>优化了访问速度</li>
<h1>首页</h1>
<hr>
<p>在首页会按时间顺序显示所有公开的留言，以及接收者为你的私密留言。</p>
<p>采用瀑布流形式展示留言，向下滑动以显示更多。</p>
<p>除了首页以外的大部分内容都要登录后才能查看。</p>
<p>登录时用户名为学号，密码默认为学号，请在初次登录后尽快完善个人信息，并强烈建议您更改密码。</p>
<img title="首页" style="max-width:600px" src="<?php echo Yii::app()->request->baseUrl?>/images/home.jpg" alt="首页"><img>
<img title="登录" src="<?php echo Yii::app()->request->baseUrl?>/images/login.jpg"><img>
<h2>消息提醒</h2>
<hr>
<p>本站支持两种方式的消息提醒:</p>
<tt>1.邮件提醒
<p>在帐号设置中填写正确的邮箱地址，并勾选“接受邮件通知”，即可在别人给你发送留言后收到系统发送的邮件通知。</p></tt>
<img title="邮件提醒" src="<?php echo Yii::app()->request->baseUrl?>/images/mail.jpg"><img>
<tt>2.新消息提醒
<p>显示在页面的右上角，显示当前有多少条新消息。点击可以进入新消息查看界面。（当前只在首页看过的内容仍然算是新消息）。</p></tt>
<img title="新消息提醒" src="<?php echo Yii::app()->request->baseUrl?>/images/notice.jpg"><img>
<br>
<br>

<h1>名单</h1>
<hr>
<p>在名单也中可以查看所有人的概况，可以点击某一条查看详细信息，或是进行快速留言。</p>
<img title="名单" src="<?php echo Yii::app()->request->baseUrl?>/images/list.jpg"><img>

<h1>留言板</h1>
<hr>
<p>在这个页面你可以查看详细的个人信息，以及所有公开的或是你发送的留言（如果是在自己的留言板中，则可以显示所有的留言）。</p>
<p>同首页一样，也采用瀑布流形式展示，向下滑动以查看更多。</p>
<p>点击留言或是描述按钮可以进入相应功能页面</p>
<img title="留言板" src="<?php echo Yii::app()->request->baseUrl?>/images/yjd.jpg"><img>

<h2>留言</h2>
<hr>
<p>在留言界面，你可以为你的留言输入标题，内容，并最多可以上传一张大小不超过1M的图片.</p>
<p>内容使用富文本编辑器TinyMce进行编辑，支持各种格式变化，并支持外链图片。</p>
<p>如果勾选了匿名方式发表，别人将会看到该留言是由“匿名用户”发出的。</p>
<p>如果勾选了悄悄话方式发表，则只有发送的对象能看到该条留言。</p>
<img title="留言" src="<?php echo Yii::app()->request->baseUrl?>/images/message.jpg"><img>

<h2>描述</h2>
<hr>
<p>在这个界面你可以为他人添加标签式的描述（不超过10个字）</p>
<p>拖动左侧的推荐描述到右侧，或是生成自定义描述并拖动到右侧后提交即可,一次可以贴多个标签。</p>
<p>描述提交后会自动生成一条相应的留言给对方。</p>
<p>如果勾选了匿名方式描述，则在对应的留言中对方会看到是由“匿名用户”发出的。</p>
<img title="贴标签" src="<?php echo Yii::app()->request->baseUrl?>/images/tag.jpg"><img>

<h1>帐号管理</h1>
<hr>
<p>在帐号管理中可以设置你自己的详细信息，如果填写了正确的邮箱并勾选了”接受邮件通知"，将会在别人给你留言后收到系统发送的邮件通知。</p>
<p>点击修改密码可以进入修改密码页面。</p>
<img title="帐号管理" src="<?php echo Yii::app()->request->baseUrl?>/images/settings.jpg"><img>

<hr></hr>
<p class="hint">如果你有任何意见/建议，或是发现了任何问题，或是需要重置密码，请联系我（周昊一）:<a  href="mailto:cncabf00@gmail.com">cncabf00@gmail.com</a></p>