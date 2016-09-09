'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Game
 * @class
 */
var Game = function () {

    /**
     * constructor function
     *
     * @constructor
     */
    function Game(cards, board) {
        _classCallCheck(this, Game);

        // map cards class
        this.cards = cards;
        this.board = board;

        this.playChannels = new Array(7);
        this.stackChannels = [[{}], [{}], [{}], [{}]];
        this.stackChannels.map(function (obj) {
            obj[0].className = 'empty';
        });

        this.setupGame();
    }

    /**
     * checks the channel
     */


    _createClass(Game, [{
        key: 'checkChannel',
        value: function checkChannel() {

            var activeCard = this.cards.getCard(this.board.card.className),
                target = void 0,
                channel = void 0,
                lastCard = void 0;

            if (this.board.activeZone) {
                target = this.board.activeZone.target;
                channel = target.getAttribute('data-drop');

                if (target.className.match(/stack/g)) {
                    channel = this.stackChannels[channel];

                    // @TODO - allow the user to move a stack
                } else {
                    channel = this.playChannels[channel];
                    lastCard = channel[channel.length - 1];

                    if (lastCard.id - 1 === activeCard.id && lastCard.color !== activeCard.color) {
                        this.removeCard(this.playChannels, this.board.previousZone, activeCard);
                        channel.push(activeCard);
                    }

                    _.trigger('release:card');
                }
            }
        }

        /**
         * removes the car from a channel
         */

    }, {
        key: 'removeCard',
        value: function removeCard(channel, index, card) {

            var i = void 0;

            channel[index].find(function (channelCard, count) {

                if (channelCard.className === card.className) {
                    i = count;
                }
            });

            channel[index].splice(i, 1);

            try {
                channel[index][i - 1].faceUp = true;
            } catch (e) {
                console.error(e);
            }
        }

        /**
         * setup Game
         */

    }, {
        key: 'setupGame',
        value: function setupGame() {

            var cards = 0,
                col = void 0,
                row = void 0;

            // for each column
            for (col = 0; col < 7; col += 1) {

                // for each row
                for (row = 0; row < 7; row += 1) {

                    this.playChannels[col] = this.playChannels[col] || [];

                    if (this.playChannels[col].length <= col) {
                        this.playChannels[col].push(this.cards.deck[cards]);

                        cards += 1;
                    }
                }

                // turn the last card over in each play channel
                this.playChannels[col][this.playChannels[col].length - 1].faceUp = true;
            }

            console.log(this.playChannels);
            return this;
        }
    }]);

    return Game;
}();