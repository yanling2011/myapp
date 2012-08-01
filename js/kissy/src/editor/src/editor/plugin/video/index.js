KISSY.add("editor/plugin/video/index", function (S, KE, flashUtils, FlashBaseClass) {
    var CLS_VIDEO = "ke_video",
        TYPE_VIDEO = "video";

    return {
        init:function (editor) {
            var dataProcessor = editor.htmlDataProcessor,
                dataFilter = dataProcessor && dataProcessor.dataFilter;

            var provider = [];

            function getProvider(url) {
                for (var i = 0;
                     i < provider.length;
                     i++) {
                    var p = provider[i];
                    if (p['reg'].test(url)) {
                        return p;
                    }
                }
                return undefined;
            }

            var cfg = editor.get("pluginConfig");

            cfg["video"] = cfg["video"] || {};

            var videoCfg = cfg["video"];

            if (videoCfg['providers']) {
                provider.push.apply(provider, videoCfg['providers']);
            }

            videoCfg.getProvider = getProvider;

            dataFilter && dataFilter.addRules({
                elements:{
                    'object':function (element) {
                        var classId = element.getAttribute("classid"), i;
                        var childNodes = element.childNodes;
                        if (!classId) {

                            // Look for the inner <embed>
                            for (i = 0; i < childNodes.length; i++) {
                                if (childNodes[ i ].name == 'embed') {
                                    if (!flashUtils.isFlashEmbed(childNodes[ i ])) {
                                        return null;
                                    }
                                    if (getProvider(childNodes[ i ].getAttribute("src"))) {
                                        return dataProcessor.createFakeParserElement(element,
                                            CLS_VIDEO, TYPE_VIDEO, true);
                                    }
                                }
                            }
                            return null;
                        }
                        for (i = 0; i < childNodes.length; i++) {
                            var c = childNodes[ i ];
                            if (c.nodeName == 'param' &&
                                c.getAttribute("name").toLowerCase() == "movie") {
                                if (getProvider(c.getAttribute("value"))) {
                                    return dataProcessor.createFakeParserElement(element,
                                        CLS_VIDEO, TYPE_VIDEO, true);
                                }
                            }
                        }

                    },

                    'embed':function (element) {
                        if (!flashUtils.isFlashEmbed(element))
                            return null;
                        if (getProvider(element.getAttribute("src"))) {
                            return dataProcessor.createFakeParserElement(element,
                                CLS_VIDEO, TYPE_VIDEO, true);
                        }

                    }
                    //4 比 flash 的优先级 5 高！
                }}, 4);


            var flashControl = new FlashBaseClass({
                editor:editor,
                cls:CLS_VIDEO,
                type:TYPE_VIDEO,
                contextMenuHandlers:{
                    "视频属性":function () {
                        var selectedEl = this.selectedEl;
                        if (selectedEl) {
                            flashControl.show(selectedEl);
                        }
                    }
                }
            });

            editor.addButton({
                contentCls:"ke-toolbar-video",
                title:"插入视频",
                mode:KE.WYSIWYG_MODE
            }, {
                offClick:function () {
                    flashControl.show();
                }
            });
        }
    };


}, {
    requires:['editor', '../flashCommon/utils', '../flashCommon/baseClass']
});