(function () {

  'use strict';

  var Ap = Array.prototype,
    slice = Ap.slice,
    Fp = Function.prototype;

  if (!Fp.bind) {
    // PhantomJS doesn't support Function.prototype.bind natively, so polyfill it
    // whenever this module is required.
    Fp.bind = function (context) {
      var func = this,
        args = slice.call(arguments, 1);

        function bound() {
          var invokedAsConstructor = func.prototype && (this instanceof func);
          return func.apply(
            // Ignore the context paramenter when invoking the bound function
            !invokedAsConstructor && context || this,
            args.concat(slice.call(arguments))
          );
        }

        // The bound function must share the .prototype
        bound.prototype = func.prototype;

        return bound;
    };
  }

})();