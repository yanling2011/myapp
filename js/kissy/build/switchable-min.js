/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 3 17:44
*/
KISSY.add("switchable/accordion/aria",function(c,b,h,i,j){function g(a){var d=null;c.each(this.triggers,function(e){if(e==a||b.contains(e,a))d=e});return d}function m(a){var d;c.each(this.panels,function(e){if(e==a||b.contains(e,a))d=e});return d}function k(a){var d=g.call(this,a);d||(a=m.call(this,a),d=this.triggers[c.indexOf(a,this.panels)]);return d}function f(a){switch(a.keyCode){case t:case s:a.ctrlKey&&!a.altKey&&!a.shiftKey&&a.halt();break;case u:a.ctrlKey&&!a.altKey&&a.halt()}}function a(a){var b=
a.target,q=this.triggers,f=!a.ctrlKey&&!a.shiftKey&&!a.altKey,i=a.ctrlKey&&!a.shiftKey&&!a.altKey;switch(a.keyCode){case x:case v:if((b=g.call(this,b))&&f)this.switchTo(c.indexOf(b,this.triggers)),a.halt();break;case p:case n:if(b=g.call(this,b))e.call(this,b),a.halt();break;case y:case A:if(b=g.call(this,b))l.call(this,b),a.halt();break;case s:i&&(a.halt(),b=k.call(this,b),l.call(this,b));break;case t:i&&(a.halt(),b=k.call(this,b),e.call(this,b));break;case o:f&&(k.call(this,b),d.call(this,0,!0),
a.halt());break;case r:f&&(k.call(this,b),d.call(this,q.length-1,!0),a.halt());break;case u:a.ctrlKey&&!a.altKey&&(a.halt(),b=k.call(this,b),a.shiftKey?e.call(this,b):l.call(this,b))}}function d(a,d){var e=this.triggers,l=e[a];c.each(e,function(a){a!==l&&(w(a,"-1"),b.removeClass(a,"ks-switchable-select"),a.setAttribute("aria-selected","false"))});d&&l.focus();w(l,"0");b.addClass(l,"ks-switchable-select");l.setAttribute("aria-selected","true")}function e(a){var e=this.triggers,a=c.indexOf(a,e);d.call(this,
0==a?e.length-1:a-1,!0)}function l(a){var e=this.triggers,a=c.indexOf(a,e);d.call(this,a==e.length-1?0:a+1,!0)}function q(a){var e=!(!a.originalEvent.target&&!a.originalEvent.srcElement),a=a.currentIndex,b=this.panels,l=this.triggers,k=l[a],q=b[a];this.config.multiple||(c.each(b,function(a){a!==q&&a.setAttribute("aria-hidden","true")}),c.each(l,function(a){a!==k&&a.setAttribute("aria-hidden","true")}));b=q.getAttribute("aria-hidden");q.setAttribute("aria-hidden","false"==b?"true":"false");k.setAttribute("aria-expanded",
"false"==b?"false":"true");d.call(this,a,e)}var t=33,s=34,r=35,o=36,p=37,n=38,y=39,A=40,u=9,v=32,x=13;c.mix(j.Config,{aria:!0});j.Plugins.push({name:"aria",init:function(d){if(d.config.aria){var e=d.container,l=d.activeIndex;b.attr(e,"aria-multiselectable",d.config.multiple?"true":"false");d.nav&&b.attr(d.nav,"role","tablist");var k=d.triggers,v=d.panels,n=0;c.each(v,function(a){a.id||(a.id=c.guid("ks-accordion-tab-panel"))});c.each(k,function(a){a.id||(a.id=c.guid("ks-accordion-tab"))});c.each(k,
function(a){a.setAttribute("role","tab");a.setAttribute("aria-expanded",l==n?"true":"false");a.setAttribute("aria-selected",l==n?"true":"false");a.setAttribute("aria-controls",v[n].id);w(a,l==n?"0":"-1");n++});n=0;c.each(v,function(a){var d=k[n];a.setAttribute("role","tabpanel");a.setAttribute("aria-hidden",l==n?"false":"true");a.setAttribute("aria-labelledby",d.id);n++});d.on("switch",q,d);h.on(e,"keydown",a,d);h.on(e,"keypress",f,d)}}});var w=i.setTabIndex},{requires:["dom","event","../aria","./base"]});
KISSY.add("switchable/accordion/base",function(c,b,h){function i(b,c){if(!(this instanceof i))return new i(b,c);i.superclass.constructor.apply(this,arguments)}c.extend(i,h,{_switchTrigger:function(c,g){var h=this.config;h.multiple?b.toggleClass(g,h.activeTriggerCls):i.superclass._switchTrigger.apply(this,arguments)},_triggerIsValid:function(b){return this.config.multiple||i.superclass._triggerIsValid.call(this,b)},_switchView:function(c,g,h){var k=this.config,f=this._getFromToPanels().toPanels;k.multiple?
(b.toggle(f),this._fireOnSwitch(g),h&&h.call(this)):i.superclass._switchView.apply(this,arguments)}});i.Plugins=[];i.Config={markupType:1,triggerType:"click",multiple:!1};return i},{requires:["dom","../base"]});
KISSY.add("switchable/aria",function(c,b,h,i){function j(){this.stop&&this.stop()}function g(){this.start&&this.start()}i.Plugins.push({name:"aria",init:function(b){if(b.config.aria){var c=b.container;h.on(c,"focusin",j,b);h.on(c,"focusout",g,b)}}});var m=["a","input","button","object"];return{setTabIndex:function(k,f){k.tabIndex=f;c.each(b.query("*",k),function(a){var d=a.nodeName.toLowerCase();c.inArray(d,m)&&(b.hasAttr(a,"oriTabIndex")||b.attr(a,"oriTabIndex",a.tabIndex),a.tabIndex=-1!=f?b.attr(a,
"oriTabIndex"):f)})}}},{requires:["dom","event","./base"]});
KISSY.add("switchable/autoplay",function(c,b,h,i,j){var g=c.Env.host,m=function(k){var c=b.scrollTop(),a=b.viewportHeight(),d=b.offset(k),k=b.height(k);return d.top>c&&d.top+k<c+a};c.mix(i.Config,{pauseOnScroll:!1,autoplay:!1,interval:5,pauseOnHover:!0});i.Plugins.push({name:"autoplay",init:function(b){function f(){e=c.later(function(){b.paused||b.next()},d,!0)}var a=b.config,d=1E3*a.interval,e;if(a.autoplay&&(a.pauseOnScroll&&(b.__scrollDetect=c.buffer(function(){b[m(b.container)?"start":"stop"]()},
200),h.on(g,"scroll",b.__scrollDetect)),f(),b.stop=function(){if(e){e.cancel();e=j}b.paused=true},b.start=function(){if(e){e.cancel();e=j}b.paused=false;f()},a.pauseOnHover))h.on(b.container,"mouseenter",b.stop,b),h.on(b.container,"mouseleave",b.start,b)},destroy:function(b){b.__scrollDetect&&h.remove(g,"scroll",b.__scrollDetect)}});return i},{requires:["dom","event","./base"]});
KISSY.add("switchable/autorender",function(c,b,h,i){i.autoRender=function(j,g){c.each(b.query("."+(j||"KS_Widget"),g),function(b){var c=b.getAttribute("data-widget-type"),f;if(c&&-1<"Switchable Tabs Slide Carousel Accordion".indexOf(c))try{(f=b.getAttribute("data-widget-config"))&&(f=f.replace(/'/g,'"')),new ("Switchable"==c?i:i[c])(b,h.parse(f))}catch(a){}})}},{requires:["dom","json","./base"]});
KISSY.add("switchable/base",function(c,b,h,i){function j(a,d){d=d||{};"markupType"in d||(d.panelCls?d.markupType=1:d.panels&&(d.markupType=2));for(var e=this.constructor;e;)d=c.merge(e.Config,d),e=e.superclass?e.superclass.constructor:null;this.container=b.get(a);this.config=d;this.activeIndex=d.activeIndex;var l;-1<this.activeIndex||("number"==typeof d.switchTo?l=d.switchTo:this.activeIndex=0);this._init();this._initPlugins();this.fire(k);l!==i&&this.switchTo(d.switchTo)}function g(a){var b={};b.type=
a.type;b.target=a.target;return{originalEvent:b}}var m=c.makeArray,h=h.Target,k="init",f="removed";j.getDomEvent=g;j.Config={markupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:!0,triggerType:"mouse",delay:0.1,activeIndex:-1,activeTriggerCls:"ks-active",switchTo:i,steps:1,viewSize:[]};j.Plugins=[];c.augment(j,h,{_initPlugins:function(){for(var a=this,b=a.constructor;b;)c.each(b.Plugins,
function(b){b.init&&b.init(a)}),b=b.superclass?b.superclass.constructor:null},_init:function(){var a=this.config;this._parseMarkup();a.hasTriggers&&this._bindTriggers();this._bindPanels()},_parseMarkup:function(){var a=this.container,d=this.config,e,l,c=[],f=[];switch(d.markupType){case 0:(e=b.get("."+d.navCls,a))&&(c=b.children(e));l=b.get("."+d.contentCls,a);f=b.children(l);break;case 1:c=b.query("."+d.triggerCls,a);f=b.query("."+d.panelCls,a);break;case 2:c=d.triggers,f=d.panels}this.length=Math.ceil(f.length/
d.steps);this.nav=e||d.hasTriggers&&c[0]&&c[0].parentNode;if(d.hasTriggers&&(!this.nav||0==c.length))c=this._generateTriggersMarkup(this.length);this.triggers=m(c);this.panels=m(f);this.content=l||f[0].parentNode},_generateTriggersMarkup:function(a){var d=this.config,e=this.nav||b.create("<ul>"),l,c;e.className=d.navCls;for(c=0;c<a;c++)l=b.create("<li>"),c===this.activeIndex&&(l.className=d.activeTriggerCls),l.innerHTML=c+1,e.appendChild(l);this.container.appendChild(e);this.nav=e;return b.children(e)},
_bindTriggers:function(){var a=this,b=a.config,e=c.one(a.nav);c.each(a.triggers,function(b){a._initTrigger(b)});e.delegate("click",".ks-switchable-trigger-internal",function(b){var d=a._getTriggerIndex(b.currentTarget);a._onFocusTrigger(d,b)});"mouse"===b.triggerType&&e.delegate("mouseenter",".ks-switchable-trigger-internal",function(b){var d=a._getTriggerIndex(b.currentTarget);a._onMouseEnterTrigger(d,b)}).delegate("mouseleave",".ks-switchable-trigger-internal",function(){a._onMouseLeaveTrigger()})},
_initTrigger:function(a){b.addClass(a,"ks-switchable-trigger-internal")},_bindPanels:function(){var a=this;c.each(a.panels,function(b){a._initPanel(b)})},_initPanel:function(a){b.addClass(a,"ks-switchable-panel-internal")},_onFocusTrigger:function(a,b){this._triggerIsValid(a)&&(this._cancelSwitchTimer(),this.switchTo(a,i,g(b)))},_onMouseEnterTrigger:function(a,b){var e=this;if(e._triggerIsValid(a)){var l=g(b);e.switchTimer=c.later(function(){e.switchTo(a,i,l)},1E3*e.config.delay)}},_onMouseLeaveTrigger:function(){this._cancelSwitchTimer()},
_triggerIsValid:function(a){return this.activeIndex!==a},_cancelSwitchTimer:function(){this.switchTimer&&(this.switchTimer.cancel(),this.switchTimer=i)},_getTriggerIndex:function(a){return c.indexOf(a,this.triggers)},_resetLength:function(){this.length=this._getLength()},_getLength:function(a){var b=this.config;a===i&&(a=this.panels.length);return Math.ceil(a/b.steps)},_afterAdd:function(a,b){this._resetLength();var e=this._getLength(a+1)-1;1==this.config.steps&&this.activeIndex>=e&&(this.activeIndex+=
1);var c=this.activeIndex;this.activeIndex=-1;this.switchTo(c);b&&this.switchTo(e)},add:function(a){var d=this.nav,e=this.content,c=a.trigger,f=a.panel,g=a.activated,k=this.panels.length,a=null!=a.index?a.index:k,i=this.triggers,o=this.panels,h=this.length,n=null,n=null,a=Math.max(0,Math.min(a,k)),k=o[a];o.splice(a,0,f);k?b.insertBefore(f,k):b.append(f,e);1==this.config.steps?((n=i[a])?b.insertBefore(c,n):b.append(c,d),i.splice(a,0,c)):(n=this._getLength(),n!=h&&(b.append(c,d),i.push(c)));this._initPanel(f);
this._initTrigger(c);this.fire("added",{index:a,trigger:c,panel:f});this._afterAdd(a,g)},remove:function(a){function d(){p&&(b.remove(p),g.splice(a,1));o&&(b.remove(o),1==l?e.triggers.splice(a,1):e.triggers.splice(k-1,1));e._resetLength();e.fire(f,{index:a,trigger:o,panel:p})}var e=this,l=e.config.steps,k=e.length,g=e.panels,h=e._getLength(g.length-1),j=e.triggers,o=null,p=null,a=c.isNumber(a)?Math.max(0,Math.min(a,g.length-1)):c.indexOf(a,g),o=1==l?j[a]:h!==k?j[k-1]:null,p=g[a];!1!==e.fire("beforeRemove",
{index:a,panel:p,trigger:o})&&(0==h?d():(j=e.activeIndex,1!=l?j>=h?e.switchTo(h-1,i,i,d):(d(),e.activeIndex=-1,e.switchTo(j)):e.switchTo(0<j?j-1:j+1,i,i,d)))},switchTo:function(a,b,e,c){var f=this,k=f.config,g=f.activeIndex,h=f.triggers;if(!f._triggerIsValid(a)||!1===f.fire("beforeSwitch",{fromIndex:g,toIndex:a}))return f;f.fromIndex=g;k.hasTriggers&&f._switchTrigger(-1<g?h[g]:null,h[a]);b===i&&(b=a>g?"forward":"backward");f.activeIndex=a;f._switchView(b,e,function(){c&&c.call(f)});return f},_switchTrigger:function(a,
d){var e=this.config.activeTriggerCls;a&&b.removeClass(a,e);b.addClass(d,e)},_getFromToPanels:function(){var a=this.fromIndex,b;b=this.config.steps;var e=this.panels,c=this.activeIndex,a=-1<a?e.slice(a*b,(a+1)*b):null;b=e.slice(c*b,(c+1)*b);return{fromPanels:a,toPanels:b}},_switchView:function(a,d,e){var c=this,f=c._getFromToPanels(),a=f.fromPanels,f=f.toPanels;a&&b.css(a,"display","none");b.css(f,"display","block");setTimeout(function(){c._fireOnSwitch(d)},0);e&&e.call(this)},_fireOnSwitch:function(a){this.fire("switch",
c.merge(a,{fromIndex:this.fromIndex,currentIndex:this.activeIndex}))},prev:function(a){this.switchTo((this.activeIndex-1+this.length)%this.length,"backward",a)},next:function(a){this.switchTo((this.activeIndex+1)%this.length,"forward",a)},destroy:function(){for(var a=this,d=a.constructor;d;)c.each(d.Plugins,function(b){b.destroy&&b.destroy(a)}),d=d.superclass?d.superclass.constructor:null;b.remove(a.container);a.nav=null;a.content=null;a.container=null;a.triggers=[];a.panels=[];a.detach()}});return j},
{requires:["dom","event"]});
KISSY.add("switchable/carousel/aria",function(c,b,h,i,j){function g(a){var b=a.currentIndex,d=this.activeIndex,e=this.panels,f=e[b*this.config.steps],n=this.triggers,b=n[b];if((a=!(!a.originalEvent.target&&!a.originalEvent.srcElement))||-1==d)c.each(n,function(a){o(a,-1)}),c.each(e,function(a){o(a,-1)}),b&&o(b,0),o(f,0),a&&f.focus()}function m(a){var e=null;c.each(this.triggers,function(d){if(d==a||b.contains(d,a))return e=d,!1});return e}function k(a){var d=a.target;switch(a.keyCode){case t:case q:if(d=m.call(this,
d)){var f=b.next(d),n=this.triggers;f||(f=n[0]);o(d,-1);f&&(o(f,0),f.focus());a.halt()}break;case l:case e:if(d=m.call(this,d))f=b.prev(d),n=this.triggers,f||(f=n[n.length-1]),o(d,-1),f&&(o(f,0),f.focus()),a.halt();break;case r:case s:if(d=m.call(this,d))this.switchTo(c.indexOf(d,this.triggers),void 0,p),a.halt()}}function f(a){var d=null;c.each(this.panels,function(e){if(e==a||b.contains(e,a))return d=e,!1});return d}function a(a,b){var d=c.indexOf(a,this.panels),e=this.config.steps,f=Math.floor(d/
e);return f==this.activeIndex?1:0==d%e||d%e==e-1?(this.switchTo(f,b,p),0):1}function d(d){var c=d.target;switch(d.keyCode){case t:case q:if(c=f.call(this,c)){var g=b.next(c),k=this.panels;g||(g=k[0]);o(c,-1);o(g,0);a.call(this,g,n)&&g.focus();d.halt()}break;case l:case e:if(c=f.call(this,c))g=b.prev(c),k=this.panels,g||(g=k[k.length-1]),o(c,-1),o(g,0),a.call(this,g,y)&&g.focus(),d.halt();break;case r:case s:if(c=f.call(this,c))this.fire("itemSelected",{item:c}),d.halt()}}var e=37,l=38,q=39,t=40,s=
32,r=13,o=i.setTabIndex,p={originalEvent:{target:1}},n="forward",y="backward";c.mix(j.Config,{aria:!1});j.Plugins.push({name:"aria",init:function(a){if(a.config.aria){var b=a.triggers,e=a.panels,f=a.content,n=a.activeIndex;f.id||(f.id=c.guid("ks-switchbale-content"));f.setAttribute("role","listbox");var l=0;c.each(b,function(a){o(a,n==l?"0":"-1");a.setAttribute("role","button");a.setAttribute("aria-controls",f.id);l++});l=0;c.each(e,function(a){o(a,"-1");a.setAttribute("role","option");l++});a.on("switch",
g,a);if(b=a.nav)h.on(b,"keydown",k,a);h.on(f,"keydown",d,a);b=a.prevBtn;e=a.nextBtn;b&&(o(b,0),b.setAttribute("role","button"),h.on(b,"keydown",function(b){if(b.keyCode==r||b.keyCode==s){a.prev(p);b.preventDefault()}}));e&&(o(e,0),e.setAttribute("role","button"),h.on(e,"keydown",function(b){if(b.keyCode==r||b.keyCode==s){a.next(p);b.preventDefault()}}))}}})},{requires:["dom","event","../aria","./base"]});
KISSY.add("switchable/carousel/base",function(c,b,h,i){function j(b,a){if(!(this instanceof j))return new j(b,a);j.superclass.constructor.apply(this,arguments)}var g="prevBtn",m="nextBtn",k={originalEvent:{target:1}};j.Config={circular:!0,prevBtnCls:"ks-switchable-prev-btn",nextBtnCls:"ks-switchable-next-btn",disableBtnCls:"ks-switchable-disable-btn"};j.Plugins=[];c.extend(j,i,{_init:function(){function f(d){b.removeClass([a[g],a[m]],e);0==d&&b.addClass(a[g],e);d==a.length-1&&b.addClass(a[m],e)}var a=
this;j.superclass._init.call(a);var d=a.config,e=d.disableBtnCls;c.each(["prev","next"],function(e){var c=a[e+"Btn"]=b.get("."+d[e+"BtnCls"],a.container);h.on(c,"mousedown",function(b){b.preventDefault();b=a.activeIndex;if("prev"==e&&(0!=b||d.circular))a[e](k);if("next"==e&&(b!=a.length-1||d.circular))a[e](k)})});d.circular||(a.on("added removed",function(){f(a.activeIndex)}),a.on("switch",function(a){f(a.currentIndex)}));h.delegate(a.content,"click",".ks-switchable-panel-internal",function(b){a.fire("itemSelected",
{item:b.currentTarget})})}});return j},{requires:["dom","event","../base"]});
KISSY.add("switchable/circular",function(c,b,h,i){function j(e,c){var f=this,k=f.fromIndex,n=f.config,i=f.length,j=n.scrollType===t,u=j?a:d,v=f.activeIndex,x=f.viewSize[j?0:1],j=-x*v,w=f.panels,D=f.config.steps,B={},C,z=c===q;C=z&&0===k&&v===i-1||!z&&k===i-1&&0===v;f.anim&&(f.anim.stop(),"relative"==w[k*D].style.position&&m.call(f,w,k,u,x,1));C&&(j=g.call(f,w,z,u,x));B[u]=j+l;-1<k?f.anim=(new h(f.content,B,n.duration,n.easing,function(){C&&m.call(f,w,z,u,x,1);f.anim=void 0;e&&e()})).run():(b.css(f.content,
B),e&&e())}function g(a,d,e,c){var n=this.config.steps,g=this.length,i=d?g-1:0,a=a.slice(i*n,(i+1)*n);b.css(a,k,f);b.css(a,e,(d?-1:1)*c*g);return d?c:-c*g}function m(a,d,c,f,n){var g=this.config.steps,i=this.length,h=d?i-1:0,a=a.slice(h*g,(h+1)*g);b.css(a,k,e);b.css(a,c,e);n&&b.css(this.content,c,d?-f*(i-1):e)}var k="position",f="relative",a="left",d="top",e="",l="px",q="backward",t="scrollx";c.mix(i.Config,{circular:!1});i.adjustPosition=g;i.resetPosition=m;i.Plugins.push({name:"circular",init:function(a){a=
a.config;if(a.circular&&(a.effect===t||"scrolly"===a.effect))a.scrollType=a.effect,a.effect=j}})},{requires:["dom","anim","./base","./effect"]});
KISSY.add("switchable/effect",function(c,b,h,i,j,g){var m;c.mix(j.Config,{effect:"none",duration:0.5,easing:"easeNone"});j.Effects={none:function(c){var f=this._getFromToPanels(),a=f.fromPanels,f=f.toPanels;a&&b.css(a,"display","none");b.css(f,"display","block");c&&c()},fade:function(c){var f=this,a=f._getFromToPanels(),d=a.fromPanels,e=f.config,h=d?d[0]:null,j=a.toPanels[0];f.anim&&(f.anim.stop(),b.css(f.anim.fromEl,{zIndex:1,opacity:0}),b.css(f.anim.toEl,"zIndex",9));b.css(j,"opacity",1);h?(f.anim=
(new i(h,{opacity:0},e.duration,e.easing,function(){f.anim=g;b.css(j,"z-index",9);b.css(h,"z-index",1);c&&c()})).run(),f.anim.toEl=j,f.anim.fromEl=h):(b.css(j,"z-index",9),c&&c())},scroll:function(c,f){var a=this,d=a.fromIndex,e=a.config,h="scrollx"===e.effect,j={};j[h?"left":"top"]=-(a.viewSize[h?0:1]*a.activeIndex)+"px";a.anim&&a.anim.stop();f||-1<d?a.anim=(new i(a.content,j,e.duration,e.easing,function(){a.anim=g;c&&c()})).run():(b.css(a.content,j),c&&c())}};m=j.Effects;m.scrollx=m.scrolly=m.scroll;
j.Plugins.push({name:"effect",init:function(g){var f=g.config,a=f.effect,d=g.panels,e=g.content,h=f.steps,i=d[0],j=g.activeIndex;if("none"!==a)switch(b.css(d,"display","block"),a){case "scrollx":case "scrolly":b.css(e,"position","absolute");"static"==b.css(e.parentNode,"position")&&b.css(e.parentNode,"position","relative");"scrollx"===a&&(b.css(d,"float","left"),b.width(e,"9999px"));g.viewSize=[f.viewSize[0]||i&&i.offsetWidth*h,f.viewSize[1]||i&&i.offsetHeight*h];break;case "fade":var m=j*h,r=m+h-
1,o;c.each(d,function(a,d){o=d>=m&&d<=r;b.css(a,{opacity:o?1:0,position:"absolute",zIndex:o?9:1})})}}});c.augment(j,{_switchView:function(b,f,a){var d=this,e=d.config.effect;(c.isFunction(e)?e:m[e]).call(d,function(){d._fireOnSwitch(f);a&&a.call(d)},b)}});return j},{requires:["dom","event","anim","./base"]});
KISSY.add("switchable/lazyload",function(c,b,h){var i="beforeSwitch",j="img",g="textarea",m={};m[j]="lazyImgAttribute";m[g]="lazyTextareaClass";c.mix(h.Config,{lazyImgAttribute:"data-ks-lazyload-custom",lazyTextareaClass:"ks-datalazyload-custom",lazyDataType:g});h.Plugins.push({name:"lazyload",init:function(h){function f(c){var m=d.steps,c=c.toIndex*m;a.loadCustomLazyData(h.panels.slice(c,c+m),e,l);a:{var s,r,o;if(c=(m=e===j)?"img":e===g?"textarea":""){c=b.query(c,h.container);s=0;for(o=c.length;s<
o;s++)if(r=c[s],m?b.attr(r,l):b.hasClass(r,l)){m=!1;break a}}m=!0}m&&h.detach(i,f)}var a=c.require("datalazyload"),d=h.config,e,l;"img-src"===d.lazyDataType&&(d.lazyDataType=j);"area-data"===d.lazyDataType&&(d.lazyDataType=g);e=d.lazyDataType;l=d[m[e]];if(a&&e&&l)h.on(i,f)}});return h},{requires:["dom","./base"]});
KISSY.add("switchable/slide/base",function(c,b){function h(b,c){if(!(this instanceof h))return new h(b,c);h.superclass.constructor.apply(this,arguments)}h.Config={autoplay:!0,circular:!0};h.Plugins=[];c.extend(h,b);return h},{requires:["../base"]});KISSY.add("switchable",function(c,b,h,i,j,g,m,k,f,a,d,e,l,q){c.mix(b,{Accordion:i,Carousel:k,Slide:l,Tabs:q,Aria:h});return b},{requires:"switchable/base,switchable/aria,switchable/accordion/base,switchable/accordion/aria,switchable/autoplay,switchable/autorender,switchable/carousel/base,switchable/carousel/aria,switchable/circular,switchable/effect,switchable/lazyload,switchable/slide/base,switchable/tabs/base,switchable/tabs/aria".split(",")});
KISSY.add("switchable/tabs/aria",function(c,b,h,i,j,g){function m(a){var d=null;c.each(this.triggers,function(c){if(c==a||b.contains(c,a))d=c});return d}function k(a){switch(a.keyCode){case d:case e:a.ctrlKey&&!a.altKey&&!a.shiftKey&&a.halt();break;case r:a.ctrlKey&&!a.altKey&&a.halt()}}function f(a){var b=a.target,c=a.ctrlKey&&!a.shiftKey&&!a.altKey;switch(a.keyCode){case l:case q:m.call(this,b)&&(this.prev(p(a)),a.halt());break;case t:case s:m.call(this,b)&&(this.next(p(a)),a.halt());break;case e:c&&
(a.halt(),this.next(p(a)));break;case d:c&&(a.halt(),this.prev(p(a)));break;case r:a.ctrlKey&&!a.altKey&&(a.halt(),a.shiftKey?this.prev(p(a)):this.next(p(a)))}}function a(a){var b=!(!a.originalEvent.target&&!a.originalEvent.srcElement),c=a.fromIndex,d=a.currentIndex;if(c!=d){var a=this.triggers[c],e=this.triggers[d],c=this.panels[c],d=this.panels[d];a&&o(a,"-1");o(e,"0");b&&e.focus();c&&c.setAttribute("aria-hidden","true");d.setAttribute("aria-hidden","false")}}var d=33,e=34,l=37,q=38,t=39,s=40,r=
9;c.mix(g.Config,{aria:!0});g.Plugins.push({name:"aria",init:function(d){function e(a){a.setAttribute("role","tab");o(a,"-1");a.id||(a.id=c.guid("ks-switchable"))}function g(a,b){a.setAttribute("role","tabpanel");a.setAttribute("aria-hidden","true");a.setAttribute("aria-labelledby",b.id)}if(d.config.aria){var i=d.triggers,j=d.activeIndex,l=d.panels,m=d.container;d.nav&&b.attr(d.nav,"role","tablist");var p=0;c.each(i,e);d.on("added",function(a){var b;e(b=a.trigger);g(a.panel,b)});p=0;c.each(l,function(a){g(a,
i[p]);p++});-1<j&&(o(i[j],"0"),l[j].setAttribute("aria-hidden","false"));d.on("switch",a,d);h.on(m,"keydown",f,d);h.on(m,"keypress",k,d)}}});var o=j.setTabIndex,p=i.getDomEvent},{requires:["dom","event","../base","../aria","./base"]});KISSY.add("switchable/tabs/base",function(c,b){function h(b,c){if(!(this instanceof h))return new h(b,c);h.superclass.constructor.call(this,b,c);return 0}c.extend(h,b);h.Config={};h.Plugins=[];return h},{requires:["../base"]});
KISSY.add("switchable/touch",function(c,b,h,i,j){c.mix(i.Config,{mouseAsTouch:!1});i.Plugins.push({name:"touch",init:function(g){var m=g.config,k=m.scrollType||m.effect;if("scrolly"==k||"scrollx"==k){var f=g.content,a=g.container,d,e=m.mouseAsTouch,l,q=0,t=0,s={},r={},o="left",p,n;"scrolly"==k&&(o="top");var y=function(){if("relative"!=g.panels[g.activeIndex].style.position){g.stop&&g.stop();t=1;s=b.offset(f);var d=b.offset(a);d.bottom=d.top+a.offsetHeight;d.right=d.left+a.offsetWidth;r=d}},A=function(a){if(t){var c=
-1!=a.type.indexOf("touch")?a.originalEvent.changedTouches[0]:a,e={};"scrolly"==k?(n=g.viewSize[1],p=c.pageY-l,e.top=s.top+p,c=c.pageY>=r.top&&c.pageY<=r.bottom):(n=g.viewSize[0],p=c.pageX-d,e.left=s.left+p,c=c.pageX>=r.left&&c.pageX<=r.right);if(q||3<Math.abs(p))(-1!=a.type.indexOf("touch")&&a.preventDefault(),g.anim&&(g.anim.stop(),g.anim=j),c)?(q||(q=1,m.circular&&(a=g.activeIndex,a==g.length-1?i.adjustPosition.call(g,g.panels,!1,o,n):0==a&&i.adjustPosition.call(g,g.panels,!0,o,n))),b.offset(f,
e)):u()}},u=function(){if(q){t=q=0;var a=g.activeIndex,b=g.length-1;!m.circular&&(0>p&&a==b||0<p&&0==a)?i.Effects[k].call(g,j,!0):(0>p&&a==b||0<p&&0==a||(0==a||a==b)&&i.resetPosition.call(g,g.panels,0==a,o,n),g[0>p?"next":"prev"](),g.start&&g.start())}};h.on(f,"touchstart",function(a){y();d=a.pageX;l=a.pageY});h.on(f,"touchmove",A);h.on(f,"touchend",u);e&&!("ontouchstart"in c.Env.host.document.documentElement)&&c.use("dd",function(a,b){var c=new b.Draggable({node:f});c.on("dragstart",function(){y();
d=c.startMousePos.left;l=c.startMousePos.top});c.on("drag",A);c.on("dragend",u);g.__touchDD=c})}},destroy:function(b){var c;(c=b.__touchDD)&&c.destroy()}})},{requires:["dom","event","./base"]});