/**
 * @fileOverview menubutton
 * @author yiminghe@gmail.com
 */
KISSY.add("menubutton", function(S, MenuButton, MenuButtonRender, Select, Option) {
    MenuButton.Render = MenuButtonRender;
    MenuButton.Select = Select;
    MenuButton.Option = Option;
    return MenuButton;
}, {
    requires:['menubutton/base',
        'menubutton/menubuttonRender',
        'menubutton/select',
        'menubutton/option']
});