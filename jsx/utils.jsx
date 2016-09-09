
class Utils {

    constructor () {
        this.events = {};
    }


    /**
     * converts to array
     *
     * @method toArray
     * @param  {Object} arrayLike [array like object]
     * @return {Array}            [definately an array]
     */
    toArray (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }


    /**
     * extend an object
     *
     * @method extend
     * @param  {Object} object [original object]
     * @param  {Object} extend [extend object]
     * @return {Object}        [the original object mutated]
     */
    extend (object, extend) {

        var prop;

        for (prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }

        return object;
    }


    /**
     * events arregator listener
     *
     * @method listenTo
     * @param  {String} listener   [the string to listen to]
     * @param  {Function} callback [the callback when triggered]
     * @param  {Object} scope      [the scope to bind it to]
     * @return {Object}            [this underscore instance]
     */
    listenTo (listener, callback, scope) {

        scope = scope || this;

        if (typeof listener === 'string') {

            callback.__scope = scope;

            _.events[listener] = _.events[listener] || [];
            _.events[listener].push(callback);

        } else if (typeof listener === 'object') {

            for (let prop in listener) {
                if (listener.hasOwnProperty(prop)) {

                    listener[prop].__scope = callback;

                    _.events[prop] = _.events[prop] || [];
                    _.events[prop].push(listener[prop]);
                }
            }
        }

        return _;
    }


    /**
     * triggers any found callback method that is registered to listen
     *
     * @method trigger
     * @param  {String} trigger [the string id to trigger]
     * @return {Object}         [this underscore instance]
     */
    trigger (trigger) {

        let toFire = _.events[trigger] || [],
            args   = _.toArray(arguments);

        toFire.forEach((callback) => {

            if (args.length > 1) {
                callback.apply(callback.__scope, args.slice(1));
            } else {
                callback.call(callback.__scope);
            }
        }, this);

        return _;
    }
}

const _ = new Utils();
