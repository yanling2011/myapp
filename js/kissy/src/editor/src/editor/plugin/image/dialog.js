/**
 * image dialog (support upload and remote)
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/image/dialog", function (S, KE, Overlay4E, Switchable, Select) {
    var dtd = KE.XHTML_DTD,
        DOM = S.DOM,
        UA = S.UA,
        JSON = S.JSON,
        Node = S.Node,
        Event = S.Event,
        HTTP_TIP = "http://",
        AUTOMATIC_TIP = "自动",
        MARGIN_DEFAULT = 10,
        IMAGE_DIALOG_BODY_HTML = "<div class='ke-image-wrap'>" +
            "<ul class='ke-tabs ks-clear ks-switchable-nav'>" +
            "<li " +
            "class='ks-active' " +
            "" +
            "hide" +
            "focus" +
            "='hide" +
            "focus'>" +
            "网络图片" +
            "</li>" +
            "<li " +
            "hide" +
            "focus" +
            "='hide" +
            "focus'>" +
            "本地上传" +
            "</li>" +
            "</ul>" +
            "<div style='" +
            "padding:12px 20px 5px 20px;'>" +
            "<div class='ke-image-tabs-content-wrap ks-switchable-content' " +
            ">" +
            "<div>" +
            "<label>" +
            "<span " +
            "class='ke-image-title'" +
            ">" +
            "图片地址： " +
            "</span>" +
            "<input " +
            " data-verify='^(https?:/)?/[^\\s]+$' " +
            " data-warning='网址格式为：http:// 或 /' " +
            "class='ke-img-url ke-input' " +
            "style='width:390px;vertical-align:middle;' " +
            "/>" +
            "</label>" +
            "</div>" +
            "<div style='position:relative;display: none'>" +
            "<form class='ke-img-upload-form' method='post'>" +
            "<p style='zoom:1;'>" +
            "<input class='ke-input ke-img-local-url' " +
            "readonly='readonly' " +
            "style='margin-right: 15px; " +
            "vertical-align: middle; " +
            "width: 368px;" +
            "color:#969696;'/>" +
            "<a " +
            "style='padding:3px 11px;" +
            "position:absolute;" +
            "left:390px;" +
            "top:0px;" +
            "z-index:1;' " +
            "class='ke-image-up ke-button'>浏览...</a>" +
            "</p>" +
            "<div class='ke-img-up-extraHtml'>" +
            "</div>" +
            "</form>" +
            "</div>" +
            "</div>" +
            "<table " +
            "style='width:100%;margin-top:8px;' " +
            "class='ke-img-setting'>" +
            "<tr>" +
            "<td>" +
            "<label>" +
            "宽度： " +
            "<input " +
            " data-verify='^(" + AUTOMATIC_TIP + "|((?!0$)\\d+))?$' " +
            " data-warning='宽度请输入正整数' " +
            "class='ke-img-width ke-input' " +
            "style='vertical-align:middle;width:60px' " +
            "/> 像素 </label>" +
            "</td>" +
            "<td>" +
            "<label>" +
            "高度： " +
            "<input " +
            " data-verify='^(" + AUTOMATIC_TIP + "|((?!0$)\\d+))?$' " +
            " data-warning='高度请输入正整数' " +
            "class='ke-img-height ke-input' " +
            "style='vertical-align:middle;width:60px' " +
            "/> 像素 </label>" +
            "<label>" +
            "<input " +
            "type='checkbox' " +
            "class='ke-img-ratio' " +
            "style='vertical-align:middle;" +
            "margin-left:5px;" +
            "' " +
            "checked='checked'/>" +
            " 锁定高宽比" +
            "</label>" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            "<label>" +
            "对齐：" +
            "<select class='ke-img-align' title='对齐'>" +
            "<option value=''>无</option>" +
            "<option value='left'>左对齐</option>" +
            "<option value='right'>右对齐</option>" +
            "</select>" +
            "</label>" +
            "</td>" +
            "<td><label>" +
            "间距： " +
            "<input " +
            "" +
            " data-verify='^\\d+$' " +
            " data-warning='间距请输入非负整数' " +
            "class='ke-img-margin ke-input' style='width:60px' value='"
            + MARGIN_DEFAULT + "'/> 像素" +
            "</label>" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td colspan='2' style='padding-top: 6px'>" +
            "<label>" +
            "链接网址： " +
            "<input " +
            "class='ke-img-link ke-input' " +
            "style='width:235px;vertical-align:middle;' " +
            " data-verify='^(?:(?:\\s*)|(?:https?://[^\\s]+)|(?:#.+))$' " +
            " data-warning='请输入合适的网址格式' " +
            "/>" +
            "</label>" +
            "<label>" +
            "<input " +
            "class='ke-img-link-blank' " +
            "style='vertical-align:middle;" +
            "margin-left:5px;" +
            "' " +
            "type='checkbox'/>" +
            " &nbsp; 在新窗口打开链接" +
            "</label>" +
            "</td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</div>",

        IMAGE_DIALOG_FOOT_HTML = "<div style='padding:5px 20px 20px;'>" +
            "<a " +
            "href='javascript:void(\'确定\')' " +
            "class='ke-img-insert ke-button' " +
            "style='margin-right:30px;'>确定</a> " +
            "<a  " +
            "href='javascript:void(\'取消\')' " +
            "class='ke-img-cancel ke-button'>取消</a></div>",

        warning = "请点击浏览上传图片",

        valInput = KE.Utils.valInput;

    function findAWithImg(img) {
        var ret = img.parent();
        while (ret) {
            var name = ret._4e_name();
            if (name == "a") {
                return ret;
            }
            if (dtd.$block[name] || dtd.$blockLimit[name]) {
                return null;
            }
            ret = ret.parent();
        }
        return null;
    }


    function ImageDialog(editor) {
        var self = this;
        self.editor = editor;
        self.imageCfg = editor.get("pluginConfig")["image"] || {};
        self.cfg = self.imageCfg["upload"] || null;
        self.suffix = self.cfg && self.cfg["suffix"] || "png,jpg,jpeg,gif";
        // 不要加g：http://yiminghe.javaeye.com/blog/581347
        self.suffix_reg = new RegExp(self.suffix.split(/,/).join("|") + "$", "i");
        self.suffix_warning = "只允许后缀名为" + self.suffix + "的图片";
    }

    S.augment(ImageDialog, {
        _prepare:function () {
            var self = this;
            self.dialog = self.d = new Overlay4E.Dialog({
                autoRender:true,
                width:500,
                headerContent:"图片",
                bodyContent:IMAGE_DIALOG_BODY_HTML,
                footerContent:IMAGE_DIALOG_FOOT_HTML,
                mask:true
            });

            var content = self.d.get("el"),
                cancel = content.one(".ke-img-cancel"),
                ok = content.one(".ke-img-insert"),
                verifyInputs = KE.Utils.verifyInputs,
                commonSettingTable = content.one(".ke-img-setting");
            self.uploadForm = content.one(".ke-img-upload-form");
            self.imgLocalUrl = content.one(".ke-img-local-url");
            self.tab = new Switchable['Tabs'](self.d.get("body")[0], {
                "triggerType":"click"
            });
            self.imgLocalUrl.val(warning);
            self.imgUrl = content.one(".ke-img-url");
            self.imgHeight = content.one(".ke-img-height");
            self.imgWidth = content.one(".ke-img-width");
            self.imgRatio = content.one(".ke-img-ratio");
            self.imgAlign = Select.decorate(content.one(".ke-img-align"));
            self.imgMargin = content.one(".ke-img-margin");
            self.imgLink = content.one(".ke-img-link");
            self.imgLinkBlank = content.one(".ke-img-link-blank");
            var placeholder = KE.Utils.placeholder;
            placeholder(self.imgUrl, HTTP_TIP);
            placeholder(self.imgHeight, AUTOMATIC_TIP);
            placeholder(self.imgWidth, AUTOMATIC_TIP);
            placeholder(self.imgLink, "http://");
            self.imgHeight.on("keyup", function () {
                var v = parseInt(valInput(self.imgHeight));
                if (!v ||
                    !self.imgRatio[0].checked ||
                    self.imgRatio[0].disabled ||
                    !self.imgRatioValue) {
                    return;
                }
                valInput(self.imgWidth, Math.floor(v * self.imgRatioValue));
            });
            self.imgWidth.on("keyup", function () {
                var v = parseInt(valInput(self.imgWidth));
                if (!v ||
                    !self.imgRatio[0].checked ||
                    self.imgRatio[0].disabled ||
                    !self.imgRatioValue) {
                    return;
                }
                valInput(self.imgHeight, Math.floor(v / self.iimgRatioValue));
            });

            cancel.on("click", function (ev) {
                self.d.hide();
                ev.halt();
            });

            var loadingCancel = new Node("<a class='ke-button' style='position:absolute;" +
                "z-index:" +
                KE.baseZIndex(KE.zIndexManager.LOADING_CANCEL) + ";" +
                "left:-9999px;" +
                "top:-9999px;" +
                "'>取消上传</a>").appendTo(document.body, undefined);

            /**
             * 取消当前iframe的上传
             */
            var uploadIframe = null;
            loadingCancel.on("click", function (ev) {
                ev && ev.halt();
                self.d.unloading();
                if (uploadIframe) {
                    Event.remove(uploadIframe, "load");
                    DOM.remove(uploadIframe);
                }
                loadingCancel.css({
                    left:-9999,
                    top:-9999
                });
                uploadIframe = null;
            });

            function getFileSize(file) {
                if (file['files']) {
                    return file['files'][0].size;
                } else if (1 > 2) {
                    //ie 会安全警告
                    try {
                        var fso = new ActiveXObject("Scripting.FileSystemObject"),
                            file2 = fso['GetFile'](file.value);
                        return file2.size;
                    } catch (e) {
                        S.log(e.message);
                    }
                }
                return 0;
            }

            ok.on("click", function (ev) {
                ev.halt();
                if (self.tab['activeIndex'] == 1 && self.cfg) {

                    if (!verifyInputs(commonSettingTable.all("input"))) {
                        return;
                    }

                    if (self.imgLocalUrl.val() == warning) {
                        alert("请先选择文件!");
                        return;
                    }

                    if (!self.suffix_reg.test(self.imgLocalUrl.val())) {
                        alert(self.suffix_warning);
                        // 清除已选文件 ie 不能使用 val("")
                        self.uploadForm[0].reset();
                        self.imgLocalUrl.val(warning);
                        return;
                    }

                    var size = (getFileSize(self.fileInput[0]));

                    if (sizeLimit && sizeLimit < (size / 1000)) {
                        alert("上传图片最大：" + sizeLimit / 1000 + "M");
                        return;
                    }

                    self.d.loading();

                    uploadIframe = KE.Utils.doFormUpload({
                        form:self.uploadForm,
                        callback:function (r) {
                            uploadIframe = null;
                            loadingCancel.css({
                                left:-9999,
                                top:-9999
                            });
                            var data = S.trim(r.responseText)
                                .replace(/\r|\n/g, "");
                            self.d.unloading();
                            try {
                                //ie parse error,不抛异常
                                data = JSON.parse(data);
                            } catch (e) {
                                S.log(data);
                                data = null;
                            }
                            if (!data) data = {error:"服务器出错，请重试"};
                            if (data.error) {
                                alert(data.error);
                                return;
                            }
                            valInput(self.imgUrl, data['imgUrl']);
                            // chrome 中空 iframe 的 img 请求 header 中没有 refer
                            // 在主页面先请求一次，带入 header
                            new Image().src = data['imgUrl'];
                            self._insert();
                        }
                    }, self.cfg['serverParams'], self.cfg['serverUrl']);

                    var loadingMaskEl = self.d.get("el"),
                        offset = loadingMaskEl.offset(),
                        width = loadingMaskEl[0].offsetWidth,
                        height = loadingMaskEl[0].offsetHeight;

                    loadingCancel.css({
                        left:(offset.left + width / 2.5),
                        top:(offset.top + height / 1.5)
                    });

                } else {
                    if (!verifyInputs(content.all("input")))
                        return;
                    self._insert();
                }
            });

            if (self.cfg) {
                if (self.cfg['extraHtml']) {
                    content.one(".ke-img-up-extraHtml")
                        .html(self.cfg['extraHtml']);
                }
                var ke_image_up = content.one(".ke-image-up"),
                    sizeLimit = self.cfg && self.cfg['sizeLimit'];

                self.fileInput = new Node("<input " +
                    "type='file' " +
                    "style='position:absolute;" +
                    "cursor:pointer;" +
                    "left:" +
                    (UA['ie'] ? "360" : (UA["chrome"] ? "319" : "369")) +
                    "px;" +
                    "z-index:2;" +
                    "top:0px;" +
                    "height:26px;' " +
                    "size='1' " +
                    "name='" + (self.cfg['fileInput'] || "Filedata") + "'/>")
                    .insertAfter(self.imgLocalUrl);
                if (sizeLimit)
                    warning = "单张图片容量不超过 " + (sizeLimit / 1000) + " M";
                self.imgLocalUrl.val(warning);
                self.fileInput.css("opacity", 0);
                self.fileInput.on("mouseenter", function () {
                    ke_image_up.addClass("ke-button-hover");
                });
                self.fileInput.on("mouseleave", function () {
                    ke_image_up.removeClass("ke-button-hover");
                });
                self.fileInput.on("change", function () {
                    var file = self.fileInput.val();
                    //去除路径
                    self.imgLocalUrl.val(file.replace(/.+[\/\\]/, ""));
                });

                if (self.imageCfg['remote'] === false) {
                    self.tab.remove(0);
                }
            }
            else {
                self.tab.remove(1);
            }

            self._prepare = S.noop;
        },

        _insert:function () {
            var self = this,
                url = valInput(self.imgUrl),
                img,
                height = parseInt(valInput(self.imgHeight)),
                width = parseInt(valInput(self.imgWidth)),
                align = self.imgAlign.val(),
                margin = parseInt(self.imgMargin.val()),
                style = '';

            if (height) {
                style += "height:" + height + "px;";
            }
            if (width) {
                style += "width:" + width + "px;";
            }
            if (align) {
                style += "float:" + align + ";";
            }
            if (!isNaN(margin)) {
                style += "margin:" + margin + "px;";
            }

            self.d.hide();

            /**
             * 2011-01-05
             * <a><img></a> 这种结构，a不要设成 position:absolute
             * 否则img select 不到？!!: editor.getSelection().selectElement(img) 选择不到
             */
            if (self.selectedEl) {
                img = self.selectedEl;
                self.editor.execCommand("save");
                self.selectedEl.attr({
                    "src":url,
                    //注意设置，取的话要从 _ke_saved_src 里取
                    "_ke_saved_src":url,
                    "style":style
                });
            } else {
                img = new Node("<img " +
                    (style ? ("style='" +
                        style +
                        "'") : "") +
                    " src='" +
                    url +
                    "' " +
                    "_ke_saved_src='" +
                    url +
                    "' alt='' />", null, self.editor.get("document")[0]);
                self.editor.insertElement(img);
            }

            // need a breath for firefox
            // else insertElement(img); img[0].parentNode==null
            setTimeout(function () {
                var link = findAWithImg(img),
                    linkVal = S.trim(valInput(self.imgLink)),
                    sel = self.editor.getSelection(),
                    bs;
                if (link) {
                    if (linkVal) {
                        link.attr("_ke_saved_href", linkVal)
                            .attr("href", linkVal)
                            .attr("target", self.imgLinkBlank.attr("checked") ? "_blank" : "_self");
                        //editor.notifySelectionChange();
                    } else {
                        // 删除
                        bs = sel.createBookmarks();
                        link._4e_remove(true);
                    }
                } else if (linkVal) {
                    // 新增需要 bookmark，标记
                    bs = sel.createBookmarks();
                    link = new Node("<a></a>");
                    link.attr("_ke_saved_href", linkVal)
                        .attr("href", linkVal)
                        .attr("target", self.imgLinkBlank.attr("checked") ? "_blank" : "_self");
                    var t = img[0];
                    t.parentNode.replaceChild(link[0], t);
                    link.append(t);
                }
                if (bs) {
                    sel.selectBookmarks(bs);
                }

                if (self.selectedEl) {
                    self.editor.execCommand("save");
                }
            }, 100);
        },

        _update:function (_selectedEl) {
            var self = this,
                active = 0,
                resetInput = KE.Utils.resetInput;
            self.selectedEl = _selectedEl;
            if (self.selectedEl && self.imageCfg['remote'] !== false) {
                valInput(self.imgUrl, self.selectedEl.attr("src"));
                var w = self.selectedEl.width(),
                    h = self.selectedEl.height();
                valInput(self.imgHeight, h);
                valInput(self.imgWidth, w);
                self.imgAlign.val(self.selectedEl.css("float") || "none");
                var margin = parseInt(self.selectedEl.style("margin"))
                    || 0;
                self.imgMargin.val(margin);
                self.imgRatio[0].disabled = false;
                self.imgRatioValue = w / h;
                var link = findAWithImg(self.selectedEl);
                if (link) {
                    valInput(self.imgLink, link.attr("_ke_saved_href") || link.attr("href"));
                    self.imgLinkBlank.attr("checked", link.attr("target") == "_blank");
                } else {
                    resetInput(self.imgLink);
                    self.imgLinkBlank.attr("checked", true);
                }
            } else {
                if (self.tab['panels'].length == 2) {
                    active = 1;
                }
                self.imgLinkBlank.attr("checked", true);
                resetInput(self.imgUrl);
                resetInput(self.imgLink);
                resetInput(self.imgHeight);
                resetInput(self.imgWidth);
                self.imgAlign.val("none");
                self.imgMargin.val(MARGIN_DEFAULT);
                self.imgRatio[0].disabled = true;
                self.imgRatioValue = null;
            }
            self.uploadForm[0].reset();
            self.imgLocalUrl.val(warning);
            self.tab['switchTo'](active);
        },
        show:function (_selectedEl) {
            var self = this;
            self._prepare();
            self._update(_selectedEl);
            self.d.show();
        },
        destroy:function () {
            this.d.destroy();
            this.tab.destroy();
        }
    });

    return ImageDialog;
}, {
    requires:['editor', '../overlay/', 'switchable', '../select/']
});