/**
 * test cases for offset sub module of dom module
 * @author yiminghe@gmail.com
 * @description need to be completed
 */
KISSY.use("dom", function(S, DOM) {
    describe("offset", function() {

        it("should works", function() {
            var test_offset = DOM.get("#test-offset");
            var o = DOM.offset(test_offset);
            DOM.offset(test_offset, o);
            var o2 = DOM.offset(test_offset);
            expect(o2.top).toBe(o.top);
            expect(o2.left).toBe(o.left);
            expect(test_offset.style.position).toBe("relative");
        });

        it("should consider html border", function() {
            // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
            // 窗口边框标准是设 documentElement ,quirks 时设置 body
            // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
            // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
            // 标准 ie 下 docElem.clientTop 就是 border-top
            // ie7 html 即窗口边框改变不了。永远为 2


            //只考虑 ie 标准模式了,ie<9 下设置边框，否则默认 2px
            document.documentElement.style.borderTop = "3px";

            var a;

            DOM.append(a = DOM.create("<div style='position: absolute;top:0;'/>"), "body");

            // ie < 9 相对于 document.documentElement 即窗口
            expect(DOM.offset(a).top).toBe(0);
            DOM.offset(a, {
                top:0
            });

            expect(parseInt(DOM.css(a, "top"))).toBe(0);

            document.documentElement.style.borderTop = "";
        });


        it("should works for framed element", function() {
            var iframe = DOM.get("#test-iframe");
            waitsFor(function() {
                return iframe.contentWindow;
            }, "iframe cano not loaded!");
            runs(function() {
                var win = iframe.contentWindow;
                var inner = DOM.get("#test-inner", win.document);
                var innerOffsetTop = DOM.offset(inner).top - DOM.scrollTop(win);
                var iframeTop = DOM.offset(iframe).top;
                var totalTop = DOM.offset(inner, undefined, window).top;
                expect(innerOffsetTop + iframeTop).toBe(totalTop);
            });

        })

    });
});