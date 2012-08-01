/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 2 10:12
*/
KISSY.add("chart/anim",function(e){function g(d,c){this.duration=1E3*d;this.fnEasing=e.isString(c)?h[c]:c}var f=e.namespace("Chart"),h=e.Easing;e.augment(g,{init:function(){this.start=(new Date).getTime();this.finish=this.start+this.duration},get:function(){var d=(new Date).getTime();return d>this.finish?1:this.fnEasing((d-this.start)/this.duration)}});return f.Anim=g});
KISSY.add("chart/axis",function(e){function g(d,c,a){this.chart=c;this.type=d.type;this.data=d;this.axisData=d.axis();this.cfg=a;this.current_x=-1;this.initEvent();e.each(this.axisData,function(a){a.name="name"in a&&e.isString(a)&&0<a.name.length?"("+a.name+")":!1});this.initdata(this.axisData,a)}var f=KISSY.namespace("Chart"),h=e.Event;e.mix(g,{getMax:function(d,c){var a=Math.ceil((c.height-c.paddingBottom-c.paddingTop)/40),b=d/a,n;if(1>=b)b=1;else if(1<b&&5>=b)b=Math.ceil(b);else if(5<b&&10>=b)b=
10;else{n=1;do n*=10,b/=10;while(10<b);b=Math.ceil(b)*n}return b*a}});e.augment(g,e.EventTarget,{initYLabel:function(d,c){if(d.y.labels)return null;var a=c.max,b=Math.ceil((c.height-c.paddingBottom-c.paddingTop)/40),a=a/b,n=[];for(i=0;i<=b;i++)n.push(a*i);d.y.labels=n},initdata:function(d,c){this.initYLabel(d,c);var a=d.x,b=d.y,n=a.labels.length,k=b.labels.length,u=c.height,e=c.width-c.paddingRight,h=c.paddingLeft,l=u-c.paddingBottom,j=c.paddingTop,g=(l-j)/(k-1),s=e-h,p,r,y=Math.ceil(120*n/s);a._lpath=
{x:2*e-h,y:u-l+20};a._path=[];a._area=[];a._showlabel=[];for(i=0;i<n;i++)"line"===this.type?(p=s/(n-1),u=h+i*p,r=0===i?u:u-p/2,p=i===n-1?u:u+p/2):(p=s/n,u=h+(i+0.5)*p,r=u-p/2,p=u+p/2),a._showlabel.push(0===i||0===i%y),a._path.push({left:r,right:p,top:j,bottom:l,x:u}),a._area.push(new f.RectPath(r,j,p-r,l-j));b._lpath={x:(l-j)/2+j,y:-10};b._path=[];for(i=0;i<k;i++)b._path.push({y:l-g*i,left:h,right:e})},initEvent:function(){"line"===this.type&&(h.on(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove,
this),h.on(this.chart,f.Chart.MOUSE_LEAVE,this.chartMouseLeave,this))},destory:function(){this.type===ATYPE.LINE&&(h.remove(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove),h.remove(this.chart,f.Chart.MOUSE_LEAVE,this.chartMouseLeave))},chartMouseMove:function(d){var c=this;e.each(c.axisData.x._area,function(a,b){if(b!==c.current_x&&a.inpath(d.x,d.y))return c.current_x=b,c.fire("xaxishover",{index:b,x:c.axisData.x._path[b].x}),c.fire("redraw"),!1})},chartMouseLeave:function(){this.current_x=-1;
this.fire("redraw");this.fire("leave")},draw:function(d,c){var a=this.data.config,b=this.data.axis(),n=b.x,k=b.y,f=n.labels.length,e=k.labels.length,h="line"===this.type,g="bar"===this.type,j,m;d.save();for(j=0;j<e;j++)if(m=k._path[j],b=k.labels[j],1===j%2&&0<j&&(d.save(),d.globalAlpha=0.3,d.fillStyle=a.axisBackgroundColor,d.fillRect(m.left,m.y,m.right-m.left,k._path[j-1].y-m.y),d.restore()),0!==j&&j!==e-1&&(d.strokeStyle=a.axisGridColor,d.lineWidth="1.0",d.beginPath(),d.moveTo(m.left,m.y),d.lineTo(m.right,
m.y),d.stroke()),b)d.font="12px Tohoma",d.textAlign="right",d.textBaseline="middle",d.fillStyle=a.axisTextColor,d.fillText(b,m.left-5,m.y);for(j=0;j<f;j++)if(e=j===this.current_x,k=n._path[j],b=n.labels[j],m=n._showlabel[j],d.strokeStyle=h&&e?"#404040":a.axisGridColor,d.lineWidth=h&&e?"1.6":"1.0",g&&0!==j&&(d.beginPath(),d.moveTo(k.left,k.bottom),d.lineTo(k.left,k.top),d.stroke()),h&&0!==j&&j!==f-1&&(d.beginPath(),d.moveTo(k.x,k.bottom),d.lineTo(k.x,k.top),d.stroke()),b&&m)d.font="13px Tahoma",d.textAlign=
h&&0===j?"left":h&&j===f-1?"right":"center",d.textBaseline="top",d.fillStyle=a.axisTextColor,d.fillText(b,k.x,k.bottom+5);-1!==this.current_x&&(k=n._path[this.current_x],b=n.labels[this.current_x],d.font="12px Tahoma",n=d.measureText(b).width+6,d.fillStyle="#333",f=Math.max(k.x-n/2,a.paddingLeft),f=Math.min(f,c.width-a.paddingRight-n),d.fillRect(f,k.bottom,n,20),d.textAlign="left",d.fillStyle="#ffffff",d.fillText(b,f+2,k.bottom+5));d.restore();this.drawLabels(d)},drawLabels:function(d){var c=this.data.axis(),
a=c.y.name,b=c.x.name,n=c.x._lpath,c=c.y._lpath;d.save();d.font="10px Arial";d.fillStyle="#808080";d.textAlign="center";d.textBaseline="middle";b&&d.fillText(b,n.x,n.y);a&&(d.rotate(Math.PI/2),d.translate(c.x,c.y),d.fillText(a,0,0));d.restore()}});return f.Axis=g});
KISSY.add("chart",function(e){function g(a,b){if(!(this instanceof g))return new g(a,b);var c=this.elCanvas=h.get(a);if(c){var k=c.width,f=c.height;this.elCanvas=c;this.width=k;this.height=f;this.ctx=-1;this.tooltip=g.getTooltip();this._chartAnim=new d.Anim(0.3,"easeIn");b&&(this.data=b,this._initContext())}}var f=e.Event,h=e.DOM,d=e.namespace("Chart"),c={left:40,top:40};g.getTooltip=function(){g.tooltip||(g.tooltip=new d.SimpleTooltip);return g.tooltip};g.MOUSE_LEAVE="mouse_leave";g.MOUSE_MOVE="mouse_move";
e.augment(g,e.EventTarget,{render:function(a){var b=this;if(-1==b.ctx)b.data=a,b._initContext();else if(0===b.ctx)b.data=a;else if(b._data=new d.Data(a),b._data){a=b._data;b.initChart();b._drawcfg=e.merge(c,a.config,{width:b.width,height:b.height});if("bar"===a.type||"line"===a.type)b._drawcfg.max=a.axis().y.max||d.Axis.getMax(a.max(),b._drawcfg),b.axis=new d.Axis(a,b,b._drawcfg),b._frame=new d.Frame(b._data,b._drawcfg),b.layers.push(b.axis),b.layers.push(b._frame);b.element=d.Element.getElement(b._data,
b,b._drawcfg);b.layers.push(b.element);var a=a.config,n=b.ctx.createLinearGradient(0,0,0,b.height);b.backgroundFillStyle=null;a.backgroundStyle&&"object"===typeof a.backgroundStyle?(n.addColorStop(0,a.backgroundStyle.start),n.addColorStop(1,a.backgroundStyle.end),b.backgroundFillStyle=n):e.isString(a.backgroundStyle)&&(b.backgroundFillStyle=a.backgroundStyle);setTimeout(function(){b._redraw();b.initEvent()},100)}},_initContext:function(){var a=this;if("object"!=typeof a.ctx)if(a.elCanvas.getContext)setTimeout(function(){a.ctx=
a.elCanvas.getContext("2d");a._contextReady()},150);else if(a.ctx=0,a._count="number"==typeof a._count?a._count-1:30,0<=a._count)setTimeout(function(){a._initContext()},150);else{var b=h.create("<p class='ks-chart-error' > \u7cdf\u4e86\uff0c\u4f60\u7684\u6d4f\u89c8\u5668\u8fd8\u4e0d\u652f\u6301\u6211\u4eec\u7684\u56fe\u8868</p>");h.insertAfter(b,a.elCanvas)}},_contextReady:function(){this.data&&this.render(this.data)},loading:function(){this.showMessage("\u8f7d\u5165\u4e2d...")},showMessage:function(a){var b=this.ctx,c=this.width/2,d=this.height/2;b.clearRect(0,0,this.width,this.height);b.save();
b.font="12px Arial";b.textAlign="center";b.fillStyle="#808080";b.fillText(a,c,d);b.restore()},initChart:function(){this._chartAnim.init();this.layers=[];this._updateOffset();this.loading();e.each([this.element,this.axis],function(a){a&&(a.destory(),f.remove(a))});this.axis=this.element=null;this._event_inited&&(f.remove(this.elCanvas,"mousemove",this._mousemoveHandle),f.remove(this.elCanvas,"mouseenter",this._mouseenterHandle),f.remove(this.elCanvas,"mouseleave",this._mouseLeaveHandle),f.remove(this,
g.MOUSE_LEAVE,this._drawAreaLeave));this.tooltip.hide()},initEvent:function(){var a=this;a._event_inited=!0;f.on(a.elCanvas,"mousemove",a._mousemoveHandle,a);f.on(a.elCanvas,"mouseenter",a._mouseenterHandle,a);f.on(a.elCanvas,"mouseleave",a._mouseLeaveHandle,a);f.on(a,g.MOUSE_LEAVE,a._drawAreaLeave,a);if("bar"===a.type)f.on(a.element,"barhover",a._barHover,a);a.axis&&(f.on(a.axis,"xaxishover",a._xAxisHover,a),f.on(a.axis,"leave",a._xAxisLeave,a),f.on(a.axis,"redraw",a._redraw,a));f.on(a.element,"redraw",
a._redraw,a);f.on(a.element,"showtooltip",function(b){b=e.isString(b.message)?b.message:b.message.innerHTML;a.tooltip.show(b)});f.on(a.element,"hidetooltip",function(){a.tooltip.hide()})},draw:function(){var a=this.ctx,b=this._chartAnim.get(),c=this._drawcfg;a.save();a.globalAlpha=b;this.backgroundFillStyle?(a.fillStyle=this.backgroundFillStyle,a.fillRect(0,0,c.width,c.height)):a.clearRect(0,0,c.width,c.height);e.each(this.layers,function(b){b.draw(a,c)});a.restore();1>b&&this._redraw()},ctx:function(){return this.ctx?
this.ctx:this.elCanvas.getContext?this.ctx=this.elCanvas.getContext("2d"):null},_redraw:function(){this._redrawmark=!0;this._running||this._run()},_run:function(){var a=this;clearTimeout(a._timeoutid);a._running=!0;a._redrawmark=!1;a._timeoutid=setTimeout(function(){a.draw();a._redrawmark?a._run():a._running=!1},1E3/24)},_barHover:function(){},_xAxisLeave:function(){this.fire("axisleave")},_xAxisHover:function(a){this.fire("axishover",{index:a.index,x:a.x});this._redraw()},_drawAreaLeave:function(){this.tooltip.hide()},
_mousemoveHandle:function(a){var b=a.pageX-this.offset.left,a=a.pageY-this.offset.top;this._frame&&this._frame.path&&this._frame.path.inpath(b,a)||!this._frame?this.fire(g.MOUSE_MOVE,{x:b,y:a}):this.fire(g.MOUSE_LEAVE)},_mouseenterHandle:function(){this._updateOffset()},_updateOffset:function(){return this.offset=h.offset(this.elCanvas)},_mouseLeaveHandle:function(a){var b=this.tooltip,a=a.relatedTarget;(!a||!(a===b.n_c[0]||b.n_c.contains(a)))&&this.fire(g.MOUSE_LEAVE)}});return d.Chart=g},{requires:"chart/anim,chart/axis,chart/simpletooltip,chart/frame,chart/element,chart/element-bar,chart/element-line,chart/element-pie,chart/data".split(",")});
KISSY.add("chart/color",function(e){var g=function(){var f=function b(c,d,e,f){var h=arguments.length;if(3>h){if("string"===typeof c){var c=c.substr(c.indexOf("#")+1),g=3===c.length,c=parseInt(c,16);g&&(c=4352*(c&3840)|272*(c&240)|17*(c&15))}2===h&&(f=d);d=(c&65280)/256;e=c&255;c>>>=16}if(!(this instanceof b))return new b(c,d,e,f);this.channels=["string"===typeof c&&parseInt(c,16)||c,"string"===typeof d&&parseInt(d,16)||d,"string"===typeof e&&parseInt(e,16)||e,"string"!==typeof f&&"number"!==typeof f&&
1||"string"===typeof f&&parseFloat(f)||f]},e=f.prototype,d=Math,c;f.RGBtoHSL=function(b){var c=b[0],k=b[1],b=b[2],c=c/255,k=k/255,b=b/255,e=d.max(c,k,b),f=d.min(c,k,b),h,g=(e+f)/2;if(e===f)h=f=0;else{var j=e-f,f=0.5<g?j/(2-e-f):j/(e+f);switch(e){case c:h=(k-b)/j+(k<b?6:0);break;case k:h=(b-c)/j+2;break;case b:h=(c-k)/j+4}h/=6}return[h,f,g]};f.HSLtoRGB=function(b){var c=b[0],d=b[1],f=b[2],b=function(b,c,d){0>d&&(d+=1);1<d&&(d-=1);return d<1/6?b+6*(c-b)*d:0.5>d?c:d<2/3?b+6*(c-b)*(2/3-d):b};if(0===d)d=
f=c=f;else var e=0.5>f?f*(1+d):f+d-f*d,h=2*f-e,d=b(h,e,c+1/3),f=b(h,e,c),c=b(h,e,c-1/3);return[255*d,255*f,255*c]};f.rgb=function(b,c,d,e){return new f(b,c,d,"undefined"!==typeof e?e:1)};f.hsl=function(b,c,e,h){b=f.HSLtoRGB([b,c,e]);c=d.ceil;return new f(c(b[0]),c(b[1]),c(b[2]),"undefined"!==typeof h?h:1)};f.TO_STRING_METHOD="hexTriplet";f.parse=function(b){b=b.replace(/^\s+/g,"").toLowerCase();if("#"===b[0])return new f(b);var c=b.substr(0,3),d,b=b.replace(/[^\d,.]/g,"").split(",");for(d=b.length;d--;)b[d]=
b[d]&&parseFloat(b[d])||0;switch(c){case "rgb":return f.rgb.apply(f,b);case "hsl":return b[0]/=360,b[1]/=100,b[2]/=100,f.hsl.apply(f,b)}return null};(f.clearColors=function(){c={transparent:[0,0,0,0]}})();f.define=function(b,d){c[b.toLowerCase()]=d};f.get=function(b){b=b.toLowerCase();return Object.prototype.hasOwnProperty.call(c,b)?f.apply(null,[].concat(c[b])):null};f.del=function(b){return delete c[b.toLowerCase()]};f.random=function(b,c){"string"===typeof b&&(b=f.get(b))&&(b=b.getValue());"string"===
typeof c&&(c=f.get(c))&&(c=c.getValue());var e=d.floor,h=d.random,c=(c||16777215)+1;return!isNaN(b)?new f(e(h()*(c-b)+b)):new f(e(h()*c))};e.toString=function(){return this[f.TO_STRING_METHOD]()};e.valueOf=e.getValue=function(){var b=this.channels;return 65536*b[0]|256*b[1]|b[2]};e.setValue=function(b){this.channels.splice(0,3,b>>>16,(b&65280)/256,b&255)};e.hexTriplet="1"==="01".substr(-1)?function(){return"#"+("00000"+this.getValue().toString(16)).substr(-6)}:function(){var b=this.getValue().toString(16);
return"#"+Array(6>b.length?6-b.length+1:0).join("0")+b};e.css=function(){return 1===this.channels[3]?this.hexTriplet():this.rgba()};e.rgbData=function(){return this.channels.slice(0,3)};e.hslData=function(){return f.RGBtoHSL(this.rgbData())};e.rgb=function(){return"rgb("+this.rgbData().join(",")+")"};e.rgba=function(){return"rgba("+this.channels.join(",")+")"};e.hsl=function(){var b=this.hslData();return"hsl("+360*b[0]+","+100*b[1]+"%,"+100*b[2]+"%)"};e.hsla=function(){var b=this.hslData();return"hsla("+
360*b[0]+","+100*b[1]+"%,"+100*b[2]+"%,"+this.channels[3]+")"};return f}();return e.namespace("Chart").Color=g});KISSY.add("chart/colors",function(e){e.namespace("Chart").colors=[{c:"#00b0f0"},{c:"#FF4037"},{c:"#39B54A"},{c:"#FEF56F"},{c:"#c821ac"},{c:"#D1EB53"}]});
KISSY.add("chart/data",function(e){function g(a){if(a&&a.type){if(!this instanceof g)return new g(a);var b=a.config;this.origin=a;a=e.clone(a);this.type=a.type.toLowerCase();this.config=b=e.merge(h,d[this.type],b);e.each({left:"paddingLeft",top:"paddingTop",bottom:"paddingBottom",right:"paddingRight"},function(a,c){c in b&&e.isNumber(b[c])&&(b[a]=b[c])});this._elements=this._initElement(a);this._elements=this._expandElement(this._elements);this._initElementItem();this._axis=a.axis}}var f=e.namespace("Chart"),
h={paddingTop:30,paddingLeft:20,paddingRight:20,paddingBottom:20,showLabels:!0,colors:[],animationDuration:0.5,animationEasing:"easeInStrong",backgroundStyle:!1,axisTextColor:"#999",axisBackgroundColor:"#EEE",axisGridColor:"#e4e4e4",numberFormat:!1,frameColor:"#d7d7d7"},d={line:{drawbg:-1},bar:{},pie:{animationDuration:1.8,animationEasing:"bounceOut",paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,shadow:!0,labelTemplete:"{name} {pecent}%",firstPieOut:!1}},c={"default":{label:"{name} -  {data}"},
line:{},pie:{},bar:{}};e.augment(g,{axis:function(){return this._axis},elements:function(){return this._elements},maxElementLength:function(){var a=0;e.each(this._elements,function(b){a=e.isArray(b.items)?Math.max(a,b.items.length):Math.max(a,1)});return a},getColor:function(a,b){var c=this._elements.length,d=this.config.colors;return e.isArray(d)&&d[a]?d[a]:e.isFunction(d)?d(a):this.getDefaultColor(a,c,b)},sum:function(){var a=0;this.eachElement(function(b){a+=b.data});return a},max:function(){return this._max},
getDefaultColor:function(a,b){var c=1/3,d=c*a,e,h;3>a?d=c*a+0.05:(0==b%3&&(a===b-1?a=b-2:a===b-2&&(a=b-1)),d=a%3,e=Math.ceil(b/3),h=Math.ceil((a+1)/3),d=d*c+c/e*(h-1));return f.Color.hsl(d,0.7,0.65).hexTriplet()},eachElement:function(a){e.each(this._elements,function(b,c){b.items?e.each(b.items,function(b,d){a(b,c,d)}):a(b,c,-1)})},_initElementItem:function(){var a=this;a._max=null;a.eachElement(function(b,d,h){0===d&&!h&&(a._max=b.data||0);h=e.merge(c["default"],c[a.type]||{});b.data=e.isNumber(b.data)?
b.data:0;e.isArray(a.config.numberFormats)&&(b.format=a.config.numberFormats[d]);"undefined"==typeof b.format&&(b.format=a.config.numberFormat);b.label=b.label||h.label;b.label=e.substitute(b.label,{name:b.name,data:b.format?f.format(b.data,b.format):b.data});a._max=Math.max(a._max,b.data)})},_expandElement:function(a){var b;e.each(a,function(a){e.isArray(a.datas)&&(a.items=a.items||[],e.each(a.datas,function(c,d){b={name:a.name,data:c};a.label&&(b.label=a.label);a.labels&&e.isString(a.labels[d])&&
(b.label=a.labels[d]);delete a.datas;a.items.push(b)}))});return a},_initElement:function(a){var b=null,c,d=this;a.elements&&e.isArray(a.elements)&&(b=e.clone(a.elements));!a.elements&&a.element&&e.isArray(a.element.names)&&(b=[],c=a.element,e.each(c.names,function(a,e){b.push({name:a,data:d._getLabel(c.datas,e),label:d._getLabel(c.labels,e)||c.label})}));return b},_getLabel:function(a,b){return e.isArray(a)?b<a.length?a[b]:null:!1}});return f.Data=g},{requires:["chart/color"]});
KISSY.add("chart/element",function(e){function g(){}var f=e.namespace("Chart");e.mix(g,{getElement:function(e,d,c){var a;switch(e.type){case "line":a=f.LineElement;break;case "pie":a=f.PieElement;break;case "bar":a=f.BarElement}return new a(e,d,c)},getMax:function(e){var d=e[0].data[0],c,a=e.length,b,f;for(c=0;c<a;c++){element=e[c];b=0;for(f=element.data.length;b<f;b++)d=Math.max(d,element.data[b]||0)}return d}});e.augment(g,e.EventTarget,{drawNames:function(e){for(var d=this.drawcfg,c=this.data.elements(),
a=c.length-1,b=d.width-d.paddingRight,d=d.paddingTop-12,f,k;0<=a;a--)f=c[a],f.notdraw||(k=this.data.getColor(a),e.save(),e.textAlign="end",e.textBaseline="middle",e.fillStyle="#808080",e.font="12px Arial",e.fillText(f.name,b,d),b-=e.measureText(f.name).width+10,e.restore(),e.save(),e.beginPath(),e.fillStyle=k,e.arc(b,d,5,0,2*Math.PI,!0),e.closePath(),e.fill(),e.restore(),b-=10)},init:function(){},initdata:function(){},destory:function(){},draw:function(){},drawBar:function(){},getTooltip:function(){}});
return f.Element=g});
KISSY.add("chart/element-bar",function(e){function g(d,c,a){this.data=d;this.chart=c;this.drawcfg=a;this.config=d.config;this.initData(a);this.initEvent();this.current=[-1,-1];this.anim=new f.Anim(this.config.animationDuration,this.config.animationEasing);this.anim.init()}var f=e.namespace("Chart"),h=e.Event;e.extend(g,f.Element,{initData:function(d){var c=this,a=c.data,b=a.elements().length,a=a.maxElementLength(),e=d.paddingLeft,h=d.height-d.paddingBottom,g=(d.width-d.paddingRight-e)/a,q=g/5/b,o=
g/3/b,l=(g-(b-1)*q-2*o)/b,j,m,s,p,r=[];c.maxLength=a;c.items=r;c.data.eachElement(function(a,b,t){-1===t&&(t=0);r[b]||(r[b]={_x:[],_top:[],_left:[],_path:[],_width:[],_height:[],_colors:[],_dcolors:[],_labels:[]});var v=r[b];j=(h-d.top)*a.data/d.max;m=e+t*g+o+b*(l+q);s=h-j;p=f.Color(c.data.getColor(b,"bar"));var b=p.hslData(),z=b[2],w=b[1];colord=new f.Color.hsl(b[0],w,0.6*(z+w/2)-w/2);v._left[t]=m;v._top[t]=s;v._width[t]=l;v._height[t]=j;v._path[t]=new f.RectPath(m,s,l,j);v._x[t]=m+l/2;v._colors[t]=
p;v._dcolors[t]=colord;v._labels[t]=a.label})},draw:function(d){var c=this,a=c.items,b=c.maxLength,h,k,g,q,o,l,j=c.anim.get(),m;c.data.config.showLabels&&c.drawNames(d);e.each(a,function(e,p){for(m=0;m<b;m++)o=e._left[m],g=e._height[m],q=g*j,l=e._top[m]+g-q,barwidth=e._width[m],h=e._colors[m],dcolor=e._dcolors[m],k=d.createLinearGradient(o,l,o,l+q),k.addColorStop(0,h.css()),k.addColorStop(1,dcolor.css()),d.fillStyle=k,d.fillRect(o,l,barwidth,q),1===b&&25<g&&(d.save(),d.fillStyle="#fff",d.font="20px bold Arial",
d.textBaseline="top",d.textAlign="center",a=c.data.elements()[p],d.fillText(f.format(a.data,a.format),e._x[m],l+2),d.restore())});1>j&&c.fire("redraw")},initEvent:function(){h.on(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove,this);h.on(this.chart,f.Chart.MOUSE_LEAVE,this.chartMouseLeave,this)},destory:function(){h.remove(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove);h.remove(this.chart,f.Chart.MOUSE_LEAVE,this.chartMouseLeave)},chartMouseMove:function(d){var c=[-1,-1],a=this.items;e.each(this.items,
function(a,f){e.each(a._path,function(a,b){a.inpath(d.x,d.y)&&(c=[f,b])})});c[0]===this.current[0]&&c[1]===this.current[1]||(this.current=c,0<=c[0]+c[1]?(this.fire("barhover",{index:c}),this.fire("showtooltip",{top:a[c[0]]._top[c[1]],left:a[c[0]]._x[c[1]],message:this.getTooltip(c)})):this.fire("hidetooltip"))},chartMouseLeave:function(){this.current=[-1,-1]},getTooltip:function(d){var c=d[1],d=this.items[d[0]];return"<div class='bartip'><span style='color:"+d._colors[c].css()+";'>"+d._labels[c]+
"</span></div>"}});return f.BarElement=g},{requires:["chart/element"]});
KISSY.add("chart/element-line",function(e){function g(d,c,a){this.chart=c;this.data=d;this.elements=d.elements();this._current=-1;this.config=d.config;this.drawcfg=a;this.initdata(a);this._ready_idx=-1;this.init();this.anim=new f.Anim(this.config.animationDuration,this.config.animationEasing);this.anim.init()}var f=e.namespace("Chart"),h=e.Event;e.extend(g,f.Element,{initdata:function(d){var c=this.data,a=c.maxElementLength(),b=d.paddingLeft,e=d.height-d.paddingBottom,f=e-d.paddingTop,h=(d.width-
d.paddingRight-b)/(a-1),g=[];this.items=g;c.eachElement(function(a,l,j){g[l]||(g[l]={_points:[],_labels:[],_color:c.getColor(l),_maxtop:e,_drawbg:l===c.config.drawbg});l=g[l];ptop=Math.max(e-a.data/d.max*f,d.paddingTop-5);l._maxtop=Math.min(l._maxtop,ptop);l._labels[j]=a.label;l._points[j]={x:b+h*j,y:ptop,bottom:e}})},draw:function(d,c){var a=this,b=a.data,f=c.paddingLeft,h=c.width-c.paddingRight,g=c.height-c.paddingBottom,q,o,l,j,m,s,p=a.anim.get(),r;b.config.showLabels&&a.drawNames(d,c);1<=p&&this._ready_idx<
a.items.length-1&&(a._ready_idx++,a.anim.init(),p=a.anim.get());(this._ready_idx!==b.elements().length-1||1!==p)&&this.fire("redraw");e.each(a.items,function(b,c){var e;s=c!==a._ready_idx?c>a._ready_idx?0:1:p;q=b._color;l=b._points;if(b._drawbg){d.save();d.globalAlpha=0.4;maxtop=g-(g-b._maxtop)*s;r=d.createLinearGradient(f,maxtop,f,g);r.addColorStop(0,q);r.addColorStop(1,"rgb(255,255,255)");d.fillStyle=r;d.beginPath();d.moveTo(f,g);for(j=0;j<l.length;j++){e=l[j];o=g-(g-e.y)*s;d.lineTo(e.x,o)}d.lineTo(h,
g);d.stroke();d.fill();d.restore()}d.save();m=l.length;d.strokeStyle=q;d.lineWidth=2;d.beginPath();for(j=0;j<m;j++){e=l[j];o=g-(g-e.y)*s;j===0?d.moveTo(e.x,o):d.lineTo(e.x,o)}d.stroke();d.restore();d.save();for(j=0;j<m;j++){e=l[j];o=g-(g-e.y)*s;d.fillStyle=q;d.beginPath();d.arc(e.x,o,5,0,Math.PI*2,true);d.closePath();d.fill();if(j!==a._current){d.fillStyle="#fff";d.beginPath();d.arc(e.x,o,3,0,Math.PI*2,true);d.closePath();d.fill()}}d.restore()})},init:function(){this._ready_idx=0;h.on(this.chart,
"axishover",this._axis_hover,this);h.on(this.chart,"axisleave",this._axis_leave,this)},destory:function(){h.remove(this.chart,"axishover",this._axis_hover);h.remove(this.chart,"axisleave",this._axis_leave)},_axis_hover:function(d){d=d.index;this._current!==d&&(this._current=d,this.fire("redraw"),this.fire("showtooltip",{message:this.getTooltip(d)}))},_axis_leave:function(){this._current=-1;this.fire("redraw")},getTooltip:function(d){var c,a;c="<ul>";e.each(this.items,function(b){a="<li><p style='color:"+
b._color+"'>"+b._labels[d]+"</p></li>";c+=a});return c+="</ul>"}});return f.LineElement=g},{requires:["chart/element"]});
KISSY.add("chart/element-pie",function(e){function g(c,a,b){this.data=c;this.chart=a;this.type=0;this.config=c.config;this.drawcfg=b;this.initdata(b);this.init();this.anim=new f.Anim(this.config.animationDuration,this.config.animationEasing);this.anim.init()}var f=e.namespace("Chart"),h=e.Event,d=function(c){e.isString(c)&&(c=f.Color(c));var c=c.hslData(),a=c[1],b=c[2];return new f.Color.hsl(c[0],a,1.05*(b+0.5*a)-0.5*a)};e.extend(g,f.Element,{initdata:function(c){var a=this,b=a.data,f=0,h,g,q,o;a._x=
b.config.showLabels?0.618*c.width/2:c.width/2;a._y=c.height/2;a._r=Math.min(c.height-c.paddingTop-c.paddingBottom,c.width-c.paddingLeft-c.paddingRight)/2;a._r=Math.min(a._r,a._x-c.paddingLeft);a._lx=0.618*c.width;a.angleStart=-Math.PI/4;a.antiClock=!0;a.items=[];a._currentIndex=-1;f=b.sum();o=0;e.each(b.elements(),function(e,j){q=e.data/f;h=o+q;g=b.getColor(j);a.items.push({start:o,end:h,color:g,color2:d(g).css(),textColor:"#999",labelRight:c.width-50,labelY:50+20*j});o=h;0===j&&(a.angleStart+=q*
Math.PI)})},drawLabels:function(c){var a=this,b=a.data,d=a.items,h,g=b.sum(),q,o,l;c.save();c.textBaseline="middle";c.textAlign="right";b.eachElement(function(b,m){h=d[m];l=h.labelY;o=h.labelRight;c.fillStyle=d[m].color;c.beginPath();c.moveTo(o,l);c.font="15px sans-serif";c.fillRect(o-10,l-5,10,10);c.closePath();c.fillStyle=d[m].textColor;q=e.substitute(a.data.config.labelTemplete,{data:f.format(b.data,b.format),name:b.name,pecent:f.format(100*(b.data/g),"0.00")});c.fillText(q,o-15,l)});c.restore()},
draw:function(c){var a=this,b=a._x,d=a._y,f=a._r,h,g,o,l,j=a.anim.get(),m=a.data.config;1>j&&a.fire("redraw");m.showLabels&&a.drawLabels(c);m.shadow&&(c.save(),c.fillStyle="#fff",c.shadowBlur=10,c.shadowColor="black",c.beginPath(),c.moveTo(b,d),o=a.angleStart,l=a.antiClock?o-2*Math.PI*j:o+2*Math.PI*j,c.arc(b,d,f-1,o,l,a.antiClock),c.fill(),c.restore());c.save();c.lineWidth=0.5;c.strokeStyle="#fff";e.each(a.items,function(e,l){h=e.start*j*2*Math.PI;g=e.end*j*2*Math.PI;c.save();c.fillStyle=l===a._currentIndex?
e.color2:e.color;c.beginPath();e._currentStart=a.antiClock?a.angleStart-h:a.angleStart+h;e._currentEnd=a.antiClock?a.angleStart-g-0.0050:a.angleStart+g+0.0050;if(l===0&&j>=1&&m.firstPieOut){c.moveTo(b+2,d-2);c.arc(b+2,d-2,f,e._currentStart,e._currentEnd,a.antiClock)}else{c.moveTo(b,d);c.arc(b,d,f,e._currentStart,e._currentEnd,a.antiClock)}c.closePath();c.fill();c.stroke();c.restore()});c.restore()},init:function(){h.on(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove,this);h.on(this.chart,f.Chart.MOUSE_LEAVE,
this.chartMouseLeave,this)},destory:function(){h.remove(this.chart,f.Chart.MOUSE_MOVE,this.chartMouseMove);h.remove(this.chart,f.Chart.MOUSE_LEAVE,this.chartMouseLeave)},chartMouseMove:function(c){var a=this._r,b=c.x-this._x,d=c.y-this._y,e,c=this.items;if(b*b+d*d>a*a)this.fire("hidetooltip"),this._currentIndex=-1,this.fire("redraw");else{0!=b?(a=Math.atan(d/b),0>d&&0<b&&(a+=2*Math.PI),0>b&&(a+=Math.PI)):a=0<=d?Math.PI/2:3*Math.PI/2;for(i=c.length-1;0<=i;i--){d=c[i];b=d._currentStart;d=d._currentEnd;
b>d&&(e=b,b=d,d=e);e=d-b;b%=2*Math.PI;if(0>b&&(0>b+e||a>Math.PI))b+=2*Math.PI;a>b&&a<b+e&&i!==this._currentIndex&&(this._currentIndex=i,this.fire("redraw"),this.fire("showtooltip",{message:this.data.elements()[i].label}))}}},chartMouseLeave:function(){this._currentIndex=-1;this.fire("hidetooltip");this.fire("redraw")}});return f.PieElement=g},{requires:["chart/element"]});
KISSY.add("chart/format",function(e){var g=function(e,h){if("string"===typeof h){var d=-1<h.indexOf(","),c=h.split(".");if(1<c.length)e=e.toFixed(c[1].length);else{if(2<c.length)throw"NumberFormatException: invalid format, formats should have no more than 1 period:"+h;e=e.toFixed(0)}var a=e.toString();if(d){for(var c=a.split("."),d=c[0],a=[],b=d.length,g=d.length%3||3,k=0;k<b;k+=g)0!=k&&(g=3),a[a.length]=d.substr(k,g);a=a.join(",");c[1]&&(a+="."+c[1])}return h.replace(/[\d,?\.?]+/,a)}};return e.namespace("Chart").format=
g});KISSY.add("chart/frame",function(e){function g(e,d){this.data=e;this.path=new f.RectPath(d.paddingLeft,d.paddingTop,d.width-d.paddingRight-d.paddingLeft,d.height-d.paddingBottom-d.paddingTop)}var f=e.namespace("Chart");e.augment(g,{draw:function(e){e.save();e.strokeStyle=this.data.config.frameColor;e.lineWidth=2;this.path.draw(e);e.stroke();e.restore()}});return f.Frame=g});
KISSY.add("chart/path",function(e){function g(){}function f(c,a,b,d){this.rect={x:c,y:a,w:b,h:d}}function h(c,a,b,d,e,f){this._arc={x:c,y:a,r:b,b:d,e:e,a:f}}var d=e.namespace("Chart");e.augment(g,{draw:function(){},inpath:function(){}});e.extend(f,g,{draw:function(c){var a=this.rect;c.beginPath();c.rect(a.x,a.y,a.w,a.h)},inpath:function(c,a){var b=this.rect,d=b.x,e=b.y,f=d+b.w,b=e+b.h;return c>d&&c<f&&a>e&&a<b}});e.extend(h,g,{draw:function(c){var a=this._arc;c.beginPath();c.moveTo(a,x,a.y);c.arc(a.x,
a.y,a.r,a.b,a.e,a.a);c.closePath()},inpath:function(c,a,b){if(b)return this.draw(b),b.isPointInPath(c,a);a=this._arc;b=c-a.x;c-=a.y;if(!(Math.pow(b,2)+Math.pow(c,2)<=Math.pow(a.r,2)))return!1;if(0===b){if(0===c)return!1;da=0<c?Math.PI/2:1.5*Math.PI}}});d.Path=g;d.RectPath=f;d.ArcPath=h;return{Path:g,RectPath:f,ArcPath:h}});
KISSY.add("chart/simpletooltip",function(e){function g(){var c=this;this.el_c=h.create("<div class='ks-chart-tooltip'>");this.n_c=e.one(this.el_c);this._offset={left:0,top:0};this.hide();e.ready(function(){document.body.appendChild(c.el_c)});d.on(document.body,"mousedown",this._mousemove,this);d.on(document.body,"mousemove",this._mousemove,this)}var f=e.namespace("Chart"),h=e.DOM,d=e.Event;e.augment(g,{_mousemove:function(c){var a=c.pageX,c=c.pageY;this._show?this._updateOffset(a,c):(this._offset.left=
a,this._offset.top=c)},_updateOffset:function(c,a){c>h.scrollLeft()+h.viewportWidth()-100&&(c-=this.n_c.width()+6);a>h.scrollTop()+h.viewportHeight()-100&&(a-=this.n_c.height()+20);this.n_c.offset({left:c,top:a+12})},show:function(c){this._show=!0;this.n_c.html(c).css("display","block")},hide:function(){this._show=!1;this.n_c.css("display","none")},_init:function(){}});return f.SimpleTooltip=g});
