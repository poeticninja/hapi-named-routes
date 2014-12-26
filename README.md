Hapi Named Routes
=================

Hapi plugin to add named routes to your view templates.

## Goal:
In your view templates, instead of always typing the path in your links, you can now have access to the route name variable. It will just print the path.

## How it works:

In your view template you can now access `path.name` where name is the id of the route.

To name a route you need to pass the config object to the route with the id being defined.

Example:
```
// Route Config
var about = {
    handler: function (request, reply) {
        reply.view('about');
    },
    id: 'about'
};

// Array of routes for Hapi
routes = [
    {
        method: 'GET',
        path: '/about',
        config: about
    }
]

server.route(routes);
```
Based on the example above you now have access to `path.about` in your view templates, and will print out the routes path `/about`.

Handlebars:
`<a href="{{path.about}}">About</a>`

Jade:
`a(href="#{path.about}") About`

### Breaking changes
In Hapi 8.0.0 the `id` property for a route was added to allow a developer to access a route path using [`server.lookup()`](#serverlookupid). As of hapi-named-routes `0.3.0` we use this `id` instead of `app.name` like we previoisly used.

### Other

You can see this being used in the Hapi Ninja boilerplate example. [https://github.com/poeticninja/hapi-ninja](https://github.com/poeticninja/hapi-ninja)
