exports.register = function (plugin, options, callback) {
    // Initialize  the routing table from the server
    var routingTable = server.routingTable();
    // Get length of routing table for checking later if new routes get added.
    var routingLength =  Object.keys(routingTable);

    // Setup route names object to be used in the view context.
    var namedRoutes = {};

    // Hook onto the 'onPostHandler'
    plugin.ext('onPostHandler', function (request, next) {
        // Get the response object
        var response = request.response();
        // Get current routing table
        var checkRoutingTable = server.routingTable();
        // Get length of current route table
        var checkRoutingLength =  Object.keys(checkRoutingTable);

        // Check to see if the response is a view
        if (response.variety === 'view') {

            // Check to see if the current route table has any new routes since plugin loaded
            if (checkRoutingLength > routingLength) {
                // If new routes then update routingTableLength and the routingTable
                routingLength = checkRoutingLength;
                routingTable = checkRoutingTable;

                // Setup the routingNames array
                var routingNames = [];
                // Setup the path object for the route names to be added to in the view
                response.view.context.path = {};

                // Loop over the routingTable
                for(var item in routingTable){
                    //  Look for any routes with app.name defined in the config object
                    if(typeof routingTable[item].settings.app.name != 'undefined'){
                        // Get the route name from the config object and assign it to routeName
                        var routeName = routingTable[item].settings.app.name;
                        // Get the route path from the config object and assign it to routePath
                        var routePath = routingTable[item].settings.path;

                        // Put the current route and path being looped over into the view layer variable path
                        response.view.context.path[routeName] = routePath;
                        namedRoutes = response.view.context.path;
                    }
                }
            } else {
                // if no new routes then use the current named routes for the views
                response.view.context.path = namedRoutes;
            }
        }
        next();
    });
};