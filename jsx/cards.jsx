
const
    colors = {
        'clubs':    'black',
        'spades':   'black',
        'hearts':   'red',
        'diamonds': 'red'
    },
    faces = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'],
    suits = ['clubs', 'spades', 'hearts', 'diamonds'];

/**
 * DeckOfCards
 *
 * @class
 */
class DeckOfCards {

    /**
     * constructor function
     *
     * @constructor
     */
    constructor () {

        this.deck = [];
        this.generateDeck();
    }


    /**
     * generates the deck of cards
     */
    generateDeck () {

        let suit,
            face;

        for (suit = 0; suit < 4; suit += 1) {

            for (face = 0; face < 13; face += 1) {

                this.deck.push({
                    id:        face + 1,
                    className: suits[suit] + '-' + faces[face],
                    color:     colors[suits[suit]]
                });
            }
        }

        return this.shuffle();
    }


    /**
     * shuffles the deck
     */
    shuffle () {

        let shuffled = [],
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
    }


    /**
     * gets the car by class name - not pretty or efficient
     */
    getCard (className) {

        className = className.replace(/card\ /g, '');

        return this.deck.find((card) => {
            return card.className === className;
        });
    }
}
