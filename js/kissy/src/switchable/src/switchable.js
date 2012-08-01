/**
 * @fileOverview switchable
 */
KISSY.add("switchable", function (S, Switchable, Aria, Accordion, AAria, AutoPlay, AutoRender, Carousel, CAria, circular, effect, LazyLoad, Slide, Tabs) {
    var re = {
        Accordion:Accordion,
        Carousel:Carousel,
        Slide:Slide,
        Tabs:Tabs,
        "Aria":Aria
    };
    S.mix(Switchable, re);
    return Switchable;
}, {
    requires:[
        "switchable/base",
        "switchable/aria",
        "switchable/accordion/base",
        "switchable/accordion/aria",
        "switchable/autoplay",
        "switchable/autorender",
        "switchable/carousel/base",
        "switchable/carousel/aria",
        "switchable/circular",
        "switchable/effect",
        "switchable/lazyload",
        "switchable/slide/base",
        "switchable/tabs/base",
        "switchable/tabs/aria"
    ]
});
