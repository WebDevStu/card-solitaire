'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * GameBoard
 * @class
 */
var Board = function () {

    /**
     * constructor function
     */
    function Board() {
        _classCallCheck(this, Board);

        this.zoneMatrix = [];
    }

    /**
     * move cards, takes x & y coordinates and adds attributes to the selected
     * card
     */


    _createClass(Board, [{
        key: 'moveCards',
        value: function moveCards(x, y) {

            // if dragging & card
            if (this.dragging && this.card) {

                // move the card
                this.card.style.position = 'fixed';
                this.card.style.left = x - 62 + 'px';
                this.card.style.top = y - 87 + 'px';
                this.card.style.zIndex = 999;
            }
        }

        /**
         * gets the zone that the card is part of
         */

    }, {
        key: 'getZone',
        value: function getZone(x, y) {

            console.log(this.zoneMatrix);

            return this.zoneMatrix.find(function (_ref) {
                var left = _ref.left;
                var top = _ref.top;
                var width = _ref.width;
                var height = _ref.height;


                var onXAxis = x >= left && x <= left + width,
                    onYAxis = y >= top && y <= top + height;

                return onXAxis && onYAxis;
            });
        }

        /**
         * drop card, cancels the dragging param and drop if into the selected
         * zone
         */

    }, {
        key: 'dropCard',
        value: function dropCard(x, y) {

            // find the zone
            this.activeZone = this.getZone(x, y);

            this.card.removeAttribute('style');

            this.dragging = false;
        }

        /**
         * starts the dragging - and marks the card that is selected
         */

    }, {
        key: 'setDragging',
        value: function setDragging(evt) {

            this.card = evt.currentTarget;
            this.previousZone = this.card.parentNode.getAttribute('data-drop');
            this.dragging = true;
        }

        /**
         * stops the dragging and nulls the card
         */

    }, {
        key: 'releaseDragging',
        value: function releaseDragging() {

            this.card = null;
            this.dragging = false;
        }

        /**
         * takes the matrix from the view
         */

    }, {
        key: 'updateMatrix',
        value: function updateMatrix(matrix) {
            this.zoneMatrix = matrix;
        }
    }]);

    return Board;
}();