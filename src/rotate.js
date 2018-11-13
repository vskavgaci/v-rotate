import Vue from 'vue';

export default Vue.directive('rotate', {
    bind(el, binding, vnode){

                  (function() {
                      let R2D, active, angle, center, init, rotate, rotation, start, startAngle, stop;
                      active = false;
                      angle = 0;
                      rotation = 0;
                      startAngle = 0;
                      center = {
                          x: 0,
                          y: 0
                      };
                      document.ontouchmove = function(e) {
                          return e.preventDefault();
                      };
                      init = function() {
                          if (
                              !binding.value.hasOwnProperty('selector')
                              || binding.value.selector === ''
                              || binding.value.selector === undefined|| el.querySelectorAll(binding.value.selector).length < 1) return false;

                          el.querySelectorAll(binding.value.selector).forEach(_selector => {
                              _selector.addEventListener("mousedown", start, false);
                              document.addEventListener("mousemove", rotate, false);
                              document.addEventListener("mouseup", stop, false);
                          });

                      };

                      R2D = 180 / Math.PI;

                      start = function(e) {
                          let height, left, top, width, x, y, _ref;
                          e.preventDefault();
                          _ref = el.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
                          center = {
                              x: left + (width / 2),
                              y: top + (height / 2)
                          };
                          x = e.clientX - center.x;
                          y = e.clientY - center.y;
                          startAngle = R2D * Math.atan2(y, x);
                          return active = true;
                      };

                      rotate = function(e) {
                          let d, x, y;
                          e.preventDefault();
                          x = e.clientX - center.x;
                          y = e.clientY - center.y;
                          d = R2D * Math.atan2(y, x);
                          rotation = d - startAngle;
                          if (active) {
                              const degree = angle + rotation;
                              return el.style.webkitTransform = "rotate(" + (degree) + "deg)";
                          }
                      };

                      stop = function() {
                          angle += rotation;
                          vnode.context.$emit('degree', angle);
                          return active = false;
                      };

                      init();

                  }).call(this);
              },
});
