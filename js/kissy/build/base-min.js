/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 2 10:12
*/
KISSY.add("base/attribute",function(h,j){function n(a,b,c,d,k,g,e){e=e||c;return a.fire(b+h.ucfirst(c)+"Change",{attrName:e,subAttrName:g,prevVal:d,newVal:k})}function f(a,b,c){var d=a[b]||{};c&&(a[b]=d);return d}function e(a){return f(a,"__attrs",!0)}function m(a){return f(a,"__attrVals",!0)}function o(a,b){for(var c=0,d=b.length;a!=j&&c<d;c++)a=a[b[c]];return a}function p(a,b,c,d,k){var d=d||{},g,e,l,f=b;-1!==b.indexOf(".")&&(g=b.split("."),b=g.shift());l=a.get(b);g&&(e=o(l,g));if(!g&&l===c||g&&
e===c)return j;if(g){var i=e=h.clone(l),p=g.length-1;if(0<=p){for(var q=0;q<p;q++)i=i[g[q]];i!=j&&(i[g[q]]=c)}c=e}if(!d.silent&&!1===n(a,"before",b,l,c,f))return!1;c=a.__set(b,c,d);if(!1===c)return c;d.silent||(c=m(a)[b],n(a,"after",b,l,c,f),k?k.push({prevVal:l,newVal:c,attrName:b,subAttrName:f}):n(a,"","*",[l],[c],[f],[b]));return a}function i(){}function r(a,b,c,d){var k=f(e(a),b,!0).validator;if(k&&(k=h.isString(k)?a[k]:k))if(a=k.call(a,c,b,d),a!==j&&!0!==a)return a;return j}i.INVALID={};var s=
i.INVALID;h.augment(i,{getAttrs:function(){return e(this)},getAttrVals:function(){var a={},b,c=e(this);for(b in c)a[b]=this.get(b);return a},addAttr:function(a,b,c){var d=e(this),b=h.clone(b);d[a]?h.mix(d[a],b,c):d[a]=b;return this},addAttrs:function(a,b){var c=this;h.each(a,function(a,b){c.addAttr(b,a)});b&&c.set(b);return c},hasAttr:function(a){return a&&e(this).hasOwnProperty(a)},removeAttr:function(a){this.hasAttr(a)&&(delete e(this)[a],delete m(this)[a]);return this},set:function(a,b,c){if(h.isPlainObject(a)){var c=
b,b=Object(a),d=[],e,g=[];for(a in b)(e=r(this,a,b[a],b))!==j&&g.push(e);if(g.length)return c.error&&c.error(g),!1;for(a in b)p(this,a,b[a],c,d);var f=[],i=[],m=[],o=[];h.each(d,function(a){i.push(a.prevVal);m.push(a.newVal);f.push(a.attrName);o.push(a.subAttrName)});f.length&&n(this,"","*",i,m,o,f);return this}return p(this,a,b,c)},__set:function(a,b,c){var d,i,g=f(e(this),a,!0).setter;i=r(this,a,b);if(i!==j)return c.error&&c.error(i),!1;if(g&&(g=h.isString(g)?this[g]:g))d=g.call(this,b,a);if(d===
s)return!1;d!==j&&(b=d);m(this)[a]=b},get:function(a){var b,c=m(this),d;-1!==a.indexOf(".")&&(b=a.split("."),a=b.shift());d=f(e(this),a).getter;c=a in c?c[a]:this.__getDefAttrVal(a);if(d&&(d=h.isString(d)?this[d]:d))c=d.call(this,c,a);b&&(c=o(c,b));return c},__getDefAttrVal:function(a){var b=e(this),c=f(b,a),d=c.valueFn;if(d&&(d=h.isString(d)?this[d]:d))d=d.call(this),d!==j&&(c.value=d),delete c.valueFn,b[a]=c;return c.value},reset:function(a,b){if(h.isString(a))return this.hasAttr(a)?this.set(a,
this.__getDefAttrVal(a),b):this;var b=a,c=e(this),d={};for(a in c)d[a]=this.__getDefAttrVal(a);this.set(d,b);return this}});j&&(i.prototype.addAttrs=j);return i});
KISSY.add("base",function(h,j,n){function f(e){for(var f=this.constructor;f;){var h=f.ATTRS;if(h){var j=void 0;for(j in h)h.hasOwnProperty(j)&&this.addAttr(j,h[j],!1)}f=f.superclass?f.superclass.constructor:null}if(e)for(var i in e)e.hasOwnProperty(i)&&this.__set(i,e[i])}h.augment(f,n.Target,j);f.Attribute=j;return h.Base=f},{requires:["base/attribute","event"]});
