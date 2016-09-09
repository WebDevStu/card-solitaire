

var View = function (gameClass) {

    this.game = gameClass;
    this.$board = document.getElementById('board');
};


_.extend(View.prototype, {


    bindEvents: function () {

        var matrix = [];

        this.cards = _.toArray(this.$board.querySelectorAll('.card:not(.faceDown)'));
        this.dropZones = _.toArray(this.$board.querySelectorAll('.drop'));

        // start dragging on a cards
        this.cards.forEach(function (card) {
            card.addEventListener('mousedown', function (evt) {
                _.trigger('set:dragging', evt);
            }, false);
        }, this);

        // mouse over play channels
        this.dropZones.forEach(function (zone) {

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
        document.documentElement.addEventListener('mouseup', function (evt) {
            _.trigger('drop:card', evt.pageX, evt.pageY);
        }, false);

        // mouse move
        document.body.addEventListener('mousemove', function (evt) {
            _.trigger('move:card', evt.pageX, evt.pageY);
        }, false);

        return this;
    },



    render: function () {

        console.log('render');

        var template = Handlebars.compile(document.getElementById('playBoard').innerHTML);

        this.$board.innerHTML = template({
            playChannels:  this.game.playChannels,
            stackChannels: this.game.stackChannels
        });

        return this.bindEvents();
    }
});
