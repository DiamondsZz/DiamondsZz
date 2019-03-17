'use strict';

//
// 试着封装一些常用工具，水平有限！！！
(function (window, document) {
    function DiamondsZz() {
    }

    DiamondsZz.prototype = {
        constructor: DiamondsZz,

        //获取滚动的头部距离和左边距离
        scroll: function () {
            if (window.pageYOffset !== null) {
                return {
                    top: window.pageYOffset, //IE8及更早IE不支持该属性
                    left: window.pageXOffset
                }
            }
            else if (document.compatMode === "CSS1Compat") { // 判断浏览器的渲染模式

                return { //W3C标准模式
                    top: document.documentElement.scrollTop,
                    left: document.documentElement.scrollLeft
                }
            }

            return {   //混杂模式
                top: document.body.scrollTop,
                left: document.body.scrollLeft
            }
        },

        //获取屏幕的宽度和高度
        client: function () {
            if (window.innerWidth) { // ie9+ 最新的浏览器
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            } else if (document.compatMode === "CSS1Compat") { // W3C
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            }

            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        },

        // 获取css的样式值(obj.style只可以获取内联样式)
        getCSSAttrValue: function (obj, attr) {
            if (obj.currentStyle) { // IE 和 opera
                return obj.currentStyle[attr];
            } else {
                return window.getComputedStyle(obj)[attr];
            }
        },

        //深拷贝（利用递归实现）
        deepCopy: function (fromObj, toObj) {
            for (var key in fromObj) {
                var fromValue = fromObj[key];
                if (typeof fromValue !== 'object')  //判断是否为复杂的数据类型
                    toObj[key] = fromObj[key];
                else {
                    var _Obj = new fromValue.constructor;
                    deepCopy(fromValue, _Obj);
                    toObj[key] = _Obj;
                }
            }
        },

    };
    window.DiamondsZz = new DiamondsZz();
})(window, document);