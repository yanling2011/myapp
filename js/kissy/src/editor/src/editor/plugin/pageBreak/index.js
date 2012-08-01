/**
 * pagebreak functionality
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/pageBreak/index", function (S, KE, fakeObjects) {
    var Node = S.Node,
        CLS = "ke_pagebreak",
        TYPE = "div",
        PAGE_BREAK_MARKUP = '<div' +
            ' style="page-break-after: always; ">' +
            '<span style="DISPLAY:none">&nbsp;</span>' +
            '</div>';

    return {
        init:function (editor) {

            fakeObjects.init(editor);

            var dataProcessor = editor.htmlDataProcessor,
                dataFilter = dataProcessor && dataProcessor.dataFilter;

            dataFilter.addRules({
                tags:{
                    div:function (element) {
                        var style = element.getAttribute("style"),
                            child;

                        if (style) {
                            var childNodes = element.childNodes;
                            for (var i = 0; i < childNodes.length; i++) {
                                if (childNodes[i].nodeType == 1) {
                                    child = childNodes[i];
                                }
                            }
                        }

                        var childStyle = child &&
                            ( child.nodeName == 'span' ) &&
                            child.getAttribute("style");

                        if (childStyle &&
                            ( /page-break-after\s*:\s*always/i ).test(style) &&
                            ( /display\s*:\s*none/i ).test(childStyle)) {
                            return dataProcessor.createFakeParserElement(element, CLS, TYPE);
                        }
                    }
                }
            });

            editor.addButton({
                title:"分页",
                mode:KE.WYSIWYG_MODE,
                contentCls:"ke-toolbar-pagebreak"
            }, {
                offClick:function () {
                    var editor = this.get("editor"),
                        real = new Node(PAGE_BREAK_MARKUP, null, editor.get("document")[0]),
                        substitute = editor.createFakeElement(real, CLS, TYPE,
                            //不可缩放，也不用
                            false,
                            PAGE_BREAK_MARKUP);

                    var sel = editor.getSelection(), range = sel && sel.getRanges()[0];

                    if (!range) {
                        return;
                    }

                    editor.execCommand("save");

                    var start = range.startContainer,
                        pre = start;

                    while (start._4e_name() !== "body") {
                        pre = start;
                        start = start.parent();
                    }

                    range.collapse(true);

                    range.splitElement(pre);

                    substitute.insertAfter(pre);

                    editor.execCommand("save");
                }
            });
        }
    };
}, {
    "requires":["editor", "../fakeObjects/"]
});