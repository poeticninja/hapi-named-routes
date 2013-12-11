exports.register = function (plugin, options, callback) {
    // Hook onto the 'onPostHandler'
    plugin.ext('onPostHandler', function (request, next) {
        var response = request.response();

        // Check to see if the response is a view
        if (response.variety === 'view') {
            // Get the routing table from the server
            var routingTable = server.routingTable();
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
                }
            }
        };
        next();
    });
};