/**
 * Game
 * @class
 */
class Game {

    constructor (cards, board) {

        // map cards class
        this.cards = cards;
        this.board = board;

        this.playChannels  = new Array(7);
        this.stackChannels = [[{}], [{}], [{}], [{}]];
        this.stackChannels.map(function (obj) {
            obj[0].className = 'empty';
        });

        this.setupGame();
    }


    /**
     * checks the channel
     */
    checkChannel () {

        let activeCard = this.cards.getCard(this.board.card.className),
            target,
            channel,
            lastCard;

        if (this.board.activeZone) {
            target  = this.board.activeZone.target;
            channel = target.getAttribute('data-drop');

            if (target.className.match(/stack/g)) {
                channel = this.stackChannels[channel];

                // @TODO - allow the user to move a stack

            } else {
                channel  = this.playChannels[channel];
                lastCard = channel[channel.length - 1];

                if ((lastCard.id - 1 === activeCard.id) && (lastCard.color !== activeCard.color)) {
                    console.log('we can drop here', this.board.previousZone);

                    this.removeCard(this.playChannels, this.board.previousZone, activeCard);

                    channel.push(activeCard);

                    this.render();
                }

                _.trigger('release:card');
            }
        }
    }


    /**
     * removes the car from a channel
     */
    removeCard (channel, index, card) {

        let i;

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
    setupGame () {

        let cards = 0,
            col,
            row;

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


    /**
     * render
     * @returns {Game}
     */
    //render () {
    //
    //    var template = Handlebars.compile(document.getElementById('playBoard').innerHTML);
    //
    //    this.$board.innerHTML = template({
    //        playChannels: this.playChannels,
    //        stackChannels: this.stackChannels
    //    });
    //
    //    _.trigger('rebind:events');
    //    return this;
    //}
}
