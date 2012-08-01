/**
 * @fileOverview overlay
 * @author yiminghe@gmail.com
 */
KISSY.add("overlay", function (S, O, OR, D, DR, P) {
    O.Render = OR;
    D.Render = DR;
    O.Dialog = D;
    S.Dialog = D;
    O.Popup = P;
    S.Overlay = O;
    return O;
}, {
    requires:[
        "overlay/base",
        "overlay/overlayrender",
        "overlay/dialog",
        "overlay/dialogrender",
        "overlay/popup"
    ]
});