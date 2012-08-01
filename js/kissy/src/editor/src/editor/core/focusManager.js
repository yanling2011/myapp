/**
 * 多实例的管理，主要是焦点控制，主要是为了
 * 1.firefox 焦点失去 bug，记录当前状态
 * 2.窗口隐藏后能够恢复焦点
 * @author <yiminghe@gmail.com>
 */
KISSY.add("editor/core/focusManager", function (S) {
    var KE = S.Editor,
        DOM = S.DOM,
        Event = S.Event,
        INSTANCES = {},
        timer,
        //当前焦点所在处
        currentInstance,
        focusManager = {
            /**
             * 刷新全部实例
             */
            refreshAll:function () {
                for (var i in INSTANCES) {
                    if (INSTANCES.hasOwnProperty(i)) {
                        var e = INSTANCES[i], doc = e.get("document")[0];
                        doc.designMode = "off";
                        doc.designMode = "on";
                    }
                }
            },
            /**
             * 得到当前获得焦点的实例
             */
            currentInstance:function () {
                return currentInstance;
            },
            /**
             *
             * @param id {string}
             */
            getInstance:function (id) {
                return INSTANCES[id];
            },
            add:function (editor) {
                var win = DOM._4e_getWin(editor.get("document")[0]);
                Event.on(win, "focus", focus, editor);
                Event.on(win, "blur", blur, editor);
            },
            register:function (editor) {
                INSTANCES[editor._UUID] = editor;
            },
            remove:function (editor) {
                delete INSTANCES[editor._UUID];
                var win = DOM._4e_getWin(editor.get("document")[0]);
                Event.remove(win, "focus", focus, editor);
                Event.remove(win, "blur", blur, editor);
            }
        },
        TRUE = true,
        FALSE = false,
        NULL = null;

    function focus() {
        var editor = this;
        editor.__iframeFocus = TRUE;
        currentInstance = editor;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            editor.fire("focus");
        }, 100);
        //S.log(editor._UUID + " focus");
    }

    function blur() {
        var editor = this;
        editor.__iframeFocus = FALSE;
        currentInstance = NULL;
        if (timer) {
            clearTimeout(timer);
        }
        /*
         Note that this functions acts asynchronously with a delay of 100ms to
         avoid subsequent blur/focus effects.
         */
        timer = setTimeout(function () {
            editor.fire("blur");
        }, 100);
        //S.log(editor._UUID + " blur");
    }

    focusManager['refreshAll'] = focusManager.refreshAll;
    KE.focusManager = focusManager;
    KE.getInstances = function () {
        return INSTANCES;
    };

    return focusManager;
}, {
    requires:['./base', './dom']
});
