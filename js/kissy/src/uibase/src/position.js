/**
 * @fileOverview position and visible extension，可定位的隐藏层
 * @author yiminghe@gmail.com
 */
KISSY.add("uibase/position", function (S) {

    /**
     * make component positionable
     * @class
     * @memberOf UIBase
     */
    function Position() {
    }

    Position.ATTRS =
    /**
     * @lends UIBase.Position.prototype
     */
    {
        /**
         * 横坐标值
         * @type Number
         */
        x:{
            view:true
        },
        /**
         * 纵坐标值
         * @type Number
         */
        y:{
            view:true
        },
        /**
         * 横纵坐标值
         * @type Number[]
         */
        xy:{
            // 相对 page 定位, 有效值为 [n, m], 为 null 时, 选 align 设置
            setter:function (v) {
                var self = this,
                    xy = S.makeArray(v);

                /*
                 属性内分发特别注意：
                 xy -> x,y
                 */
                if (xy.length) {
                    xy[0] && self.set("x", xy[0]);
                    xy[1] && self.set("y", xy[1]);
                }
                return v;
            },
            /**
             * xy 纯中转作用
             */
            getter:function () {
                return [this.get("x"), this.get("y")];
            }
        },
        /**
         * z-index 值
         * @type Number
         */
        zIndex:{
            view:true
        }
    };


    Position.prototype =
    /**
     * @lends UIBase.Position.prototype
     */
    {
        /**
         * 移动到绝对位置上, move(x, y) or move(x) or move([x, y])
         * @param {Number|Number[]} x
         * @param {Number} [y]
         */
        move:function (x, y) {
            var self = this;
            if (S.isArray(x)) {
                y = x[1];
                x = x[0];
            }
            self.set("xy", [x, y]);
        }
    };

    return Position;
});