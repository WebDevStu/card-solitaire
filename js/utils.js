'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);

        this.events = {};
    }

    /**
     * converts to array
     *
     * @method toArray
     * @param  {Object} arrayLike [array like object]
     * @return {Array}            [definately an array]
     */


    _createClass(Utils, [{
        key: 'toArray',
        value: function toArray(arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        }

        /**
         * extend an object
         *
         * @method extend
         * @param  {Object} object [original object]
         * @param  {Object} extend [extend object]
         * @return {Object}        [the original object mutated]
         */

    }, {
        key: 'extend',
        value: function extend(object, _extend) {

            var prop;

            for (prop in _extend) {
                if (_extend.hasOwnProperty(prop)) {
                    object[prop] = object[prop] || _extend[prop];
                }
            }

            return object;
        }

        /**
         * events arregator listener
         *
         * @method listenTo
         * @param  {String} listener   [the string to listen to]
         * @param  {Function} callback [the callback when triggered]
         * @param  {Object} scope      [the scope to bind it to]
         * @return {Object}            [this underscore instance]
         */

    }, {
        key: 'listenTo',
        value: function listenTo(listener, callback, scope) {

            scope = scope || this;

            if (typeof listener === 'string') {

                callback.__scope = scope;

                _.events[listener] = _.events[listener] || [];
                _.events[listener].push(callback);
            } else if ((typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object') {

                for (var prop in listener) {
                    if (listener.hasOwnProperty(prop)) {

                        listener[prop].__scope = callback;

                        _.events[prop] = _.events[prop] || [];
                        _.events[prop].push(listener[prop]);
                    }
                }
            }

            return _;
        }

        /**
         * triggers any found callback method that is registered to listen
         *
         * @method trigger
         * @param  {String} trigger [the string id to trigger]
         * @return {Object}         [this underscore instance]
         */

    }, {
        key: 'trigger',
        value: function trigger(_trigger) {

            var toFire = _.events[_trigger] || [],
                args = _.toArray(arguments);

            toFire.forEach(function (callback) {

                if (args.length > 1) {
                    callback.apply(callback.__scope, args.slice(1));
                } else {
                    callback.call(callback.__scope);
                }
            }, this);

            return _;
        }
    }]);

    return Utils;
}();

var _ = new Utils();