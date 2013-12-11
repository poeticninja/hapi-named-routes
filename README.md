Hapi Named Routes
=================

Hapi plugin to add named routes to your view templates.

In your view template you can now access `path.name` where name is what you named the route.

To name a route you need to pass the config object to the route with the app.name being define.

Example:
```
// Route Config
var homepage = {
    handler: function (request) {
        request.reply.view('index');
    },
    app : {
        name: 'homepage'
    }
};

// Array of routes for Hapi
routes = [
    {
        method: 'GET',
        path: '/',
        config: homepage
    }
]
```
Based on the example above you now have access to `path.homepage` inr your view templates. By using `path.homepage` it will print out `/`.

Right now this is being beta tested.

Documentation to be improved shortly.



