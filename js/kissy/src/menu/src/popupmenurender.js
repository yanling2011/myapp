/**
 * @fileOverview popup menu render
 * @author yiminghe@gmail.com
 */
KISSY.add("menu/popupmenurender", function (S, UA, UIBase, MenuRender) {
    return UIBase.create(MenuRender, [
        UIBase.ContentBox.Render,
        UIBase.Position.Render,
        UA['ie'] === 6 ? UIBase.Shim.Render : null
    ], "Menu_PopupMenu_Render");
}, {
    requires:['ua', 'uibase', './menurender']
});