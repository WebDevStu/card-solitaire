'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * view class
 *
 * @class
 */
var View = function () {

    /**
     * constructor function
     *
     * @constructor
     */
    function View(gameClass) {
        _classCallCheck(this, View);

        this.game = gameClass;
        this.$board = document.getElementById('board');
    }

    /**
     * binds the events to the dom elements
     */


    _createClass(View, [{
        key: 'bindEvents',
        value: function bindEvents() {

            var matrix = [];

            this.cards = _.toArray(this.$board.querySelectorAll('.card:not(.faceDown)'));
            this.dropZones = _.toArray(this.$board.querySelectorAll('.drop'));

            // start dragging on a cards
            this.cards.forEach(function (card) {
                card.addEventListener('mousedown', function (evt) {
                    _.trigger('set:dragging', evt);
                }, false);
            }, this);

            console.log(this.dropZones);
            // mouse over play channels
            this.dropZones.forEach(function (zone) {

                matrix.push({
                    target: zone,
                    left: zone.offsetLeft,
                    top: zone.offsetTop,
                    width: zone.clientWidth,
                    height: zone.clientHeight
                });
            });

            console.log('send matrix', matrix);
            _.trigger('update:matrix', matrix);

            // mouse up
            document.documentElement.addEventListener('mouseup', function (evt) {
                _.trigger('drop:card', evt.pageX, evt.pageY);
            }, false);

            // mouse move
            document.body.addEventListener('mousemove', function (evt) {
                _.trigger('move:card', evt.pageX, evt.pageY);
            }, false);

            return this;
        }

        /**
         * main render method, dumps a shit tonne of elements in the dom and re
         * binds events to them.
         */

    }, {
        key: 'render',
        value: function render() {

            console.log('render');

            var template = Handlebars.compile(document.getElementById('playBoard').innerHTML);

            this.$board.innerHTML = template({
                playChannels: this.game.playChannels,
                stackChannels: this.game.stackChannels
            });

            return this.bindEvents();
        }
    }]);

    return View;
}();