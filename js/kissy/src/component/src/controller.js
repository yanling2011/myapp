/**
 * @fileOverview Base Controller class for KISSY Component.
 * @author yiminghe@gmail.com
 * @see http://martinfowler.com/eaaDev/uiArchs.html
 */
KISSY.add("component/controller", function (S, Event, UIBase, UIStore, Render) {

    function wrapperViewSetter(attrName) {
        return function (ev) {
            var value = ev.newVal,
                self = this,
                view = self.get("view");
            view && view.set(attrName, value);
        };
    }

    function wrapperViewGetter(attrName) {
        return function (v) {
            var self = this,
                view = self.get("view");
            return v === undefined ? view && view.get(attrName) : v;
        };
    }

    function initChild(self, c, elBefore) {
        // If this (parent) component doesn't have a DOM yet, call createDom now
        // to make sure we render the child component's element into the correct
        // parent element (otherwise render_ with a null first argument would
        // render the child into the document body, which is almost certainly not
        // what we want).
        self.create();
        var contentEl = self.getContentElement();
        c.__set("parent", self);
        // set 通知 view 也更新对应属性
        c.set("render", contentEl);
        c.set("elBefore", elBefore);
        // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
        if (self.get("rendered")) {
            c.render();
        }
        // 如果 parent 也没渲染，子组件 create 出来和 parent 节点关联
        // 子组件和 parent 组件一起渲染
        else {
            // 之前设好属性，view ，logic 同步还没 bind ,create 不是 render ，还没有 bindUI
            c.create();
            // 设置好，render 时插入到对应位置，这里不需要了
            // contentEl[0].insertBefore(c.get("el")[0], elBefore && elBefore[0] || null);
        }
    }

    /**
     * 不使用 valueFn，
     * 只有 render 时需要找到默认，其他时候不需要，防止莫名其妙初始化
     */
    function getDefaultView() {
        // 逐层找默认渲染器
        var self = this,
            c = self.constructor,
            attrs,
            cfg = {},
            DefaultRender;
        while (c && !DefaultRender) {
            DefaultRender = c['DefaultRender'];
            c = c.superclass && c.superclass.constructor;
        }
        if (DefaultRender) {
            /**
             * 将渲染层初始化所需要的属性，直接构造器设置过去
             */
            attrs = self['__attrs'] || {};
            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    var attrCfg = attrs[attrName], v;
                    if (attrCfg.view) {
                        // 只设置用户设置的值
                        // 考虑 c 上的默认值
                        if (( v = self.get(attrName) ) !== undefined) {
                            cfg[attrName] = v;
                        }
                    }
                }
            }
            return new DefaultRender(cfg);
        }
        return 0;
    }

    function setViewCssClassByHierarchy(self, view) {
        var constructor = self.constructor, re = [];
        while (constructor && constructor != Controller) {
            var cls = UIStore.getCssClassByUIConstructor(constructor);
            if (cls) {
                re.push(cls);
            }
            constructor = constructor.superclass && constructor.superclass.constructor;
        }
        return view.__componentClasses = re.join(" ");
    }

    function isMouseEventWithinElement(e, elem) {
        var relatedTarget = e.relatedTarget;
        // 在里面或等于自身都不算 mouseenter/leave
        return relatedTarget &&
            ( relatedTarget === elem[0] ||
                elem.contains(relatedTarget) );
    }

    /**
     * Base Controller class for KISSY Component.
     * @class
     * @memberOf Component
     * @name Controller
     * @extends UIBase
     * @extends UIBase.Box
     */
    var Controller = UIBase.create([UIBase.Box],
        /** @lends Component.Controller# */
        {

            /**
             * Get full class name for current component
             * @param classes {String} class names without prefixCls. Separated by space.
             * @function
             * @return {String} class name with prefixCls
             */
            getCssClassWithPrefix:UIStore.getCssClassWithPrefix,

            /**
             * From UIBase, Initialize this component.
             * @override
             * @protected
             */
            initializer:function () {
                // 整理属性，对纯属于 view 的属性，添加 getter setter 直接到 view
                var self = this,
                    attrs = self['__attrs'] || {};
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName)) {
                        var attrCfg = attrs[attrName];
                        if (attrCfg.view) {
                            // setter 不应该有实际操作，仅用于正规化比较好
                            // attrCfg.setter = wrapperViewSetter(attrName);
                            self.on("after" + S.ucfirst(attrName) + "Change",
                                wrapperViewSetter(attrName));
                            // 逻辑层读值直接从 view 层读
                            // 那么如果存在默认值也设置在 view 层
                            // 逻辑层不要设置 getter
                            attrCfg.getter = wrapperViewGetter(attrName);
                        }
                    }
                }
            },

            /**
             * From UIBase. Call view object to render ui elements.
             * @protected
             * @override
             */
            renderUI:function () {
                var self = this, i, child;
                self.get("view").render();
                //then render my children
                var children = self.get("children");
                for (i = 0; i < children.length; i++) {
                    child = children[i];
                    // 不在 Base 初始化设置属性时运行，防止和其他初始化属性冲突
                    initChild(self, child);
                    child.render();
                }
            },

            /**
             * From UIBase. Constructor(or get) view object to create ui elements.
             * @protected
             * @override
             */
            createDom:function () {
                var self = this,
                    view = self.get("view") || getDefaultView.call(self);
                setViewCssClassByHierarchy(self, view);
                view.create();
                if (!self.get("focusable")) {
                    view.get("el").unselectable(undefined);
                }
                self.__set("view", view);
            },

            _uiSetHandleMouseEvents:function (v) {
                var self = this,
                    el = self.get("el");
                if (v) {
                    el.on("mouseenter", self.handleMouseEnter, self);
                    el.on("mouseleave", self.handleMouseLeave, self);
                    el.on("mousedown", self.handleMouseDown, self);
                    el.on("mouseup", self.handleMouseUp, self);
                    el.on("dblclick", self.handleDblClick, self);
                } else {
                    el.detach("mouseenter", self.handleMouseEnter, self);
                    el.detach("mouseleave", self.handleMouseLeave, self);
                    el.detach("mousedown", self.handleMouseDown, self);
                    el.detach("mouseup", self.handleMouseUp, self);
                    el.detach("dblclick", self.handleDblClick, self);
                }
            },

            _uiSetFocusable:function (v) {
                var self = this,
                    el = self.getKeyEventTarget();
                if (v) {
                    el.on("focus", self.handleFocus, self);
                    el.on("blur", self.handleBlur, self);
                    el.on("keydown", self.handleKeydown, self);
                } else {
                    el.detach("focus", self.handleFocus, self);
                    el.detach("blur", self.handleBlur, self);
                    el.detach("keydown", self.handleKeydown, self);
                }
            },

            /**
             * Call view object to returns the DOM element into which child components are to be rendered,
             * or null if the container itself hasn't been rendered yet.
             * @protected
             */
            getContentElement:function () {
                var view = this.get('view');
                return view && view.getContentElement();
            },

            /**
             * 焦点所在元素即键盘事件处理元素
             */
            getKeyEventTarget:function () {
                var view = this.get('view');
                return view && view.getKeyEventTarget();
            },

            /**
             * Add the specified component as a child of current component
             * at the given 0-based index.
             * @param {Component.Controller} c  Child component to be added
             * @param {Number} [index]  0-based index at which
             * the new child component is to be inserted;
             * If not specified , the new child component will be inserted at last position.
             */
            addChild:function (c, index) {
                var self = this,
                    children = self.get("children"),
                    elBefore = null;
                if (index !== undefined) {
                    children.splice(index, 0, c);
                    elBefore = children[index] || null;
                } else {
                    children.push(c);
                }
                initChild(self, c, elBefore);
            },

            /**
             * Removed the given child from this component,and returns it.
             *
             * If destroy is true, calls {@link UIBase.#destroy} on the removed child component,
             * and subsequently detaches the child's DOM from the document.
             * Otherwise it is the caller's responsibility to
             * clean up the child component's DOM.
             *
             * @param {Component.Controller} c The child component to be removed.
             * @param {Boolean} [destroy=false] If true,
             * calls {@link UIBase.#destroy} on the removed child component.
             * @return {Component.Controller} The removed component.
             */
            removeChild:function (c, destroy) {
                var children = this.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy) {
                    c.destroy();
                }
                return c;
            },

            /**
             * Removes every child component attached to current component.
             * @see Component.Controller#removeChild
             * @param {Boolean} [destroy] If true,
             * calls {@link UIBase.#destroy} on the removed child component.
             */
            removeChildren:function (destroy) {
                var self = this,
                    i,
                    t = [].concat(self.get("children"));
                for (i = 0; i < t.length; i++) {
                    self.removeChild(t[i], destroy);
                }
                self.__set("children", []);
            },

            /**
             * Returns the child at the given index, or null if the index is out of bounds.
             * @param {Number} index 0-based index.
             * @return {Component.Controller} The child at the given index; null if none.
             */
            getChildAt:function (index) {
                var children = this.get("children");
                return children[index] || null;
            },

            /**
             * Handle dblclick events. By default, this performs its associated action by calling
             * {@link Component.Controller#performActionInternal}.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleDblClick:function (ev) {
                var self = this;
                if (self.get("disabled")) {
                    return true;
                }
                self.performActionInternal(ev);
            },

            /**
             * Called by it's container component to dispatch mouseenter event.
             * @private
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseOver:function (ev) {
                var self = this,
                    el = self.get("el");
                if (self.get("disabled")) {
                    return true;
                }
                if (!isMouseEventWithinElement(ev, el)) {
                    self.handleMouseEnter(ev);
                }
            },

            /**
             * Called by it's container component to dispatch mouseleave event.
             * @private
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseOut:function (ev) {
                var self = this,
                    el = self.get("el");
                if (self.get("disabled")) {
                    return true;
                }
                if (!isMouseEventWithinElement(ev, el)) {
                    self.handleMouseLeave(ev);
                }
            },

            /**
             * Handle mouseenter events. If the component is not disabled, highlights it.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseEnter:function (ev) {
                var self = this;
                if (self.get("disabled")) {
                    return true;
                }
                self.set("highlighted", true);
            },

            /**
             * Handle mouseleave events. If the component is not disabled, de-highlights it.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseLeave:function (ev) {
                var self = this;
                if (self.get("disabled")) {
                    return true;
                }
                self.set("active", false);
                self.set("highlighted", false);
            },

            /**
             * Handles mousedown events. If the component is not disabled,
             * If the component is activeable, then activate it.
             * If the component is focusable, then focus it,
             * else prevent it from receiving keyboard focus.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseDown:function (ev) {
                var self = this,
                    isMouseActionButton = ev.which == 1,
                    el;
                if (self.get("disabled")) {
                    return true;
                }
                if (isMouseActionButton &&
                    !self.get("disabled")) {
                    el = self.getKeyEventTarget();
                    if (self.get("activeable")) {
                        self.set("active", true);
                    }
                    if (self.get("focusable")) {
                        el[0].focus();
                        self.set("focused", true);
                    } else {
                        // firefox/chrome 不会引起焦点转移
                        var n = ev.target.nodeName;
                        n = n && n.toLowerCase();
                        // do not prevent focus when click on editable element
                        if (n != "input" && n != "textarea") {
                            ev.preventDefault();
                        }
                    }
                }
            },

            /**
             * Handles mouseup events.
             * If this component is not disabled, performs its associated action by calling
             * {@link Component.Controller#performActionInternal}, then deactivates it.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleMouseUp:function (ev) {
                var self = this;
                if (self.get("disabled")) {
                    return true;
                }
                // 左键
                if (self.get("active") && ev.which == 1) {
                    self.performActionInternal(ev);
                    self.set("active", false);
                }
            },

            /**
             * Handles focus events. Style focused class.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleFocus:function (ev) {
                this.set("focused", true);
            },

            /**
             * Handles blur events. Remove focused class.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleBlur:function (ev) {
                this.set("focused", false);
            },

            /**
             * Handle enter keydown event to {@link Component.Controller#performActionInternal}.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleKeyEventInternal:function (ev) {
                if (ev.keyCode == Event.KeyCodes.ENTER) {
                    return this.performActionInternal(ev);
                }
            },

            /**
             * Handle keydown events.
             * If the component is not disabled, call {@link Component.Controller#handleKeyEventInternal}
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            handleKeydown:function (ev) {
                var self = this;
                if (self.get("disabled")) {
                    return true;
                }
                if (self.handleKeyEventInternal(ev)) {
                    ev.halt();
                }
            },

            /**
             * Performs the appropriate action when this component is activated by the user.
             * @protected
             * @param {Event.Object} ev DOM event to handle.
             */
            performActionInternal:function (ev) {
            },

            destructor:function () {
                var self = this,
                    i,
                    children = self.get("children");
                for (i = 0; i < children.length; i++) {
                    children[i].destroy();
                }
                var view = self.get("view");
                if (view) {
                    view.destroy();
                }
            }
        },
        {
            ATTRS:/**
             * @lends Component.Controller#
             */
            {

                /**
                 * Enables or disables mouse event handling for the component.
                 * Containers may set this attribute to disable mouse event handling
                 * in their child component.
                 * Default : true.
                 * @type Boolean
                 */
                handleMouseEvents:{
                    value:true
                },

                /**
                 * Whether this component can get focus.
                 * Default : true.
                 * @type Boolean
                 */
                focusable:{
                    /*
                     observer synchronization , model 分成两类：
                     view 负责监听 view 类 model 变化更新界面
                     control 负责监听 control 类变化改变逻辑
                     problem : Observer behavior is hard to understand and debug because it's implicit behavior.

                     Keeping screen state and session state synchronized is an important task
                     Data Binding.

                     In general data binding gets tricky
                     because if you have to avoid cycles where a change to the control,
                     changes the record set, which updates the control,
                     which updates the record set....
                     The flow of usage helps avoid these -
                     we load from the session state to the screen when the screen is opened,
                     after that any changes to the screen state propagate back to the session state.
                     It's unusual for the session state to be updated directly once the screen is up.
                     As a result data binding might not be entirely bi-directional -
                     just confined to initial upload and
                     then propagating changes from the controls to the session state.
                     */
                    view:true,
                    value:true
                },

                /**
                 * Whether this component can be activated.
                 * Default : true.
                 * @type Boolean
                 */
                activeable:{
                    value:true
                },

                /**
                 * Whether this component has focus.
                 * @type Boolean
                 */
                focused:{
                    view:true
                },

                /**
                 * Whether this component is activated.
                 * @type Boolean
                 */
                active:{
                    view:true
                },

                /**
                 * Whether this component is highlighted.
                 * @type Boolean
                 */
                highlighted:{
                    view:true
                },

                /**
                 * Array of child components
                 * @type Component.Controller[]
                 */
                children:{
                    value:[]
                },

                /**
                 * This component's prefix css class.
                 * @type String
                 */
                prefixCls:{
                    view:true,
                    value:"ks-"
                },

                /**
                 * This component's parent component.
                 * @type Component.Controller
                 */
                parent:{
                },

                /**
                 * Renderer used to render this component.
                 * @type Component.Render
                 */
                view:{
                },

                /**
                 * Whether this component is disabled.
                 * @type Boolean
                 */
                disabled:{
                    view:true
                }
            },

            DefaultRender:Render
        },
        "Component_Controller"
    );

    return Controller;
}, {
    requires:['event', 'uibase', './uistore', './render']
});
/**
 *  Note:
 *  控制层元属性配置中 view 的作用
 *   - 如果没有属性变化处理函数，自动生成属性变化处理函数，自动转发给 view 层
 *   - 如果没有指定 view 层实例，在生成默认 view 实例时，所有用户设置的 view 的属性都转到默认 view 实例中
 **/