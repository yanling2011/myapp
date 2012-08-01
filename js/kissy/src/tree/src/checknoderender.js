/**
 * @fileOverview check node render
 * @author yiminghe@gmail.com
 */
KISSY.add("tree/checknoderender", function (S, Node, UIBase, Component, BaseNodeRender) {
    var $ = Node.all,
        ICON_CLS = "tree-icon",
        CHECK_CLS = "tree-item-check",
        ALL_STATES_CLS = "tree-item-checked0 tree-item-checked1 tree-item-checked2",
        INLINE_BLOCK = " ks-inline-block";
    return UIBase.create(BaseNodeRender, {

        createDom:function () {
            var self = this;
            var expandIconEl = self.get("expandIconEl"),
                checkEl = $("<div class='" + self.getCssClassWithPrefix(ICON_CLS) + INLINE_BLOCK + "'/>").insertAfter(expandIconEl);
            self.__set("checkEl", checkEl);
        },

        _uiSetCheckState:function (s) {
            var self = this;
            var checkEl = self.get("checkEl");
            checkEl.removeClass(self.getCssClassWithPrefix(ALL_STATES_CLS))
                .addClass(self.getCssClassWithPrefix(CHECK_CLS + "ed" + s));
        }

    }, {
        ATTRS:{
            checkEl:{},
            checkState:{}
        },

        CHECK_CLS:CHECK_CLS
    });
}, {
    requires:['node', 'uibase', 'component', './basenoderender']
});