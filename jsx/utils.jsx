
var _ = {


    /**
     * toArray
     * @param arrayLike
     * @returns {Array}
     */
    toArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },



    /**
     * extend
     *
     * @param object
     * @param extend
     * @returns {*}
     */
    extend: function (object, extend) {

        var prop;

        for (prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }

        return object;
    },


    /**
     * events object
     */
    events: {},


    /**
     * listenTo
     * @param listener
     * @param callback
     * @param scope
     * @returns _
     */
    listenTo: function (listener, callback, scope) {

        scope = scope || this;

        if (typeof listener === 'string') {

            callback.__scope = scope;

            _.events[listener] = _.events[listener] || [];
            _.events[listener].push(callback);

        } else if (typeof listener === 'object') {

            for (var prop in listener) {
                if (listener.hasOwnProperty(prop)) {

                    listener[prop].__scope = callback;

                    _.events[prop] = _.events[prop] || [];
                    _.events[prop].push(listener[prop]);
                }
            }
        }

        return _;
    },


    /**
     * trigger
     *
     * @param trigger
     * @returns _
     */
    trigger: function (trigger) {

        var toFire = _.events[trigger] || [],
            args = _.toArray(arguments);

        toFire.forEach(function (callback) {

            if (args.length > 1) {
                callback.apply(callback.__scope, args.slice(1));
            } else {
                callback.call(callback.__scope);
            }
        }, this);

        return _;
    }
};