/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 2 10:12
*/
KISSY.add("flash/base",function(){return{swfs:{},length:0,version:"1.3"}});
KISSY.add("flash/embed",function(e,i,k,d,o){function j(a,b){return h+a+n+q+b+q}function m(a,b){return'<param name="'+a+'" value="'+b+'" />'}var p=/^(?:object|embed)/i,h=" ",n="=",q='"',r=Object.prototype,s=encodeURIComponent,t={wmode:"",allowscriptaccess:"",allownetworking:"",allowfullscreen:"",play:"false",loop:"",menu:"",quality:"",scale:"",salign:"",bgcolor:"",devicefont:"",hasPriority:"",base:"",swliveconnect:"",seamlesstabbing:""},u={params:{},attrs:{width:215,height:138},version:9};e.mix(d,
{fpv:i.fpv,fpvGEQ:i.fpvGEQ,add:function(a,b,c){var l,g,f,h,b=d._normalize(b),b=e.merge(u,b);b.attrs=e.merge(u.attrs,b.attrs);g=e.isString(a)?a.replace("#",""):a;if(!(a=k.get(a)))a=k.create("<div id="+g+"/>"),k.prepend(a,e.Env.host.document.body);h=a.nodeName.toLowerCase();f=!p.test(h);a.id||(a.id=e.guid("ks-flash-container-"));g=a.id;b.id||(b.id=e.guid("ks-flash-"));b.attrs.id=b.id;if(i.fpv()){if(!i.fpvGEQ(b.version)){d._callback(c,0,g,a,f);if(!(l=b.xi)||!e.isString(l))return;b.src=l}if(f)b.src?d._embed(a,
b,c):d._callback(c,-3,g,a,f);else{if("object"==h&&(i.gecko||i.opera||7<i.chrome))a=k.query("object",a)[0]||a;b.attrs.id=g;d._register(a,b,c,f)}}else d._callback(c,-1,g,a,f)},get:function(a){a=e.isString(a)?a.replace("#",""):a;return d.swfs[a]},remove:function(a){if(a=d.get(a))k.remove(a),delete d.swfs[a.id],d.length-=1},contains:function(a){var b=d.swfs,c,l=!1;if(e.isString(a))l=a in b;else for(c in b)if(b[c]===a){l=!0;break}return l},_register:function(a,b,c,l){b=b.attrs.id;d._addSWF(b,a);d._callback(c,
1,b,a,l)},_embed:function(a,b,c){a.innerHTML=d._stringSWF(b);a=k.get("#"+b.id);d._register(a,b,c,!0)},_callback:function(a,b,c,d,g){b&&e.isFunction(a)&&a({status:b,id:c,swf:d,dynamic:!!g})},_addSWF:function(a,b){a&&b&&(d.swfs[a]=b,d.length+=1)},_stringSWF:function(a){var b,c=b="",h=a.src,g=a.attrs,a=a.params,f,e;if(i.ie){e="object";for(f in g)g[f]!=r[f]&&"classid"!=f&&"data"!=f&&(b+=j(f,g[f]));b+=j("classid","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");for(f in a)f in t&&(c+=m(f,a[f]));c+=m("movie",
h);a.flashvars&&(c+=m("flashvars",d.toFlashVars(a.flashvars)));b="<"+e+b+">"+c+"</"+e+">"}else{e="embed";b+=j("src",h);for(f in g)g[f]!=r[f]&&"classid"!=f&&"data"!=f&&(b+=j(f,g[f]));b+=j("type","application/x-shockwave-flash");for(f in a)f in t&&(c+=j(f,a[f]));a.flashvars&&(c+=j("flashvars",d.toFlashVars(a.flashvars)));b="<"+e+b+c+"/>"}return b},_normalize:function(a){var b,c,h,g=a||{};if(e.isPlainObject(a))for(h in g={},a)b=h.toLowerCase(),c=a[h],"flashvars"!==b&&(c=d._normalize(c)),g[b]=c;return g},
toFlashVars:function(a){if(!e.isPlainObject(a))return"";var b,c,d=[];for(b in a){c=a[b];if(e.isString(c))c=s(c);else{c=o.stringify(c);if(!c)continue;c=c.replace(/:"([^"]+)/g,function(a,b){return':"'+s(b)})}d.push(b+"="+c)}return d.join("&").replace(/"/g,"'")}});return d},{requires:["ua","dom","./base","json","./ua"]});KISSY.add("flash",function(e,i){return i},{requires:["flash/base","flash/embed"]});
KISSY.add("flash/ua",function(e,i){function k(h){var n=e.isString(h)?h.match(/(\d)+/g).splice(0,3):h;e.isArray(n)&&(h=parseFloat(n[0]+"."+d(n[1],3)+d(n[2],5)));return h||0}function d(d,e){for(var i=(d+"").length;i++<e;)d="0"+d;return d}var o,j,m=!0,p=e.Env.host;i.fpv=function(d){if(d||m){m=!1;var e;if(navigator.plugins&&navigator.mimeTypes.length)e=(navigator.plugins["Shockwave Flash"]||0).description;else if(p.ActiveXObject)try{e=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(i){}o=
!e?void 0:e.match(/(\d)+/g).splice(0,3);j=k(o)}return o};i.fpvGEQ=function(d,e){m&&i.fpv(e);return!!j&&j>=k(d)}},{requires:["ua"]});
