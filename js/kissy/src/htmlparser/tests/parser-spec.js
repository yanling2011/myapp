KISSY.use("htmlparser", function (S, HtmlParser) {
    var Parser = HtmlParser.Parser;
    describe("Parser", function () {

        it("works for valid html", function () {
            // valid html is fine
            var html = "<div id='5'><span>1</span><a href=\"http://www.g.cn\">http://www.taobao.com</a></div>";

            var parser = new Parser(html),
                node;

            node = parser.parse().childNodes[0];

            expect(node.childNodes.length).toBe(2);

            var childnode1 = node.childNodes;

            expect(childnode1[0].nodeName).toBe("span");

            expect(childnode1[0].childNodes[0].toHtml()).toBe("1");

            expect(childnode1[1].nodeName).toBe("a");

            expect(childnode1[1].childNodes[0].toHtml()).toBe("http://www.taobao.com");
        });

        it("works for none-valid html", function () {

            // not valid html is fine too
            var html = "<div id='5'><span>1<a href=\"http://www.g.cn\">http://www.taobao.com</div>";

            var parser = new Parser(html),
                node;

            node = parser.parse().childNodes[0];

            expect(node.childNodes.length).toBe(1);

            var childnode1 = node.childNodes;

            expect(childnode1[0].nodeName).toBe("span");

            var childnode2 = childnode1[0].childNodes;

            expect(childnode2[0].toHtml()).toBe("1");

            expect(childnode2[1].nodeName).toBe("a");

            expect(childnode2[1].childNodes[0].toHtml()).toBe("http://www.taobao.com");
        });


        it("works for valid script", function () {

            // valid script ok
            var html = "<div><script>var x='<a>b</a>';</script></div>";

            var parser = new Parser(html),
                node;

            node = parser.parse().childNodes[0];

            var script = node.childNodes[0];

            expect(script.nodeName).toBe("script");

            expect(script.childNodes.length).toBe(1);

            expect(script.childNodes[0].toHtml()).toBe("var x='<a>b</a>';");

        });


        it("works for none-valid script", function () {

            // not valid script ok ,but truncated
            var html = "<div><script>var x='<a>b</a>';<" + "/a>test</script></div>";

            var parser = new Parser(html),
                node;

            node = parser.parse().childNodes[0];

            expect(node.childNodes.length).toBe(1);

            var script = node.childNodes[0];

            expect(script.nodeName).toBe("script");

            expect(script.childNodes.length).toBe(1);

            expect(script.childNodes[0].toHtml()).toBe("var x='<a>b</a>';</a>test");

        });

        it("works for non-valid nest tag soup", function () {
            // encounter  <a>1<p>2</p>3</a> , close <a> => <a>1</a><p>2</p>3</a> => <a>1</a><p>2</p>3
            // perfection is better and more complicated ?
            // <a>1<p>2</p>3</a> , move <a> inside => <a>1</a><p><a>2</a></p><a>3</a>
            var html = "<a>我<p>测试</p>一下</a>";
            var parser = new Parser(html);
            var nodes = parser.parse().childNodes;
            expect(nodes.length).toBe(1);
            expect(nodes[0].nodeName).toBe("a");
            expect(nodes[0].childNodes[0].toHtml()).toBe("我");
        });


        it("adjust non-valid nest tag soup by dtd", function () {
            // encounter  <a>1<p>2</p>3</a> , close <a> => <a>1</a><p>2</p>3</a> => <a>1</a><p>2</p>3
            // perfection is better and more complicated ?
            // <a>1<p>2</p>3</a> , move <a> inside => <a>1</a><p><a>2</a></p><a>3</a>
            var html = "<a>我<p>测试</p>一下</a>",
                parser = new Parser(html, {
                    fixByDtd:1
                }),
                node = parser.parse(),
                writer = new HtmlParser.BasicWriter();
            node.writeHtml(writer);
            expect(writer.getHtml()).toBe("<a>我</a><p><a>测试</a></p><a>一下</a>");
        });


        it("adjust non-valid nest tag soup by dtd and auto paragraph", function () {
            var html = "<a>我<p>测试</p>一下</a>",
                parser = new Parser(html, {
                    fixByDtd:1,
                    autoParagraph:1
                }),
                node = parser.parse(),
                writer = new HtmlParser.BasicWriter();
            node.writeHtml(writer);
            expect(writer.getHtml()).toBe("<p><a>我</a></p><p><a>测试</a></p><p><a>一下</a></p>");
        });

        it("filterChildren should works", function () {
            var html = "<div class='ul'><div class='li'>1</div><div class='li'>2</div></div>",
                parser = new Parser(html),
                node = parser.parse(),
                writer = new HtmlParser.BasicWriter(),
                filter = new HtmlParser.Filter();

            filter.addRules({
                tags:{
                    $:function (el) {
                        if (el.getAttribute("class") == "li") {
                            el.nodeName = el.tagName = "li";
                            el.removeAttribute("class");
                        } else if (el.getAttribute("class") == "ul") {
                            // filter its children first, root node need children info after filtering
                            el.filterChildren();
                            var childNodes = el.childNodes;
                            for (var i = 0, c = childNodes[i]; i < childNodes.length; i++) {
                                if (c.nodeType == 1 && c.tagName != "li") {
                                    return;
                                }
                            }
                            el.nodeName = el.tagName = "ul";
                            el.removeAttribute("class");
                        }
                    }
                }
            });
            node.writeHtml(writer, filter);
            expect(writer.getHtml()).toBe("<ul><li>1</li><li>2</li></ul>");
        });
    });
});