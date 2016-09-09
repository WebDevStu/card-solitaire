'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = {
    'clubs': 'black',
    'spades': 'black',
    'hearts': 'red',
    'diamonds': 'red'
},
    faces = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'],
    suits = ['clubs', 'spades', 'hearts', 'diamonds'];

/**
 * DeckOfCards
 *
 * @class
 */

var DeckOfCards = function () {

    /**
     * constructor function
     *
     * @constructor
     */
    function DeckOfCards() {
        _classCallCheck(this, DeckOfCards);

        this.deck = [];
        this.generateDeck();
    }

    /**
     * generates the deck of cards
     */


    _createClass(DeckOfCards, [{
        key: 'generateDeck',
        value: function generateDeck() {

            var suit = void 0,
                face = void 0;

            for (suit = 0; suit < 4; suit += 1) {

                for (face = 0; face < 13; face += 1) {

                    this.deck.push({
                        id: face + 1,
                        className: suits[suit] + '-' + faces[face],
                        color: colors[suits[suit]]
                    });
                }
            }

            return this.shuffle();
        }

        /**
         * shuffles the deck
         */

    }, {
        key: 'shuffle',
        value: function shuffle() {

            var shuffled = [],
                rand = void 0,
                i = void 0;

            for (i = 0; i < 52; i += 1) {

                rand = Math.floor(Math.random() * i);

                if (rand !== i) {
                    shuffled[i] = shuffled[rand];
                }

                shuffled[rand] = this.deck[i];
            }

            this.deck = shuffled;

            return this;
        }

        /**
         * gets the car by class name - not pretty or efficient
         */

    }, {
        key: 'getCard',
        value: function getCard(className) {

            className = className.replace(/card\ /g, '');

            return this.deck.find(function (card) {
                return card.className === className;
            });
        }
    }]);

    return DeckOfCards;
}();