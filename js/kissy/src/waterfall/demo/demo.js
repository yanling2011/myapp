﻿KISSY.use("waterfall,ajax,template,node,button", function (S, Waterfall, io, Template, Node, Button) {
    var $ = Node.all;

    var tpl = Template($('#tpl').html()),
        before = -1;
    	isEnd=false;
        waterfall = new Waterfall.Loader({
            container:"#ColumnContainer",
            load:function (success, end) {
            	if (isEnd==true)
            		{
            			end();
            			return;
            		}
                $('#loadingPins').show();
                S.ajax({
                    data:{
                    	'before':before,
                        'per_page':'15',
                        'format':'json'
                    },
                    url:'http://localhost/08csmemory/08cs/1/index.php/message/latest',
//                    url:'http://08cs.sinaapp.com/index.php/message/latest',
//                    url:'http://api.flickr.com/services/rest/',
                    dataType:"json",
                    json:"jsoncallback",
                    success:function (d) {
                    //alert("ccc");
                        // 如果数据错误, 则立即结束
//                        if (d.stat !== 'ok') {
//                            alert('load data error!');
//                            end();
//                            return;
//                        }
                        // 如果到最后一页了, 也结束加载
//                        nextpage = d.photos.page + 1;
                    	before=d['before'];
                    	if (before==1)
                    		isEnd=true;
                        // 拼装每页数据
                        var items = [];
                        S.each(d['data'], function (item) {
                            item.height = Math.round(Math.random() * (300 - 180) + 180); // fake height
                            items.push(new S.Node(tpl.render(item)));
                        });
                        success(items);
                    },
                    complete:function () {
                        $('#loadingPins').hide();
                    },
                });
            },
            minColCount:2,
            colWidth:228
            //align:'left' // right, center (default)
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
        var w = $(event.currentTarget).parent(".ks-waterfall");
        waterfall.removeItem(w, {
            callback:function () {
                alert("删除完毕");
            }
        });
    });


    $("#ColumnContainer").delegate("click", ".grow", function (event) {
        var w = $(event.currentTarget).parent(".ks-waterfall");
        waterfall.adjustItem(w, {
            process:function () {
                w.append("<p>i grow height by 100</p>");
            },
            callback:function () {
                alert("调整完毕");
            }
        });
    });
});
