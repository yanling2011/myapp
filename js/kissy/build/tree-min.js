/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 2 10:13
*/
KISSY.add("tree/base",function(g,d,e,c,f,a){g=f.TREE_CLS;d=d.create(c,[e.DelegateChildren,a],{},{DefaultRender:f});e.UIStore.setUIConstructorByCssClass(g,{priority:e.UIStore.PRIORITY.LEVEL3,ui:d});return d},{requires:["uibase","component","./basenode","./treerender","./treemgr"]});
KISSY.add("tree/basenode",function(g,d,e,c,f){var a=d.all,j=f.ITEM_CLS,h=d.KeyCodes,i=e.create(c.Controller,[c.DecorateChild],{_keyNav:function(b){var a=!0,c,d=this.get("children");switch(b.keyCode){case h.HOME:c=this.get("tree");break;case h.END:c=this.get("tree").getLastVisibleDescendant();break;case h.UP:c=this.getPreviousVisibleNode();break;case h.DOWN:c=this.getNextVisibleNode();break;case h.LEFT:this.get("expanded")&&(d.length||!1===this.get("isLeaf"))?this.set("expanded",!1):c=this.get("parent");
break;case h.RIGHT:if(d.length||!1===this.get("isLeaf"))this.get("expanded")?d[0].select():this.set("expanded",!0);break;default:a=!1}c&&c.select();return a},getLastVisibleDescendant:function(){var b=this.get("children");return!this.get("expanded")||!b.length?this:b[b.length-1].getLastVisibleDescendant()},getNextVisibleNode:function(){var b=this.get("children"),a=this.get("parent");if(this.get("expanded")&&b.length)return b[0];for(b=this.next();a&&!b;)b=a.next(),a=a.get("parent");return b},getPreviousVisibleNode:function(){var b=
this.prev();return b=b?b.getLastVisibleDescendant():this.get("parent")},next:function(){var b=this.get("parent");if(!b)return null;var b=b.get("children"),a=g.indexOf(this,b);return a==b.length-1?null:b[a+1]},prev:function(){var b=this.get("parent");if(!b)return null;var b=b.get("children"),a=g.indexOf(this,b);return 0===a?null:b[a-1]},select:function(){this.get("tree").set("selectedItem",this)},performActionInternal:function(b){var c=a(b.target),d=this.get("tree"),f=this.get("view");d.get("el")[0].focus();
c.equals(f.get("expandIconEl"))?"dblclick"!=b.type&&this.set("expanded",!this.get("expanded")):"dblclick"==b.type?this.set("expanded",!this.get("expanded")):(this.select(),d.fire("click",{target:this}))},decorateChildrenInternal:function(b,a){this.addChild(new b({srcNode:a,tree:this.get("tree"),prefixCls:this.get("prefixCls")}))},addChild:function(b){var a=this.get("tree");b.__set("tree",a);b.__set("depth",this.get("depth")+1);i.superclass.addChild.call(this,b);this._updateRecursive();a._register(b);
g.each(b.get("children"),function(b){a._register(b)})},_computeClass:function(b){this.get("view")._computeClass(this.get("children"),this.get("parent"),b)},_updateRecursive:function(){var b=this.get("children").length;this._computeClass("_updateRecursive");g.each(this.get("children"),function(a,c){a._computeClass("_updateRecursive_children");a.get("view").set("ariaPosInSet",c+1);a.get("view").set("ariaSize",b)})},removeChild:function(b){var a=this.get("tree");a._unregister(b);g.each(b.get("children"),
function(b){a._unregister(b)});i.superclass.removeChild.apply(this,g.makeArray(arguments));this._updateRecursive()},_uiSetExpanded:function(b){var a=this.get("tree");this._computeClass("expanded-"+b);b?a.fire("expand",{target:this}):a.fire("collapse",{target:this})},expandAll:function(){this.set("expanded",!0);g.each(this.get("children"),function(b){b.expandAll()})},collapseAll:function(){this.set("expanded",!1);g.each(this.get("children"),function(b){b.collapseAll()})}},{DefaultRender:f,ATTRS:{handleMouseEvents:{value:!1},
id:{getter:function(){var b=this.get("el").attr("id");b||this.get("el").attr("id",b=g.guid("tree-node"));return b}},content:{view:!0},isLeaf:{view:!0},expandIconEl:{view:!0},iconEl:{view:!0},selected:{view:!0},expanded:{value:!1,view:!0},tooltip:{view:!0},tree:{},depth:{value:0,view:!0},focusable:{value:!1},decorateChildCls:{value:"tree-children"}},HTML_PARSER:{expanded:function(b){b=b.one("."+this.getCssClassWithPrefix("tree-children"));return!b?!1:"none"!=b.css("display")}}});c.UIStore.setUIConstructorByCssClass(j,
{priority:10,ui:i});return i},{requires:["node","uibase","component","./basenoderender"]});
KISSY.add("tree/basenoderender",function(g,d,e,c){var f=d.all;return e.create(c.Render,{_computeClass:function(a,c){var d=this.get("expanded"),f=this.get("isLeaf"),b=this.get("iconEl"),e=this.get("expandIconEl"),m=this.get("childrenEl"),k="tree-icon tree-expand-icon ",o=this.getCssClassWithPrefix("tree-icon tree-file-icon ")+" ks-inline-block",p=this.getCssClassWithPrefix(["tree-icon",d?"tree-expanded-folder-icon":"tree-collapsed-folder-icon",""].join(" "))+" ks-inline-block",l=!c||c.get("children")[c.get("children").length-
1].get("view")==this;!1===f||void 0===f&&a.length?(b.attr("class",p),e.attr("class",this.getCssClassWithPrefix(g.substitute(d?k+"tree-expand-icon-{t}minus":k+"tree-expand-icon-{t}plus",{t:l?"l":"t"}))+" ks-inline-block")):(b.attr("class",o),e.attr("class",this.getCssClassWithPrefix(g.substitute(k+"tree-expand-icon-{t}",{t:l?"l":"t"}))+" ks-inline-block"));m&&m.attr("class",this.getCssClassWithPrefix(l?"tree-lchildren":"tree-children"))},createDom:function(){var a=this.get("el"),c,d,e=this.get("labelEl");
d=f("<div class='"+this.getCssClassWithPrefix("tree-row")+"'/>");c=g.guid("tree-item");this.__set("rowEl",d);var b=f("<div/>").appendTo(d),n=f("<div />").appendTo(d);e||(e=f("<span id='"+c+"' class='"+this.getCssClassWithPrefix("tree-item-label")+"'/>"),this.__set("labelEl",e));e.appendTo(d);a.attr({role:"treeitem","aria-labelledby":c}).prepend(d);this.__set("expandIconEl",b);this.__set("iconEl",n)},_uiSetExpanded:function(a){var c=this.get("childrenEl");c&&(a?a&&c.show():c.hide());this.get("el").attr("aria-expanded",
a)},_uiSetSelected:function(a){var c=this.getComponentCssClassWithState("-selected");this.get("rowEl")[a?"addClass":"removeClass"](c);this.get("el").attr("aria-selected",a)},_uiSetContent:function(a){this.get("labelEl").html(a)},_uiSetDepth:function(a){this.get("el").attr("aria-level",a)},_uiSetAriaSize:function(a){this.get("el").attr("aria-setsize",a)},_uiSetAriaPosInSet:function(a){this.get("el").attr("aria-posinset",a)},_uiSetTooltip:function(a){this.get("el").attr("title",a)},getContentElement:function(){if(this.get("childrenEl"))return this.get("childrenEl");
var a=f("<div "+(this.get("expanded")?"":"style='display:none'")+" role='group'></div>").appendTo(this.get("el"));this.__set("childrenEl",a);return a}},{ATTRS:{ariaSize:{},ariaPosInSet:{},childrenEl:{},expandIconEl:{},tooltip:{},iconEl:{},expanded:{},rowEl:{},depth:{},labelEl:{},content:{},isLeaf:{},selected:{}},HTML_PARSER:{childrenEl:function(a){return a.children("."+this.getCssClassWithPrefix("tree-children"))},labelEl:function(a){return a.children("."+this.getCssClassWithPrefix("tree-item-label"))},
content:function(a){return a.children("."+this.getCssClassWithPrefix("tree-item-label")).html()},isLeaf:function(a){if(a.hasClass(this.getCssClassWithPrefix("tree-item-leaf")))return!0;if(a.hasClass(this.getCssClassWithPrefix("tree-item-folder")))return!1}},ITEM_CLS:"tree-item"})},{requires:["node","uibase","component"]});
KISSY.add("tree/checknode",function(g,d,e,c,f,a){var j=d.all,d=e.create(f,{performActionInternal:function(a){this.get("tree").get("el")[0].focus();var c=j(a.target),b=this.get("view"),d=this.get("tree");if("dblclick"==a.type){if(c.equals(b.get("expandIconEl"))||c.equals(b.get("checkEl")))return;this.set("expanded",!this.get("expanded"))}c.equals(b.get("expandIconEl"))?this.set("expanded",!this.get("expanded")):(a=this.get("checkState"),this.set("checkState",1==a?0:1),d.fire("click",{target:this}))},
_uiSetCheckState:function(a){(1==a||0==a)&&g.each(this.get("children"),function(b){b.set("checkState",a)});var c=this.get("parent");if(c){for(var b=0,d=c.get("children"),f=0;f<d.length;f++){var e=d[f].get("checkState");if(2==e){c.set("checkState",2);return}1==e&&b++}b==d.length?c.set("checkState",1):0===b?c.set("checkState",0):c.set("checkState",2)}}},{ATTRS:{checkState:{view:!0,value:0}},CHECK_CLS:"tree-item-check",DefaultRender:a,PARTIAL_CHECK:2,CHECK:1,EMPTY:0});c.UIStore.setUIConstructorByCssClass("tree-item-check",
{priority:c.UIStore.PRIORITY.LEVEL2,ui:d});return d},{requires:["node","uibase","component","./basenode","./checknoderender"]});
KISSY.add("tree/checknoderender",function(g,d,e,c,f){var a=d.all;return e.create(f,{createDom:function(){var c=this.get("expandIconEl");this.__set("checkEl",a("<div class='"+this.getCssClassWithPrefix("tree-icon")+" ks-inline-block'/>").insertAfter(c))},_uiSetCheckState:function(a){this.get("checkEl").removeClass(this.getCssClassWithPrefix("tree-item-checked0 tree-item-checked1 tree-item-checked2")).addClass(this.getCssClassWithPrefix("tree-item-checked"+a))}},{ATTRS:{checkEl:{},checkState:{}},CHECK_CLS:"tree-item-check"})},
{requires:["node","uibase","component","./basenoderender"]});KISSY.add("tree/checktree",function(g,d,e,c,f,a){g=f.CHECK_TREE_CLS;d=d.create(c,[e.DelegateChildren,a],{},{DefaultRender:f});e.UIStore.setUIConstructorByCssClass(g,{priority:e.UIStore.PRIORITY.LEVEL4,ui:d});return d},{requires:["uibase","component","./checknode","./checktreerender","./treemgr"]});
KISSY.add("tree/checktreerender",function(g,d,e,c,f){return d.create(c,[f],{},{CHECK_TREE_CLS:"tree-root-check"})},{requires:["uibase","component","./checknoderender","./treemgrrender"]});KISSY.add("tree",function(g,d,e,c,f){d.Node=e;d.CheckNode=c;d.CheckTree=f;return d},{requires:["tree/base","tree/basenode","tree/checknode","tree/checktree"]});
KISSY.add("tree/treemgr",function(g,d){function e(){}e.ATTRS={showRootNode:{view:!0},selectedItem:{},tree:{valueFn:function(){return this}},focusable:{value:!0}};g.augment(e,{__getAllNodes:function(){this._allNodes||(this._allNodes={});return this._allNodes},__renderUI:function(){this.get("children").length||this._computeClass("root_renderUI")},_register:function(c){this.__getAllNodes()[c.get("id")]=c},_unregister:function(c){delete this.__getAllNodes()[c.get("id")]},handleKeyEventInternal:function(c){var f=
this.get("selectedItem");return c.keyCode==d.KeyCodes.ENTER?f.performActionInternal(c):f._keyNav(c)},getOwnerControl:function(c){for(var d,a=this.__getAllNodes(),e=this.get("el")[0];c&&c!==e;){if(d=a[c.id])return d;c=c.parentNode}return this},_uiSetSelectedItem:function(c,d){d.prevVal&&d.prevVal.set("selected",!1);c.set("selected",!0)},_uiSetFocused:function(c){c&&!this.get("selectedItem")&&this.select()}});return e},{requires:["event"]});
KISSY.add("tree/treemgrrender",function(g){function d(){}d.ATTRS={showRootNode:{}};g.augment(d,{__renderUI:function(){this.get("el").attr("role","tree")[0].hideFocus=!0;this.get("rowEl").addClass(this.getCssClassWithPrefix("tree-root-row"))},_uiSetShowRootNode:function(d){this.get("rowEl")[d?"show":"hide"]()},_uiSetFocused:function(d){this.get("el")[d?"addClass":"removeClass"](this.getCssClassWithPrefix("tree-item-focused"))}});return d});
KISSY.add("tree/treerender",function(g,d,e,c,f){return d.create(c,[f],{},{TREE_CLS:"tree-root"})},{requires:["uibase","component","./basenoderender","./treemgrrender"]});
