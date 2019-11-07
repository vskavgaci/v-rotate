import Vue from 'vue';

export default Vue.directive('rotate', {
    bind: function bind(el, binding, vnode) {

        (function () {
            var R2D = void 0,
                active = void 0,
                angle = void 0,
                center = void 0,
                init = void 0,
                rotate = void 0,
                rotation = void 0,
                start = void 0,
                startAngle = void 0,
                stop = void 0;
            active = false;
            angle = 0;
            rotation = 0;
            startAngle = 0;
            center = {
                x: 0,
                y: 0
            };
            document.ontouchmove = function (e) {
                return e.preventDefault();
            };
            init = function init() {
                if (!binding.value.hasOwnProperty('selector') || binding.value.selector === '' || binding.value.selector === undefined || el.querySelectorAll(binding.value.selector).length < 1) return false;

                el.querySelectorAll(binding.value.selector).forEach(function (_selector) {
                    _selector.addEventListener("mousedown", start, false);
                    document.addEventListener("mousemove", rotate, false);
                    document.addEventListener("mouseup", stop, false);
                });
            };

            R2D = 180 / Math.PI;

            start = function start(e) {
                var height = void 0,
                    left = void 0,
                    top = void 0,
                    width = void 0,
                    x = void 0,
                    y = void 0,
                    _ref = void 0;
                //e.preventDefault();
                _ref = el.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
                center = {
                    x: left + width / 2,
                    y: top + height / 2
                };
                x = e.clientX - center.x;
                y = e.clientY - center.y;
                startAngle = R2D * Math.atan2(y, x);
                return active = true;
            };

            rotate = function rotate(e) {
                var d = void 0,
                    x = void 0,
                    y = void 0;
                //e.preventDefault();
                x = e.clientX - center.x;
                y = e.clientY - center.y;
                d = R2D * Math.atan2(y, x);
                rotation = d - startAngle;
                if (active) {
                    var degree = angle + rotation;
                    return el.style.webkitTransform = "rotate(" + degree + "deg)";
                }
            };

            stop = function stop() {
                angle += rotation;
                vnode.context.$emit('degree', angle);
                return active = false;
            };

            init();
        }).call(this);
    }
});
