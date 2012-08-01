KISSY.use("waterfall,ajax,template,node,button", function (S, Waterfall, io, Template, Node, Button) {
    var $ = Node.all;
    var tpl = Template($('#tpl').html().trim()),
        before = -1,
        waterfall = new Waterfall.Loader({
            container:"#ColumnContainer",
            adjustEffect:{
                duration:0.5,
                easing:"easeInStrong"
            },
            load:function (success, end) {
            	if (before==0)
            		return;
                $('#loadingPins').show();
                S.ajax({
                	data:(typeof id === 'undefined')?{
                    	'before':before,
                        'per_page':'20',
                    }:{
                    	'id':id,
                    	'before':before,
                        'per_page':'20',
                    },
                    url:(typeof baseUrl === 'undefined')?"":(baseUrl+'/message/'+action),
                    dataType:"json",
                    error:function(){
                    	$('#pleaseLogin').show();
                    },
                    success:function (d) {
                    	before=d['before'];
                        var items = [];
                        S.each(d['data'], function (item) {
                        	item.noBorder=true;
                            var comments=[];
                            var count=0;
                            if (!(typeof item['comments'] ==='undefined'))
                            {
                            	
	                            S.each(item['comments'],function (c){
	                            	count++;
	                            	c.display='block';
	                            	if (count==5 || count==item.commentNum)
	                            		c.noBorder=true;
	                            	if (count>5)
	                            		c.display='none';
	                            });
                        	}
                            if (item.commentNum>5)
                            	item.showMore='block';
                            else
                            	item.showMore='none';
                            if (item.commentNum>0)
                            	item.noBorder=false;
                            item.count=count;
                            items.push(new S.Node(tpl.render(item)));
                        });
                        success(items);	
                    },
                    complete:function () {
                        $('#loadingPins').hide();
                    }
                });
            },
            minColCount:2,
            colWidth:228
        });
    waterfall.on('adjustComplete', function () {
        S.log('after adjust complete!');
    });
    waterfall.on('addComplete', function () {
        S.log('after add complete!');
    });
    // scrollTo
    $('#BackToTop').on('click', function (e) {
        e.halt();
        e.preventDefault();
        $(window).stop();
        $(window).animate({
            scrollTop:0
        }, 1, "easeOut");
    });

    var b1 = new Button({
        content:"停止加载",
        render:"#button_container",
        prefixCls:"goog-"
    });

    // 点击按钮后, 停止瀑布图效果
    b1.render();

    b1.on("click", function () {
        waterfall.destroy();
    });

    $("#ColumnContainer").delegate("click", ".del", function (event) {
    	if(!confirm("你确定要删除这篇留言以及所有评论吗？"))
    		return;
        var w = $(event.currentTarget).parent(".ks-waterfall");
        waterfall.removeItem(w, {
            callback:function () {
            	S.ajax({
                	data:{
                		'id':w[0].id,
                		'ajax':'',
                    },
                    url:baseUrl+'/message/delete',
//                    url:'http://08cs.sinaapp.com/message/delete',
//                  url:'http://api.flickr.com/services/rest/',
                    type:"post",
                    dataType:"json",
                    jsonp:"jsoncallback",
                    error:function(){
                    },
                    success:function (d) {
                    },
                    complete:function () {
                    }
                });
            }
        });
    });
    
    $("#ColumnContainer").delegate("click", ".getComment", function (event) {
//    	src=$(event.srcElement).parent('.getComment')[0];
        var w = $(event.currentTarget).parent(".ks-waterfall");
//        comment=$(event.currentTarget).parent(".commentsWrapper").children(".comments");
        comment=$(document.getElementById(commentId));
        text=comment.parent().children('.showMore').children('.showMoreText')[0];
        src=$(text).parent().children('.getComment')[0];
        if (src.name=='loaded')
    	{
        	showAll(src,comment[0],text);
    		return;
    	}
        text.innerText="正在载入..."
            	S.ajax({
                	data:{
                		'refer':w[0].id,
                		'ajax':'',
                    },
                    url:baseUrl+'/message/comment',
//                    url:'http://08cs.sinaapp.com/message/delete',
//                  url:'http://api.flickr.com/services/rest/',
                    type:"get",
                    dataType:"json",
                    error:function(){
                    },
                    success:function (d) {
                    	var count=0;
                    	 S.each(d['comments'],function (c){
                         	count++;
                         	if (count>5)
                         	{
                         		content='<div class="comment" style="display:block;" >'+
										"<p class='date' style='float:right'>"+c.date+"</p>"+
							           	"<a href='#myModal' data-toggle='modal' id='submit' onclick='putImg(this)' rel='tooltip' title='点击显示大图'>" +
										'<img src="'+c.sender.avatar+'"  height="32px"></img>' +		
										'</a>'+
										'<a href='+baseUrl+'/user/view?id='+c.senderid+'>'+c.sender.username+'</a></p>'+
										'<div class="commentContent">'+c.text+'</div>' +
										'</div>';
                         		comment.append(content);
                         	}
                         });
                    	 src.name='loaded';
                    	 showAll(src,comment[0],text);
                    },
                    complete:function () {
                    }
                });
            
    });
    
    function showAll(o,comments,text)
	{
		var adjust;
		var show=(o.type=='show');
		var count=0;
		for (i=0;i< comments.childNodes.length;i++)
		{
			node=comments.childNodes[i];
			if (node.className=='comment')
			{
				count++;
				if (show)
				{
					node.style.display='block';
					if (count==5)
					{
						node.style.borderStyle='none none dashed none';
					}
				}
				else
				{
					if (count==5)
						node.style.borderStyle='none none none none';
					else if (count>5)
						node.style.display='none';
				}
			}
		}
		comments.childNodes[comments.childNodes.length-1].style.borderStyle='none none none none';
		if (show)
		{
			o.type='hide';
			o.title='点击收起评论';
			text.innerText='↑收起评论';
		}
		else
		{
			o.title='点击展开评论';
			o.type='show';
			text.innerText='↓还有'+(count-5)+'条评论未显示';
		}
		if (o.id.indexOf('this')<0)
			waterfall.adjust();
	}

    
    $("#ColumnContainer").delegate("click", ".grow", function (event) {
        var w = $(event.currentTarget).parent(".ks-waterfall");
        commentsWrapper=$(w).children(".commentsWrapper");
        first=commentsWrapper[0].style.display=='none';
        commentsWrapper[0].style.display='block';
        comment=commentsWrapper.children(".comments");
        waterfall.adjustItem(w, {
            process:function () {
            	content='<div class="comment" style="display:block;'+(first?('border:none'):(''))+'" >'+
            	"<p class='date' style='float:right;color:red'>刚才</p>"+
	           	"<a href='#myModal' data-toggle='modal' id='submit' onclick='putImg(this)' rel='tooltip' title='点击显示大图'>" +
				'<img src="'+avatar+'"  height="32px"></img>' +		
				'</a>'+
				'<a href='+baseUrl+'/user/view?id='+userId+'>'+userName+'</a></p>'+
				'<div class="commentContent">'+text+'</div>' +
				'</div>';
//            	comment='<div class="comment"><p "><a href="#myModal" data-toggle="modal" id="submit" onclick="putImg(this)"><img src="'+avatar+'"  height="32px"></img> </a><a href='+baseUrl+'/user/view?id='+userId+'>'+userName+'</a></p><p class="commentContent">'+text+'</p></div>';
            	comment.prepend(content);
            },
            callback:function () {
            }
        });
        
    });
    $("#ColumnContainer").delegate("click", ".adjust", function (event) {
        waterfall.adjust();
    });   
    
});
