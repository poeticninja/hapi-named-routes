exports.register = function (server, options, next) {
    // Start the plugin routing table
    var routingTable = {};
    // Set length of routing table for checking later if new routes get added.
    var routingLength =  [];

    // Setup route names object to be used in the view context.
    var namedRoutes = {};

    // Hook onto the 'onPostHandler'
    server.ext('onPostHandler', function (request, reply) {
        // Get the response object
        var response = request.response;

        // Check to see if the response is a view
        if (response.variety === 'view') {

            // Get current routing table
            var checkRoutingTable = request.connection.table();
            // Get length of current route table
            var checkRoutingLength =  Object.keys(checkRoutingTable);

            // Initialize if context is not defined
            response.source.context = response.source.context || {};
            // Check to see if the current route table has any new routes since plugin loaded
            if (checkRoutingLength > routingLength) {
                // If new routes then update routingTableLength and the routingTable
                routingLength = checkRoutingLength;
                routingTable = checkRoutingTable;

                // Setup the path object for the route names to be added to in the view
                response.source.context.path = {};

                // Loop over the routingTable
                for(var item in routingTable){
                    //  Look for any routes with id defined in the config object
                    if(typeof routingTable[item].settings.id !== 'undefined') {
                        // Get the route name from the config object and assign it to routeName
                        var routeName = routingTable[item].settings.id;
                        // Get the route path from the config object, remove path wildcard, and assign it to routePath
                        var routePath = routingTable[item].path.replace(/{(.*?)}/g, '');

                        // Put the current route and path being looped over into the view layer variable path
                        response.source.context.path[routeName] = routePath;
                        namedRoutes = response.source.context.path;
                    }
                }
            } else {
                // if no new routes then use the current named routes for the views
                response.source.context.path = namedRoutes;
            }
        }
        return reply.continue();
    });
    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
