/**
 * @fileOverview fake document node
 * @author yiminghe@gmail.com
 */
KISSY.add("htmlparser/nodes/Document", function (S, Tag) {
    function Document() {
        this.childNodes = [];
        this.nodeType = 9;
        this.nodeName = '#document';
    }

    S.extend(Document, Tag, {
        writeHtml:function (writer, filter) {
            this.__filter = filter;
            this._writeChildrenHtml(writer);
        }
    });

    return Document;
}, {
    requires:['./Tag']
});