/**
 * @fileOverview 图像放大区域
 */
KISSY.add("imagezoom/zoomer", function (S, Node, undefined) {
    var STANDARD = 'standard',
        INNER = 'inner',
        round = Math.round,
        min = Math.min;

    function Zoomer() {
        var self = this,
            tmp;

        if (!self.get("bigImageWidth") || !self.get("bigImageHeight")) {
            S.error("bigImageWidth/bigImageHeight in ImageZoom must be set!");
        }

        // 预加载大图
        tmp = self.get('bigImageSrc');

        if (tmp && self.get('preload')) {
            new Image().src = tmp;
        }

        // 两种显示效果切换标志
        self._isInner = self.get('type') === INNER;
    }

    Zoomer.ATTRS = {

        elCls:{
            value:'ks-imagezoom-viewer'
        },
        /**
         * 显示类型
         * @type {string}
         */
        type:{
            value:STANDARD   // STANDARD  or INNER
        },
        /**
         * 是否预加载大图
         * @type {boolean}
         */
        preload:{
            value:true
        },

        /**
         * 大图路径, 默认取触点上的 data-ks-imagezoom 属性值
         * @type {string}
         */
        bigImageSrc:{
            valueFn:function () {
                var img = this.get('imageNode');

                if (img) {
                    return img.attr('data-ks-imagezoom');
                }
            }
        },

        /**
         * 大图高宽
         * @type {number}
         */
        bigImageWidth:{},

        bigImageHeight:{},

        /**
         * 保存当前鼠标位置
         */
        currentMouse:{},

        lensClass:{
            value:'ks-imagezoom-lens'
        },

        // 设为属性，缓存结果
        lensHeight:{},
        lensWidth:{},
        lensTop:{},
        lensLeft:{}
    };

    S.augment(Zoomer, {
        __renderUI:function () {
            var self = this,
                contentEl = self.get("contentEl"),
                bigImage;

            bigImage = self.bigImage = new Node('<img ' +
                'src="' +
                self.get("bigImageSrc") +
                '" />')
                .appendTo(contentEl, undefined);

            if (self._isInner) {
                // inner 位置强制修改
                self.set('align', {
                    node:self.image,
                    points:['cc', 'cc']
                });
                self._bigImageCopy = new Node(
                    '<img src="' +
                        self.image.attr('src') +
                        '" width="' +
                        self.get('bigImageWidth')
                        + '" ' +
                        'height="' +
                        self.get('bigImageHeight') +
                        '"' +
                        '/>')
                    .prependTo(contentEl, undefined);
            }
            // 标准模式, 添加镜片
            else {
                self.lens = new Node('<span class="' + self.get("lensClass") + '"></span>')
                    .appendTo(self.imageWrap, undefined).hide();
            }

            self.loading();

            // 大图加载完毕后更新显示区域
            imgOnLoad(bigImage, function () {
                self.unloading();
                if (self._bigImageCopy) {
                    self._bigImageCopy.remove();
                    self._bigImageCopy = null;
                }
            });
        },

        __bindUI:function () {
            var self = this,
                body = S.one("body");
            self.on('afterVisibleChange', function (ev) {
                var isVisible = ev.newVal;
                if (isVisible) {
                    if (self._isInner) {
                        self._anim(0.4);
                    }
                    body.on('mousemove', self._mouseMove, self);
                } else {
                    hide(self.lens);
                    body.detach('mousemove', self._mouseMove, self);
                }
            });
        },

        __destructor:function () {
            var self = this, body = S.one("body");
            body.detach('mousemove', self._mouseMove, self);
        },

        /**
         * 设置镜片大小
         */
        _setLensSize:function () {
            var self = this,
                rw = self.get('width'),
                rh = self.get('height'),
                bw = self.get('bigImageWidth'),
                bh = self.get('bigImageHeight'),
                w = self.get('imageWidth'),
                h = self.get('imageHeight');

            // 考虑放大可视区域，大图，与实际小图
            // 镜片大小和小图的关系相当于放大可视区域与大图的关系
            // 计算镜片宽高, vH / bigImageH = lensH / imageH
            self.set('lensWidth', min(round(w * rw / bw), w));
            self.set('lensHeight', min(round(h * rh / bh), h));
        },
        /**
         * 随着鼠标移动, 设置镜片位置
         * @private
         */
        _setLensOffset:function (ev) {
            var self = this;

            self._setLensSize();

            ev = ev || self.get('currentMouse');

            if (!ev) {
                return;
            }

            var rl = self.get('imageLeft'), rt = self.get('imageTop'),
                rw = self.get('imageWidth'), rh = self.get('imageHeight'),
                lensWidth = self.get('lensWidth'), lensHeight = self.get('lensHeight'),
                lensLeft = ev.pageX - lensWidth / 2, lensTop = ev.pageY - lensHeight / 2;

            if (lensLeft <= rl) {
                lensLeft = rl;
            } else if (lensLeft >= rw + rl - lensWidth) {
                lensLeft = rw + rl - lensWidth;
            }

            if (lensTop <= rt) {
                lensTop = rt;
            } else if (lensTop >= rh + rt - lensHeight) {
                lensTop = rh + rt - lensHeight;
            }
            self.set('lensLeft', lensLeft);
            self.set('lensTop', lensTop);
        },

        _mouseMove:function (ev) {
            var self = this,
                rl = self.get('imageLeft'), rt = self.get('imageTop'),
                rw = self.get('imageWidth'), rh = self.get('imageHeight');

            if (ev.pageX > rl &&
                ev.pageX < rl + rw &&
                ev.pageY > rt &&
                ev.pageY < rt + rh) {
                self.set('currentMouse', ev);
            } else {
                // 移出
                self.hide();
            }
        },

        /**
         * Inner 效果中的放大动画
         * @param {number} seconds
         * @private
         */
        _anim:function (seconds) {
            var self = this,
                rl = self.get('imageLeft'), rt = self.get('imageTop'),
                rw = self.get('imageWidth'), rh = self.get('imageHeight'),
                bw = self.get('bigImageWidth'), bh = self.get('bigImageHeight'),
                max_left = -round((self.get('lensLeft') - rl) * bw / rw),
                max_top = -round((self.get('lensTop') - rt) * bh / rh),
                tmpWidth, tmpHeight;

            self.bigImage.stop();

            // set min width and height
            self.bigImage.css({
                width:rw,
                height:rh,
                left:0,
                top:0
            });

            if (self._bigImageCopy) {
                self._bigImageCopy.css({
                    width:rw,
                    height:rh,
                    left:0,
                    top:0
                });
            }


            tmpWidth = rw + ( bw - rw);
            tmpHeight = rh + (bh - rh);


            self.bigImage.animate({
                width:tmpWidth,
                height:tmpHeight,
                left:max_left,
                top:max_top
            }, seconds);

            if (self._bigImageCopy) {
                self._bigImageCopy.animate({
                    width:tmpWidth,
                    height:tmpHeight,
                    left:max_left,
                    top:max_top
                }, seconds);
            }
        },

        _uiSetCurrentMouse:function (ev) {
            var self = this,
                lt;

            if (!ev ||
                !("pageX" in ev) ||
                !self.bigImage ||
                self.bigImage.isRunning() ||
                !self.get("hasZoom")) {
                return;
            }

            // 更新 lens 位置
            show(self.lens);
            self._setLensOffset(ev);

            // 镜片相对于小图的偏移相当于放大可视区域相对于大图的偏移（即 -(大图相对于放大可视区域的偏移)）
            lt = {

                left:-round((self.get('lensLeft') - self.get('imageLeft')) *
                    self.get('bigImageWidth') / self.get('imageWidth')),


                top:-round((self.get('lensTop') - self.get('imageTop'))
                    * self.get('bigImageHeight') / self.get('imageHeight'))

            };

            self._bigImageCopy && self._bigImageCopy.css(lt);
            self.bigImage.css(lt);
        },

        _uiSetLensWidth:function (v) {
            this.lens && this.lens.width(v);
        },
        _uiSetLensHeight:function (v) {
            this.lens && this.lens.height(v);
        },
        _uiSetLensTop:function (v) {
            this.lens && this.lens.offset({ 'top':v });
        },
        _uiSetLensLeft:function (v) {
            this.lens && this.lens.offset({ 'left':v });
        },

        _uiSetBigImageWidth:function (v) {
            var self = this;
            v && self.bigImage && self.bigImage.width(v);
            v && self._bigImageCopy && self._bigImageCopy.width(v);
        },
        _uiSetBigImageHeight:function (v) {
            var self = this;
            v && self.bigImage && self.bigImage.height(v);
            v && self._bigImageCopy && self._bigImageCopy.height(v);
        },
        _uiSetBigImageSrc:function (v) {
            v && this.bigImage && this.bigImage.attr('src', v);

        },

        /**
         * 改变小图元素的 src
         * @param {String} src
         */
        changeImageSrc:function (src) {
            var self = this;
            self.image.attr('src', src);
            self._uiSetHasZoom(self.get("hasZoom"));
            self.loading();
        }
    });

    function show(obj) {
        obj && obj.show();
    }

    function hide(obj) {
        obj && obj.hide();
    }

    function imgOnLoad(img, callback) {
        var imgElem = img[0];
        // 浏览器缓存时, complete 为 true
        if ((imgElem && imgElem.complete && imgElem.clientWidth)) {
            callback();
            return;
        }
        // 1) 图尚未加载完毕，等待 onload 时再初始化 2) 多图切换时需要绑定load事件来更新相关信息

        imgElem.onload = function () {
            setTimeout(callback, 100);
        }
    }

    Zoomer.__imgOnLoad = imgOnLoad;
    return Zoomer;
}, {
    requires:["node"]
});

/**
 * yiminghe@gmail.com - 2012.05.04
 *  - bigImageWidth/Height must be set!
 */