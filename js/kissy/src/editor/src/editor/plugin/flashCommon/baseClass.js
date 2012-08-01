/**
 *  BaseClass for Flash Based plugin.
 *  @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/flashCommon/baseClass", function (S, KE, ContextMenu, BubbleView, DialogLoader, flashUtils) {

    var Node = S.Node;

    /**
     * 写成类的形式而不是一个简单的button命令配置，为了可以override
     * 所有基于 flash 的插件基类，使用 template 模式抽象
     */
    function Flash() {
        Flash.superclass.constructor.apply(this, arguments);
        this._init();
    }

    var tipHtml = ' <a ' +
        'class="ke-bubbleview-url" ' +
        'target="_blank" ' +
        'href="#">{label}</a>   |   '
        + ' <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span>   |   '
        + ' <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>';

    Flash.ATTRS = {
        cls:{},
        type:{},
        label:{
            value:"在新窗口查看"
        },
        contextMenuHandlers:{}
    };

    S.extend(Flash, S.Base, {
        _init:function () {
            var self = this,
                cls = self.get("cls"),
                editor = self.get("editor"),
                contextMenuHandlers = self.get("contextMenuHandlers");

            //注册右键，contextmenu时检测
            ContextMenu.register({
                editor:editor,
                filter:"." + cls,
                width:"120px",
                handlers:contextMenuHandlers
            });

            //注册泡泡，selectionChange时检测
            BubbleView.register({
                filter:function (el) {
                    return el.hasClass(cls, undefined) && el;
                },
                editor:editor,
                init:function () {
                    var bubble = this,
                        el = bubble.get("contentEl");
                    el.html(S.substitute(tipHtml, {
                        label:self.get("label")
                    }));
                    var tipUrlEl = el.one(".ke-bubbleview-url"),
                        tipChangeEl = el.one(".ke-bubbleview-change"),
                        tipRemoveEl = el.one(".ke-bubbleview-remove");
                    //ie focus not lose
                    KE.Utils.preventFocus(el);

                    tipChangeEl.on("click", function (ev) {
                        //回调show，传入选中元素
                        self.show(bubble.selectedEl);
                        ev.halt();
                    });

                    tipRemoveEl.on("click", function (ev) {
                        // chrome remove 后会没有焦点
                        if (S.UA['webkit']) {
                            var r = editor.getSelection().getRanges(),
                                r0 = r && r[0];
                            if (r0) {
                                r0.collapse(true);
                                r0.select();
                            }
                        }
                        bubble.selectedEl.remove();
                        bubble.hide();
                        editor.notifySelectionChange();
                        ev.halt();
                    });

                    /*
                     位置变化，在显示前就设置内容，防止ie6 iframe遮罩不能正确大小
                     */
                    bubble.on("show", function () {
                        var a = bubble.selectedEl;
                        if (a) {
                            self._updateTip(tipUrlEl, a);
                        }
                    });
                }
            });

            editor.docReady(function () {
                //注册双击，双击时检测
                editor.get("document").on("dblclick", self._dbClick, self);
            });
        },

        /**
         * 子类覆盖，如何从flash url得到合适的应用表示地址
         * @override
         * @param r flash 元素
         */
        _getFlashUrl:function (r) {
            return flashUtils.getUrl(r);
        },
        /**
         * 更新泡泡弹出的界面，子类覆盖
         * @override
         * @param tipUrlElEl
         * @param selectedFlash
         */
        _updateTip:function (tipUrlElEl, selectedFlash) {
            var self = this,
                editor = self.get("editor"),
                r = editor.restoreRealElement(selectedFlash);
            if (!r) {
                return;
            }
            var url = self._getFlashUrl(r);
            tipUrlElEl.attr("href", url);
        },

        //根据图片标志触发本插件应用
        _dbClick:function (ev) {
            var self = this,
                t = new Node(ev.target);
            if (t._4e_name() === "img" && t.hasClass(self.get("cls"), undefined)) {
                self.show(t);
                ev.halt();
            }
        },

        show:function (selectedEl) {
            var self = this,
                editor = self.get("editor");
            DialogLoader.useDialog(editor, self.get("type") + "/dialog", selectedEl);
        }
    });

    return Flash;

}, {
    requires:['editor', '../contextmenu/', '../bubbleview/', '../dialogLoader/', './utils']
});