// Array.from
if (!Array.from) {
  Array.from = (function () {
    const toStr = Object.prototype.toString;
    const isCallable = function (fn) {
      return typeof fn === `function` || toStr.call(fn) === `[object Function]`;
    };
    const toInteger = function (value) {
      const number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    const maxSafeInteger = Math.pow(2, 53) - 1;
    const toLength = function (value) {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // Свойство length метода from равно 1.
    return function from(arrayLike, ...args/* , mapFn, thisArg */) {
      // 1. Положим C равным значению this.
      const C = this;

      // 2. Положим items равным ToObject(arrayLike).
      const items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike === null) {
        throw new TypeError(`Array.from requires an array-like object - not null or undefined`);
      }

      // 4. Если mapfn равен undefined, положим mapping равным false.
      const mapFn = args.length > 1 ? args[1] : void undefined;
      let T;
      if (typeof mapFn !== `undefined`) {
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError(`Array.from: when provided, the second argument must be a function`);
        }

        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (args.length > 2) {
          T = args[2];
        }
      }

      // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).
      const len = toLength(items.length);

      // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).
      const A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Положим k равным 0.
      let k = 0;
      // 17. Пока k < len, будем повторять... (шаги с a по h)
      let kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === `undefined` ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Положим putStatus равным Put(A, "length", len, true).
      A.length = len;
      // 20. Вернём A.
      return A;
    };
  }());
}


import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';


// Matches
(function(e) {
    var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    !matches ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
            return e === th;
        });
    }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

// Closest
(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
