'use strict';

const Hapi = require("hapi");
const Handlebars = require('handlebars');
const Code = require('code');
const Lab = require('lab');
const Vision = require('vision');
const HapiNamedRoutes = require("../lib");

// Test shortcuts
const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe("hapi-named-routes", () => {

  it("renders route path in template", async () => {

    const server = Hapi.server();
    await server.register([Vision, HapiNamedRoutes]);

    server.views({
      engines: { 'html': Handlebars },
      path: __dirname
    });

    server.route({
      method: 'GET',
      path: '/home',
      config: {
        id: "home",
      },
      handler: { view: 'templates/home' }
    });

    const res = await server.inject('/home');

    expect(res.statusCode).to.equal(200);
    expect(res.result).to.exist();
    expect(res.result).to.equal(`<a href="/home">/home</a>`);
  });
});