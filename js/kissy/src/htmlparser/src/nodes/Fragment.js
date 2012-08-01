/**
 * @fileOverview fake document fragment
 * @author yiminghe@gmail.com
 */
KISSY.add("htmlparser/nodes/Fragment", function (S, Tag) {
    function Fragment() {
        this.childNodes = [];
        this.nodeType = 9;
        this.nodeName = '#fragment';
    }

    S.extend(Fragment, Tag, {
        writeHtml:function (writer, filter) {
            this.__filter = filter;
            this.isChildrenFiltered = 0;
            if (filter) {
                filter.onFragment(this);
            }
            this._writeChildrenHtml(writer);
        }
    });

    return Fragment;
}, {
    requires:['./Tag']
});