/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 2 10:12
*/
KISSY.add("htmlparser/Parser",function(a,h,c,k,b,j,i,m){function g(d,e){this.originalHtml=d=a.trim(d);d=/^(<!doctype|<html|<body)/i.test(d)?"<document>"+d+"</document>":"<body>"+d+"</body>";this.lexer=new j(d);this.opts=e||{}}function l(d){var e=n(d,"body",3);if(e){var d=e.parentNode,f=d.childNodes,g=a.indexOf(e,f);if(g!=f.length-1){f=f.slice(g+1,f.length);for(g=0;g<f.length;g++)d.removeChild(f[g]),"body"==f[g].tagName?a.each(f[g].childNodes,function(d){e.appendChild(d)}):e.appendChild(f[g])}}return e}
function e(e){var f=e.childNodes,g,n,a=h.p,b=0;for(n=0;n<f.length;n++)if(g=f[n],3==g.nodeType||1==g.nodeType&&a[g.nodeName]){b=1;break}if(b){var b=[],j=new c;j.nodeName=j.tagName="p";for(n=0;n<f.length;n++)g=f[n],3==g.nodeType||1==g.nodeType&&a[g.nodeName]?j.appendChild(g):(j.childNodes.length&&(b.push(j),j=j.clone()),b.push(g));j.childNodes.length&&b.push(j);e.empty();for(n=0;n<b.length;n++)e.appendChild(b[n])}}function n(e,f,g){if(0===g)return 0;a.isNumber(g)&&g--;var b=e.childNodes;if(b)for(var j=
0;j<b.length;j++){if(b[j].tagName===f)return b[j];if(e=n(b[j],f,g))return e}return 0}function f(e){for(var f=[].concat(e.childNodes),g=0;g<f.length;g++)if("html"==f[g].nodeName){for(var n=f[g],b=0;b<g;b++)3==f[b].nodeType&&!a.trim(f[b].toHtml())&&e.removeChild(f[b]);for(;n.firstChild&&3==n.firstChild.nodeType&&!a.trim(n.firstChild.toHtml());)n.removeChild(n.firstChild);break}}g.prototype={elements:function(){var d,g,n=this.lexer,b=this.opts;g=d=n.nextNode();"document"!=d.tagName&&(g=new i,g.appendChild(d));
g.nodeType=9;m.getScanner("div").scan(d,n,b);(d=l(g))&&b.autoParagraph&&e(d);f(g);var b=this.originalHtml,j=new k;g=/^(<!doctype|<html|<body)/i.test(b)?g.childNodes:d.childNodes;a.each(g,function(e){j.appendChild(e)});return j},parse:function(){return this.elements()}};return g},{requires:"./dtd,./nodes/Tag,./nodes/Fragment,./lexer/Cursor,./lexer/Lexer,./nodes/Document,./Scanner".split(",")});
KISSY.add("htmlparser/Scanner",function(a,h,c){return{getScanner:function(a){return c[a]||h}}},{requires:["./scanners/TagScanner","./scanners/SpecialScanners","./scanners/QuoteCdataScanner","./scanners/TextareaScanner"]});
KISSY.add("htmlparser/Utils",function(){return{collapseWhitespace:function(a){return a.replace(/[\s\xa0]+/g," ")},isLetter:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a},isValidAttributeNameStartChar:function(a){return!this.isWhitespace(a)&&'"'!=a&&"'"!=a&&">"!=a&&"<"!=a&&"/"!=a&&"="!=a},isWhitespace:function(a){return/^[\s\xa0]$/.test(a)}}});
KISSY.add("htmlparser/dtd",function(a){var a=a.merge,h={isindex:1,fieldset:1},c={input:1,button:1,select:1,textarea:1,label:1},k=a({a:1},c),b=a({iframe:1},k),j={hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1},i={ins:1,del:1,script:1,style:1},m=a({b:1,acronym:1,bdo:1,"var":1,"#":1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1},i),g=a({sub:1,img:1,object:1,sup:1,
basefont:1,map:1,applet:1,font:1,big:1,small:1},m),l=a({p:1},g),c=a({iframe:1},g,c),g={img:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,"#":1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,"var":1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,
address:1,q:1,pre:1,p:1,em:1,dfn:1},e=a({a:1},c),n={tr:1},f={"#":1},d=a({param:1},g),q=a({form:1},h,b,j,l),s={li:1},p={base:1,link:1,meta:1,title:1},o=a(p,{style:1,script:1}),t={head:1,body:1},r={address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1},a={$nonBodyContent:a({html:1},t,p),$block:r,$blockLimit:{body:1,div:1,td:1,th:1,caption:1,form:1},$inline:e,$body:a({script:1,style:1},r),$cdata:{script:1,
style:1},$empty:{area:1,base:1,br:1,col:1,hr:1,img:1,input:1,link:1,meta:1,param:1},$listItem:{dd:1,dt:1,li:1},$list:{ul:1,ol:1,dl:1},$nonEditable:{applet:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,script:1,textarea:1,param:1},$removeEmpty:{abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},
$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},html:t,head:o,style:f,body:q,base:{},link:{},meta:{},title:f,col:{},tr:{td:1,th:1},img:{},colgroup:{col:1},noscript:q,td:q,br:{},th:q,center:q,kbd:e,button:a(l,j),basefont:{},h5:e,h4:e,samp:e,h6:e,ol:s,h1:e,h3:e,option:f,h2:e,form:a(h,b,j,l),select:{optgroup:1,option:1},font:e,ins:e,menu:s,abbr:e,label:e,table:{thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1},code:e,script:f,tfoot:n,cite:e,li:q,input:{},iframe:q,
strong:e,textarea:f,noframes:q,big:e,small:e,span:e,hr:{},dt:e,sub:e,optgroup:{option:1},param:{},bdo:e,"var":e,div:q,object:d,sup:e,dd:q,strike:e,area:{},dir:s,map:a({area:1,form:1,p:1},h,i,j),applet:d,dl:{dt:1,dd:1},del:e,isindex:{},fieldset:a({legend:1},g),thead:n,ul:s,acronym:e,b:e,a:c,blockquote:q,caption:e,i:e,u:e,tbody:n,s:e,address:a(b,l),tt:e,legend:e,q:e,pre:a(m,k),p:e,em:e,dfn:e},k="article,figure,nav,aside,section,footer".split(","),u;for(u in a)for(var v in a[u])if("div"==v)for(h=0;h<
k.length;h++)a[u][k[h]]=a[u][v];for(h=0;h<k.length;h++)a[k[h]]=a.div;a.$empty["!doctype"]=1;return a});KISSY.add("htmlparser",function(a,h,c,k,b,j,i,m,g,l,e,n,f){return{CData:g,Comment:l,Node:e,Tag:n,Text:f,Lexer:c,Parser:k,BasicWriter:b,BeautifyWriter:j,MinifyWriter:i,Filter:m,DTD:h}},{requires:"htmlparser/dtd,htmlparser/lexer/Lexer,htmlparser/Parser,htmlparser/writer/basic,htmlparser/writer/beautify,htmlparser/writer/minify,htmlparser/writer/filter,htmlparser/nodes/CData,htmlparser/nodes/Comment,htmlparser/nodes/Node,htmlparser/nodes/Tag,htmlparser/nodes/Text".split(",")});
KISSY.add("htmlparser/lexer/Cursor",function(){function a(a){this.position=a||0}a.prototype={advance:function(){this.position++},retreat:function(){this.position=Math.max(--this.position,0)}};return a});
KISSY.add("htmlparser/lexer/Index",function(){function a(){this.lineCursors=[]}function h(a,b){for(var j=0;j<a.length;j++)if(a[j].position===b.position)return j;return-1}function c(a,b){for(var j=0;j<a.length&&!(a[j].position>b.position);j++);return j}a.prototype={add:function(a){-1==h(this.lineCursors,a)&&this.lineCursors.splice(c(this.lineCursors,a),0,a)},remove:function(a){var b=this.lineCursors,a=h(this.lineCursors,a);-1!=a&&b.splice(a,1)},row:function(a){return c(this.lineCursors,a)-1},col:function(a){var b=
c(this.lineCursors,a)-1;return a.position-this.lineCursors[b]}};return a});
KISSY.add("htmlparser/lexer/Lexer",function(a,h,c,k,b,j,i,m,g){function l(e){this.page=new c(e);this.cursor=new h;this.nodeFactory=this}l.prototype={setPosition:function(e){this.cursor.position=e},getPosition:function(){return this.cursor.position},nextNode:function(e){var g,f,d=this.cursor,a=this.page;g=d.position;f=a.getChar(d);switch(f){case -1:e=null;break;case "<":f=a.getChar(d);-1==f?e=this.makeString(g,d.position):"/"==f||j.isLetter(f)?(a.ungetChar(d),e=this.parseTag(g)):"!"==f||"?"==f?(f=
a.getChar(d),-1==f?e=this.makeString(g,d.position):">"==f?e=this.makeComment(g,d.position):(a.ungetChar(d),"-"==f?e=this.parseComment(g,e):(a.ungetChar(d),e=this.parseTag(g)))):(a.ungetChar(d),e=this.parseString(g,e));break;default:a.ungetChar(d),e=this.parseString(g,e)}return e},makeComment:function(e,g){var f;f=g-e;if(0!=f){if(2>f)return this.makeString(e,g);f=this.nodeFactory.createCommentNode(this.page,e,g)}else f=null;return f},makeString:function(e,g){var f=null;0<g-e&&(f=this.nodeFactory.createStringNode(this.page,
e,g));return f},makeCData:function(e,g){var f=null;0<g-e&&(f=this.nodeFactory.createCDataNode(this.page,e,g));return f},makeTag:function(e,g,f){var d;d=g-e;if(0!=d){if(2>d)return this.makeString(e,g);e=this.nodeFactory.createTagNode(this.page,e,g,f)}else e=null;return e},createTagNode:function(e,g,f,d){return new m(e,g,f,d)},createStringNode:function(e,g,f){return new k(e,g,f)},createCDataNode:function(e,g,f){return new b(e,g,f)},createCommentNode:function(e,a,f){return new g(e,a,f)},parseTag:function(e){var g,
f=[],d=[],a,b=this.page,l=0,c=this.cursor;for(f[0]=c.position;!g;)switch(f[l+1]=c.position,a=b.getChar(c),l){case 0:if(-1==a||">"==a||"<"==a)"<"==a&&(b.ungetChar(c),f[l+1]=c.position),g=!0;else if("/"==a||j.isValidAttributeNameStartChar(a))l=1;break;case 1:-1==a||">"==a||"<"==a?("<"==a&&(b.ungetChar(c),f[l+1]=c.getPosition),this.standalone(d,f),g=!0):j.isWhitespace(a)?(f[6]=f[2],l=6):"="==a&&(l=2);break;case 2:-1==a||">"==a?(this.standalone(d,f),g=!0):"'"==a?(l=4,f[4]=f[3]):'"'==a?(l=5,f[5]=f[3]):
j.isWhitespace(a)||(l=3);break;case 3:-1==a||">"==a?(this.naked(d,f),g=!0):j.isWhitespace(a)&&(this.naked(d,f),f[0]=f[4],l=0);break;case 4:-1==a?(this.single_quote(d,f),g=!0):"'"==a&&(this.single_quote(d,f),f[0]=f[5]+1,l=0);break;case 5:-1==a?(this.double_quote(d,f),g=!0):'"'==a&&(this.double_quote(d,f),f[0]=f[6]+1,l=0);break;case 6:-1==a?(this.standalone(d,f),f[0]=f[6],b.ungetChar(c),l=0):j.isWhitespace(a)||("="==a?(f[2]=f[6],f[3]=f[7],l=2):(this.standalone(d,f),f[0]=f[6],b.ungetChar(c),l=0));break;
default:throw Error("how ** did we get in state "+l);}return this.makeTag(e,c.position,d)},parseComment:function(g,a){var f,d,b=this.page,l=this.cursor,c;f=!1;for(c=0;!f;)if(d=b.getChar(l),-1==d)f=!0;else switch(c){case 0:">"==d&&(f=!0);if("-"==d)c=1;else return this.parseString(g,a);break;case 1:if("-"==d)d=b.getChar(l),-1==d?f=!0:">"==d?f=!0:(b.ungetChar(l),c=2);else return this.parseString(g,a);break;case 2:if("-"==d)c=3;else if(-1==d)return this.parseString(g,a);break;case 3:c="-"==d?4:2;break;
case 4:">"==d?f=!0:j.isWhitespace(d)||(c=2);break;default:throw Error("how ** did we get in state "+c);}return this.makeComment(g,l.position)},parseString:function(g,a){for(var f=0,d,b=this.page,l=this.cursor,c=0;!f;)if(d=b.getChar(l),-1==d)f=1;else if(a&&0==c&&("'"==d||'"'==d))c=d;else if(a&&0!=c&&"\\"==d)d=b.getChar(l),-1!=d&&"\\"!=d&&d!=c&&b.ungetChar(l);else if(a&&d==c)c=0;else if(a&&0==c&&"/"==d)if(d=b.getChar(l),-1==d)f=1;else if("/"==d){do d=b.getChar(l);while(-1!=d&&"\n"!=d)}else if("*"==
d){do{do d=b.getChar(l);while(-1!=d&&"*"!=d);d=b.getChar(l);"*"==d&&b.ungetChar(l)}while(-1!=d&&"/"!=d)}else b.ungetChar(l);else if(0==c&&"<"==d)if(d=b.getChar(l),-1==d)f=1;else{if("/"==d||j.isLetter(d)||"!"==d||"?"==d)f=1,b.ungetChar(l);b.ungetChar(l)}return this.makeString(g,l.position)},parseCDATA:function(g,a){var f,d,b,l,c,h,k=this.cursor,i=this.page;f=k.position;d=0;b=!1;l="";for(h=!1;!b;)switch(c=i.getChar(k),d){case 0:switch(c){case -1:b=!0;break;case "'":g&&!h&&(""==l?l="'":"'"==l&&(l=""));
break;case '"':g&&!h&&(""==l?l='"':'"'==l&&(l=""));break;case "\\":g&&""!=l&&(c=i.getChar(k),-1==c?b=!0:"\\"!=c&&c!=l&&i.ungetChar(k));break;case "/":if(g&&""==l)if(c=i.getChar(k),-1==c)b=!0;else if("/"==c)h=!0;else if("*"==c){do{do c=i.getChar(k);while(-1!=c&&"*"!=c);c=i.getChar(k);"*"==c&&i.ungetChar(k)}while(-1!=c&&"/"!=c)}else i.ungetChar(k);break;case "\n":h=!1;break;case "<":g?""==l&&(d=1):d=1}break;case 1:switch(c){case -1:b=!0;break;case "/":d=!a||i.getText(k.position,k.position+a.length)===
a&&!i.getText(k.position+a.length,k.position+a.length+1).match(/\w/)?2:0;break;case "!":c=i.getChar(k);-1==c?b=!0:"-"==c?(c=i.getChar(k),-1==c?b=!0:d="-"==c?3:0):d=0;break;default:d=0}break;case 2:h=!1;-1==c?b=!0:j.isLetter(c)?(b=!0,i.ungetChar(k),i.ungetChar(k),i.ungetChar(k)):d=0;break;case 3:h=!1;-1==c?b=!0:"-"==c&&(c=i.getChar(k),-1==c?b=!0:"-"==c?(c=i.getChar(k),-1==c?b=!0:">"==c?d=0:(i.ungetChar(k),i.ungetChar(k))):i.ungetChar(k));break;default:throw Error("unexpected "+d);}return this.makeCData(f,
k.position)},single_quote:function(g,a){var b=this.page;g.push(new i(b.getText(a[1],a[2]),"=",b.getText(a[4]+1,a[5]),"'"))},double_quote:function(g,a){var b=this.page;g.push(new i(b.getText(a[1],a[2]),"=",b.getText(a[5]+1,a[6]),'"'))},standalone:function(g,a){g.push(new i(this.page.getText(a[1],a[2])))},naked:function(g,a){var b=this.page;g.push(new i(b.getText(a[1],a[2]),"=",b.getText(a[3],a[4])))}};return l},{requires:"./Cursor,./Page,../nodes/Text,../nodes/CData,../Utils,../nodes/Attribute,../nodes/Tag,../nodes/Comment".split(",")});
KISSY.add("htmlparser/lexer/Page",function(a,h){function c(a){this.source=a;this.lineIndex=new h}c.prototype={getChar:function(a){var b=this.source,c=a.position;if(c>=b.length)return-1;var i=b.charAt(c);a.advance();"\r"===i&&(i="\n",c=a.position,"\n"===b.charAt(c)&&a.advance());"\n"===i&&this.lineIndex.add(a);return i},ungetChar:function(a){var b=this.source;a.retreat();var c=a.position,i=b.charAt(c);"\n"===i&&0!=c&&(i=b.charAt(c-1),"\r"===i&&a.retreat())},getText:function(a,b){return this.source.slice(a,
b)},row:function(a){return this.lineIndex.row(a)},col:function(a){return this.lineIndex.col(a)}};return c},{requires:["./Index"]});KISSY.add("htmlparser/nodes/Attribute",function(a){function h(a,h,b,j){this.nodeType=2;this.name=a;this.assignMent=h;this.value=b;this.quote=j}a.augment(h,{clone:function(){var c=new h;a.mix(c,this);return c},equals:function(a){return this.name==a.name&&this.value==a.value&&this.nodeType==a.nodeType}});h.prototype.clone=function(){var c=new h;a.mix(c,this);return c};return h});
KISSY.add("htmlparser/nodes/CData",function(a,h){function c(){c.superclass.constructor.apply(this,arguments);this.nodeType=4;this.nodeName="#cdata"}a.extend(c,h,{writeHtml:function(a,b){var c=this.toHtml();(!b||!1!==b.onCData(this))&&a.cdata(c)}});return c},{requires:["./Text"]});
KISSY.add("htmlparser/nodes/Comment",function(a,h){function c(){c.superclass.constructor.apply(this,arguments);this.nodeType=8;this.nodeName="#comment"}a.extend(c,h,{writeHtml:function(a,b){var c=this.toHtml();(!b||!1!==b.onComment(this))&&a.comment(c)}});return c},{requires:["./Tag"]});
KISSY.add("htmlparser/nodes/Document",function(a,h){function c(){this.childNodes=[];this.nodeType=9;this.nodeName="#document"}a.extend(c,h,{writeHtml:function(a,b){this.__filter=b;this._writeChildrenHtml(a)}});return c},{requires:["./Tag"]});
KISSY.add("htmlparser/nodes/Fragment",function(a,h){function c(){this.childNodes=[];this.nodeType=9;this.nodeName="#fragment"}a.extend(c,h,{writeHtml:function(a,b){this.__filter=b;this.isChildrenFiltered=0;if(b)b.onFragment(this);this._writeChildrenHtml(a)}});return c},{requires:["./Tag"]});
KISSY.add("htmlparser/nodes/Node",function(a){function h(c,h,b){this.parentNode=null;this.page=c;this.startPosition=h;this.endPosition=b;this.nextSibling=this.previousSibling=this.nodeName=null;a.Config.debug&&(this.toHtmlContent=this.toHtml())}h.prototype={toHtml:function(){if(this.page&&this.page.getText)return this.page.getText(this.startPosition,this.endPosition)},toString:function(){var a=[];a.push(this.nodeName+"  ["+this.startPosition+":"+this.endPosition+"]\n");a.push(this.toHtml());return a.join("")}};
return h});
KISSY.add("htmlparser/nodes/Tag",function(a,h,c,k){function b(g,b,e){g.nodeName=g.tagName=b.toLowerCase();g._updateSelfClosed();a.each(e,function(a,b){g.setAttribute(b,a)})}function j(g,l,e,c){this.childNodes=[];this.lastChild=this.firstChild=null;this.attributes=c||[];this.nodeType=1;if(a.isString(g))j.superclass.constructor.apply(this),b.apply(null,[this].concat(a.makeArray(arguments)));else{j.superclass.constructor.apply(this,arguments);c=this.attributes;c[0]&&(this.nodeName=c[0].name.toLowerCase(),this.tagName=
this.nodeName.replace(/\//,""),this._updateSelfClosed(),c.splice(0,1));var f=c[c.length-1];if(f=!(!f||!/\/$/.test(f.name)))c.length-=1;this.closed=this.isSelfClosed=this.isSelfClosed||f}this.closedEndPosition=this.closedStartPosition=-1}function i(a){var b=a.childNodes;a.firstChild=b[0];a.lastChild=b[b.length-1];1<=b.length&&(b[0].nextSibling=b[0].nextSibling=null,b[0].parentNode=a);if(1<b.length){for(var e=0;e<b.length-1;e++)b[e].nextSibling=b[e+1],b[e+1].previousSibling=b[e],b[e+1].parentNode=a;
b[b.length-1].nextSibling=null}}function m(a,b){for(var e=0;e<a.length;e++)if(a[e].name==b)return a[e];return null}a.extend(j,h,{_updateSelfClosed:function(){this.isSelfClosed=!!k.$empty[this.nodeName];this.isSelfClosed||(this.isSelfClosed=/\/$/.test(this.nodeName));this.closed=this.isSelfClosed},clone:function(){var g=new j,b=[];a.each(this.attributes,function(a){b.push(a.clone())});a.mix(g,{childNodes:[],firstChild:null,lastChild:null,attributes:b,nodeType:this.nodeType,nodeName:this.nodeName,tagName:this.tagName,
isSelfClosed:this.isSelfClosed,closed:this.closed,closedStartPosition:this.closedStartPosition,closedEndPosition:this.closedEndPosition});return g},setTagName:function(a){this.nodeName=this.tagName=a;this._updateSelfClosed()},equals:function(a){if(!a||this.nodeName!=a.nodeName||this.nodeType!=a.nodeType||this.attributes.length!=a.attributes.length)return 0;for(var b=0;b<this.attributes.length;b++)if(!this.attributes[b].equals(a.attributes[b]))return 0;return 1},isEndTag:function(){return/^\//.test(this.nodeName)},
appendChild:function(a){this.childNodes.push(a);i(this)},replace:function(b){var c=b.parentNode.childNodes,e=a.indexOf(b,c);c[e]=this;i(b.parentNode)},prepend:function(a){this.childNodes.unshift(a);i(this)},insertBefore:function(b){var c=b.parentNode.childNodes,e=a.indexOf(b,c);c.splice(e,0,this);i(b.parentNode)},insertAfter:function(b){var c=b.parentNode.childNodes,e=a.indexOf(b,c);e==c.length-1?b.parentNode.appendChild(this):this.insertBefore(b.parentNode.childNodes[[e+1]])},empty:function(){this.childNodes=
[];i(this)},removeChild:function(b){var c=b.parentNode.childNodes,e=a.indexOf(b,c);c.splice(e,1);i(b.parentNode)},getAttribute:function(a){return(a=m(this.attributes,a))&&a.value},setAttribute:function(a,b){var e=m(this.attributes,a);e?e.value=b:this.attributes.push(new c(a,"=",b,'"'))},removeAttribute:function(b){(b=m(this.attributes,b))&&this.attributes.splice(a.indexOf(b,this.attributes),1)},filterChildren:function(){var b=this;if(!b.isChildrenFiltered){var c=new (a.require("htmlparser/writer/basic"));
b._writeChildrenHtml(c);c=(new (a.require("htmlparser/Parser"))(c.getHtml())).parse().childNodes;b.empty();a.each(c,function(a){b.appendChild(a)});b.isChildrenFiltered=1}},writeHtml:function(a,b){var e=this,c;c=e.tagName;if("!doctype"==c)a.append(this.toHtml()+"\n");else{e.__filter=b;e.isChildrenFiltered=0;if(b){if(!(c=b.onTagName(c)))return;e.tagName=c;c=b.onTag(e);if(!1===c)return;c&&(e=c);if(1!==e.nodeType){e.writeHtml(a,b);return}if(!e.tagName){e._writeChildrenHtml(a);return}}a.openTag(e);for(var f=
e.attributes,d=0;d<f.length;d++){var j=f[d];c=j.name;if(b){if(!(c=b.onAttributeName(c,e)))continue;j.name=c;if(!1===b.onAttribute(j,e))continue}a.attribute(j,e)}a.openTagClose(e);e.isSelfClosed||(e._writeChildrenHtml(a),a.closeTag(e))}},_writeChildrenHtml:function(b){var c=this.isChildrenFiltered?0:this.__filter;a.each(this.childNodes,function(a){a.writeHtml(b,c)})}});return j},{requires:["./Node","./Attribute","../dtd"]});
KISSY.add("htmlparser/nodes/Text",function(a,h){function c(h){a.isString(h)?(this.nodeValue=h,c.superclass.constructor.apply(this,[null,-1,-1])):(c.superclass.constructor.apply(this,arguments),this.nodeValue=this.toHtml());this.nodeType=3;this.nodeName="#text"}a.extend(c,h,{writeHtml:function(a,b){var c=this.nodeValue;(!b||!1!==b.onText(this))&&a.text(c)},toHtml:function(){return this.nodeValue?this.nodeValue:c.superclass.toHtml.apply(this,arguments)}});return c},{requires:["./Node"]});
KISSY.add("htmlparser/scanners/CdataScanner",function(){return{scan:function(a,h,c){var c=h.parseCDATA(c.quoteSmart,a.nodeName),k=h.getPosition(),b=h.nextNode();b&&(1!=b.nodeType||!(b.isEndTag()&&b.tagName==a.tagName))&&h.setPosition(k);a.closed=!0;c&&a.appendChild(c)}}});KISSY.add("htmlparser/scanners/QuoteCdataScanner",function(a,h,c,k){var a={scan:function(a,b,c){c=c||{};c.quoteSmart=1;h.scan(a,b,c);c.quoteSmart=0}},b;for(b in c.$cdata)k[b]=a;return a},{requires:["./CdataScanner","../dtd","./SpecialScanners"]});
KISSY.add("htmlparser/scanners/SpecialScanners",function(){return{}});
KISSY.add("htmlparser/scanners/TagScanner",function(a,h,c,k){function b(g,l){function e(){d.childNodes.length&&(d.insertAfter(m),m=d,d=g.clone())}g.closed=1;if(!l.fixByDtd)return 0;var k=1,f=[].concat(g.childNodes);a.each(f,function(a){if(!j(g,a))return k=0,!1});if(k)return 0;for(var d=g.clone(),m=g,s=[],p=0;p<f.length;p++){var o=f[p];if(j(d,o))d.appendChild(o);else if(1==o.nodeType){var t=o.tagName;if(h.$listItem[t]){e();var o=i[o.tagName],r=new c;for(r.nodeName=r.tagName=o;p<f.length;){if(f[p].tagName==
t)r.appendChild(f[p]);else if((3!=f[p].nodeType||a.trim(f[p].toHtml()))&&3==f[p].nodeType)break;p++}r.insertAfter(m);m=r;p--}else e(),o.equals(d)?(o.insertAfter(m),m=o):j(o,d)?(d=g.clone(),a.each(o.childNodes,function(a){d.appendChild(a)}),o.empty(),o.insertAfter(m),m=o,o.appendChild(d),s.push(d),d=g.clone()):(o.insertAfter(m),m=o)}}d.childNodes.length&&d.insertAfter(m);g.parentNode.removeChild(g);a.each(s,function(a){b(a,l)});return 1}function j(a,b){if(9==a.nodeType||8==b.nodeType)return 1;var c=
b.tagName||b.nodeName;3==b.nodeType&&(c="#");return!!h[a.tagName][c]}var i={li:"ul",dt:"dl",dd:"dl"},m={dd:"dl",dt:"dl",li:"ul",option:"select",optgroup:"select"};return{scan:function(a,c,e){function j(c,d){for(h=c;h>d;h--){var f=i[h];i[h-1].appendChild(f);b(f,e)}a=i[d];i.length=d}function f(a){var b=0,c;if(c=m[a.tagName]){for(var d=i.length-1,e=i[d];e&&e.tagName!=c;){if(e.tagName==a.tagName){b=1;break}d--;e=i[d]}b&&j(i.length-1,d-1)}return b}var d,h,i;i=e.stack=e.stack||[];do{if(d=c.nextNode())if(1===
d.nodeType)if(d.isEndTag()&&d.tagName==a.tagName)d=null;else if(d.isEndTag()){if(d.isEndTag()){var p=-1;for(h=i.length-1;0<=h;h--)if(i[h].tagName===d.tagName){p=h;break}-1!=p&&(i[i.length-1].appendChild(a),b(a,e),j(i.length-1,p),d=null)}}else k[d.tagName]?(k[d.tagName].scan(d,c,e),a.appendChild(d)):d.isSelfClosed?a.appendChild(d):(i.push(a),f(d)&&i.push(a),a=d);else a.appendChild(d);null==d&&0<i.length&&(d=i[i.length-1],k[d.tagName]?d=null:(i.length-=1,d.appendChild(a),b(a,e),a=d))}while(d);b(a,e)}}},
{requires:["../dtd","../nodes/Tag","./SpecialScanners"]});KISSY.add("htmlparser/scanners/TextareaScanner",function(a,h,c){return c.textarea={scan:function(a,b,c){c=c||{};h.scan(a,b,c)}}},{requires:["./CdataScanner","./SpecialScanners"]});
KISSY.add("htmlparser/writer/basic",function(){function a(){this.output=[]}a.prototype={append:function(){for(var a=this.output,c=arguments,k,b=0;b<c.length;b++)if(k=c[b],1<k.length)for(var j=0;j<k.length;j++)a.push(k.charAt(j));else a.push(k);return this},openTag:function(a){this.append("<",a.tagName)},openTagClose:function(a){a.isSelfClosed&&this.append(" ","/");this.append(">")},closeTag:function(a){this.append("</",a.tagName,">")},attribute:function(a){this.append(" ",a.name,'="',(a.value||a.name).replace(/"/g,
"&quote;"),'"')},text:function(a){this.append(a)},cdata:function(a){this.append(a)},comment:function(a){this.append(a)},getHtml:function(){return this.output.join("")}};return a});
KISSY.add("htmlparser/writer/beautify",function(a,h,c,k){function b(){b.superclass.constructor.apply(this,arguments);this.inPre=0;this.indentChar="\t";this.allowIndent=this.indentLevel=0;this.rules={};for(var j in a.merge(c.$nonBodyContent,c.$block,c.$listItem,c.$tableContent,{select:1,script:1,style:1}))this.setRules(j,{allowIndent:1,breakBeforeOpen:1,breakAfterOpen:1,breakBeforeClose:1,breakAfterClose:1});this.setRules("option",{breakBeforeOpen:1});this.setRules("optiongroup",{breakBeforeOpen:1});
this.setRules("br",{breakAfterOpen:1});this.setRules("title",{allowIndent:0,breakBeforeClose:0,breakAfterOpen:0});this.setRules("pre",{allowIndent:0})}a.extend(b,h,{indentation:function(){this.inPre||this.append(Array(this.indentLevel+1).join(this.indentChar));this.allowIndent=0},lineBreak:function(){var a=this.output;if(!this.inPre&&a.length){for(var b=a.length-1;0<=b&&/[\r\n\t ]/.test(a[b]);b--);a.length=b+1;this.append("\n")}this.allowIndent=1},setRules:function(b,c){this.rules[b]||(this.rules[b]=
{});a.mix(this.rules[b],c)},openTag:function(a){var c=this.rules[a.tagName]||{};this.allowIndent?this.indentation():c.breakBeforeOpen&&(this.lineBreak(),this.indentation());b.superclass.openTag.apply(this,arguments)},openTagClose:function(a){var b=a.tagName,c=this.rules[b]||{};a.isSelfClosed?this.append(" />"):(this.append(">"),c.allowIndent&&this.indentLevel++);c.breakAfterOpen&&this.lineBreak();"pre"===b&&(this.inPre=1)},closeTag:function(a){var c=a.tagName,h=this.rules[c]||{};h.allowIndent&&this.indentLevel--;
this.allowIndent?this.indentation():h.breakBeforeClose&&(this.lineBreak(),this.indentation());b.superclass.closeTag.apply(this,arguments);"pre"===c&&(this.inPre=0);h.breakAfterClose&&this.lineBreak()},text:function(a){this.allowIndent&&this.indentation();this.inPre||(a=k.collapseWhitespace(a));this.append(a)},comment:function(a){this.allowIndent&&this.indentation();this.append(a)},cdata:function(a){this.allowIndent&&this.indentation();this.append(a)}});return b},{requires:["./basic","../dtd","../Utils"]});
KISSY.add("htmlparser/writer/filter",function(a){function h(){this.tagNames=[];this.attributeNames=[];this.tags=[];this.comment=[];this.text=[];this.cdata=[];this.attributes=[];this.root=[]}function c(b,c){for(var i=0;b&&i<b.length;i++)a.each(b[i].value,function(a){c=c.replace(a[0],a[1])});return c}function k(a,c,i){for(var h=0;a&&h<a.length;h++)if(!1===a[h].value.apply(null,c))return!1;return i}h.prototype={addRules:function(a,c){var c=c||10,i;for(i in a)if(a.hasOwnProperty(i)){var h=this[i];if(h){var g;
a:{for(g=0;h&&g<h.length;g++)if(h[g].priority>c)break a;g=h.length}h.splice(g,0,{value:a[i],priority:c})}}},onTagName:function(a){return c(this.tagNames,a)},onAttributeName:function(a){return c(this.attributeNames,a)},onText:function(a){return k(this.text,[a.toHtml(),a],a)},onCData:function(a){return k(this.cdata,[a.toHtml(),a],a)},onAttribute:function(a,c){var h;a:{h=this.attributes;for(var k=0;h&&k<h.length;k++){var g=h[k].value,l=a.name;if(g[l]&&!1===g[l].call(null,a.value,c)){h=!1;break a}}h=
a}return h},onComment:function(a){return k(this.comment,[a.toHtml(),a],a)},onNode:function(a){var c=a.nodeType;if(1===c)return this.onTag(a);if(3===c)return this.onText(a);if(8===c)return this.onComment(a)},onFragment:function(a){return k(this.root,[a],a)},onTag:function(a){for(var c=["^",a.tagName,"$"],h=this.tags,k,g=0;g<c.length;g++)for(var l=c[g],e=0;e<h.length;e++)if(k=h[e].value,k[l]){if(!1===(k=k[l](a)))return!1;if(k&&k!=a)return this.onNode(k);if(!a.tagName)return a}return a}};return h});
KISSY.add("htmlparser/writer/minify",function(a,h,c){function k(a){return a.replace(/"/g,"&quote;")}function b(a,c){var b=a.nodeName,f=c.name,d=c.value||"";/^on[a-z]+/.test(f)?d=i(d).replace(/^javascript:[\s\xa0]*/i,"").replace(/[\s\xa0]*;$/,""):"class"===f?d=m(i(d)):/^(?:a|area|link|base)$/.test(b)&&"href"===f||"img"===b&&/^(?:src|longdesc|usemap)$/.test(f)||"object"===b&&/^(?:classid|codebase|data|usemap)$/.test(f)||"q"===b&&"cite"===f||"blockquote"===b&&"cite"===f||("ins"===b||"del"===b)&&"cite"===
f||"form"===b&&"action"===f||"input"===b&&("src"===f||"usemap"===f)||"head"===b&&"profile"===f||"script"===b&&("src"===f||"for"===f)||/^(?:a|area|object|button)$/.test(b)&&"tabindex"===f||"input"===b&&("maxlength"===f||"tabindex"===f)||"select"===b&&("size"===f||"tabindex"===f)||"textarea"===b&&/^(?:rows|cols|tabindex)$/.test(f)||"colgroup"===b&&"span"===f||"col"===b&&"span"===f||("th"===b||"td"==b)&&("rowspan"===f||"colspan"===f)?d=i(d):"style"===f&&(d=i(d).replace(/[\s\xa0]*;[\s\xa0]*$/,""));return d}
function j(){j.superclass.constructor.apply(this,arguments);this.inPre=0}var i=a.trim,m=c.collapseWhitespace,g=RegExp("^(?:class|id|style|title|lang|dir|on(?:focus|blur|change|click|dblclick|mouse(?:down|up|over|move|out)|key(?:press|down|up)))$");a.extend(j,h,{comment:function(a){/\[if[^\]]+\]/.test(a)&&(a=a.replace(/^(\[[^\]]+\]>)[\s\xa0]*/,"$1").replace(/[\s\xa0]*(<!\[endif\])$/,"$1"),j.superclass.comment.call(this,a))},openTag:function(a){"pre"==a.tagName&&(this.inPre=1);j.superclass.openTag.apply(this,
arguments)},closeTag:function(a){"pre"==a.tagName&&(this.inPre=0);j.superclass.closeTag.apply(this,arguments)},cdata:function(a){a=i(a).replace(/^(?:[\s\xa0]*\/\*[\s\xa0]*<!\[CDATA\[[\s\xa0]*\*\/|[\s\xa0]*\/\/[\s\xa0]*<!\[CDATA\[.*)/,"").replace(/(?:\/\*[\s\xa0]*\]\]>[\s\xa0]*\*\/|\/\/[\s\xa0]*\]\]>)[\s\xa0]*$/,"");j.superclass.cdata.call(this,a)},attribute:function(a,c){var h=a.name,f=a.value||"",d;d=a.name;if(d=!(!i(a.value||"")&&("input"===c&&"value"===d||g.test(d)))){d=c.nodeName;var j=a.name,
m=a.value||"",m=i(m.toLowerCase());d=!("script"===d&&"language"===j&&"javascript"===m||"form"===d&&"method"===j&&"get"===m||"input"===d&&"type"===j&&"text"===m||"script"===d&&"type"===j&&"text/javascript"===m||"style"===d&&"type"===j&&"text/css"===m||"area"===d&&"shape"===j&&"rect"===m)}d&&(/^(?:checked|disabled|selected|readonly|defer|multiple|nohref|noshape|nowrap|noresize|compact|ismap)$/i.test(h)?this.append(" ",h):!/[ "'=<>`]/.test(f)?this.append(" ",h,"=",k(b(c,a))):this.append(" ",h,'="',k(b(c,
a)),'"'))},text:function(a){this.inPre||this.append(m(a))}});return j},{requires:["./basic","../Utils"]});
