/**
 * GameBoard
 * @class
 */
class Board {

    /**
     * constructor function
     */
    constructor () {
        this.zoneMatrix = [];
    }


    /**
     * move cards, takes x & y coordinates and adds attributes to the selected
     * card
     */
    moveCards (x, y) {

        // if dragging & card
        if (this.dragging && this.card) {

            // move the card
            this.card.style.position = 'fixed';
            this.card.style.left     = (x - 62) + 'px';
            this.card.style.top      = (y - 87) + 'px';
            this.card.style.zIndex   = 999;
        }
    }


    /**
     * gets the zone that the card is part of
     */
    getZone (x, y) {

        return this.zoneMatrix.find((zone) => {

            var onXAxis = (x >= zone.left) && (x <= (zone.left + zone.width)),
                onYAxis = (y >= zone.top)  && (y <= (zone.top + zone.height));

            return onXAxis && onYAxis;
        });
    }


    /**
     * drop card, cancels the dragging param and drop if into the selected
     * zone
     */
    dropCard (x, y) {

        // find the zone
        this.activeZone = this.getZone(x, y);
        
        this.card.removeAttribute('style');

        this.dragging = false;
    }


    /**
     * starts the dragging - and marks the card that is selected
     */
    setDragging (evt) {

        this.card         = evt.currentTarget;
        this.previousZone = this.card.parentNode.getAttribute('data-drop');
        this.dragging     = true;
    }


    /**
     * stops the dragging and nulls the card
     */
    releaseDragging () {

        this.card     = null;
        this.dragging = false;
    }
}
