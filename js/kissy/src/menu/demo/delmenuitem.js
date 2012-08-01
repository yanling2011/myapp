/**
 * @fileOverview deletable menuitem
 * @author yiminghe@gmail.com
 */
KISSY.add("menu/delmenuitem", function (S, Node, UIBase, Component, Menu, DelMenuItemRender) {
    var $ = Node.all;
    var MenuItem = Menu.Item;
    var CLS = DelMenuItemRender.CLS,
        DEL_CLS = DelMenuItemRender.DEL_CLS;

    function del(self) {
        var parent = self.get("parent");
        if (parent.fire("beforeDelete", {
            target:self
        }) === false) {
            return;
        }
        parent.removeChild(self, true);
        parent.set("highlightedItem", null);
        parent.fire("delete", {
            target:self
        });
    }

    var DelMenuItem = UIBase.create(MenuItem, {
        performActionInternal:function (e) {
            var target = $(e.target);
            // 点击了删除
            if (target.hasClass(this.getCssClassWithPrefix(DEL_CLS))) {
                del(this);
                return true;
            }
            return MenuItem.prototype.performActionInternal.call(this, e);
        },
        handleKeydown:function (e) {
            // d 键
            if (e.keyCode === Node.KeyCodes.D) {
                del(this);
                return true;
            }
        }
    }, {
        ATTRS:{
            delTooltip:{
                view:true
            }
        },
        DefaultRender:DelMenuItemRender
    });


    Component.UIStore.setUIConstructorByCssClass(CLS, {
        priority:Component.UIStore.PRIORITY.LEVEL4,
        ui:DelMenuItem
    });
    return DelMenuItem;
}, {
    requires:['node', 'uibase', 'component', 'menu', './delmenuitemrender']
});