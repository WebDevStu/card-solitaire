
/**
 * view class
 *
 * @class
 */
class View {

    /**
     * constructor function
     *
     * @constructor
     */
    constructor (gameClass) {

        this.game   = gameClass;
        this.$board = document.getElementById('board');
    }


    /**
     * binds the events to the dom elements
     */
    bindEvents () {

        let matrix = [];

        this.cards     = _.toArray(this.$board.querySelectorAll('.card:not(.faceDown)'));
        this.dropZones = _.toArray(this.$board.querySelectorAll('.drop'));

        // start dragging on a cards
        this.cards.forEach((card) => {
            card.addEventListener('mousedown', function (evt) {
                _.trigger('set:dragging', evt);
            }, false);
        }, this);

        // mouse over play channels
        this.dropZones.forEach((zone) => {

            matrix.push({
                target: zone,
                left:   zone.offsetLeft,
                top:    zone.offsetTop,
                width:  zone.clientWidth,
                height: zone.clientHeight
            });
        });

        this.zoneMatrix = matrix;

        // mouse up
        document.documentElement.addEventListener('mouseup', (evt) => {
            _.trigger('drop:card', evt.pageX, evt.pageY);
        }, false);

        // mouse move
        document.body.addEventListener('mousemove', (evt) => {
            _.trigger('move:card', evt.pageX, evt.pageY);
        }, false);

        return this;
    }



    render () {

        console.log('render');

        let template = Handlebars.compile(document.getElementById('playBoard').innerHTML);

        this.$board.innerHTML = template({
            playChannels:  this.game.playChannels,
            stackChannels: this.game.stackChannels
        });

        return this.bindEvents();
    }
}
