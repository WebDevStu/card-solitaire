/**
 * GameBoard
 * @constructor
 */
var Board = function () {

    this.zoneMatrix = [];
};

// extend the prototype
_.extend(Board.prototype, {


    /**
     * moveCards
     * @param x
     * @param y
     */
    moveCards: function (x, y) {

        // if dragging & card
        if (this.dragging && this.card) {

            // move the card
            this.card.style.position = 'fixed';
            this.card.style.left = (x - 62) + 'px';
            this.card.style.top = (y - 87) + 'px';
            this.card.style.zIndex = 999;
        }
    },


    getZone: function (x, y) {

        return this.zoneMatrix.find(function (zone) {

            var onXAxis = (x >= zone.left) && (x <= (zone.left + zone.width)),
                onYAxis = (y >= zone.top) &&  (y <= (zone.top + zone.height));

            return onXAxis && onYAxis;
        });
    },


    dropCard: function (x, y) {

        // find the zone
        this.activeZone = this.getZone(x, y);

        this.card.removeAttribute('style');
    },


    setDragging: function (evt) {

        this.card = evt.currentTarget;
        this.previousZone = this.card.parentNode.getAttribute('data-drop');
        this.dragging = true;
    },


    releaseDragging: function () {

        this.card = null;
        this.dragging = false;
    }
});
