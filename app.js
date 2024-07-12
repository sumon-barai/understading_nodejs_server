const http = require("node:http");
const routes = require("./routes/routes");

const app = http.createServer((req, res) => {
  const { method, url } = req;
  const currentRoute = routes[url] || routes.default;
  const handler = currentRoute[method] || routes.default;
  handler(req, res);
});

module.exports = app;
