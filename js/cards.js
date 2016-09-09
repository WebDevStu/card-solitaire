/**
 * DeckOfCards
 *
 * @constructor
 */
var DeckOfCards = function () {

    this.deck = [];

    this.generateDeck();
};

// extend prototype
_.extend(DeckOfCards.prototype, {


    /**
     * colours
     */
    colors: {
        'clubs':    'black',
        'spades':   'black',
        'hearts':   'red',
        'diamonds': 'red'
    },

    /**
     * face
     */
    face: ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'],


    /**
     * suit
     */
    suit: ['clubs', 'spades', 'hearts', 'diamonds'],


    /**
     * generateDeck
     *
     * @returns {DeckOfCards}
     */
    generateDeck: function () {

        var suit,
            face;

        for (suit = 0; suit < 4; suit += 1) {

            for (face = 0; face < 13; face += 1) {

                this.deck.push({
                    id: face + 1,
                    className: this.suit[suit] + '-' + this.face[face],
                    color: this.colors[this.suit[suit]]
                });
            }
        }

        return this.shuffle();
    },


    /**
     * shuffle
     *
     * @returns {DeckOfCards}
     */
    shuffle: function () {

        var shuffled = [],
            rand,
            i;

        for (i = 0; i < 52; i += 1) {

            rand = Math.floor(Math.random() * i);

            if (rand !== i) {
                shuffled[i] = shuffled[rand];
            }

            shuffled[rand] = this.deck[i];
        }

        this.deck = shuffled;

        return this;
    },


    /**
     * getCard by class name
     *
     * @param className
     */
    getCard: function (className) {

        className = className.replace(/card\ /g, '');

        return this.deck.find(function (card) {
            return card.className === className;
        });
    }
});