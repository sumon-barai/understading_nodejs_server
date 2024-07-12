const fs = require("node:fs");
const path = require("node:path");
const { response } = require("../utils/response");

const routes = {
  "/": {
    GET: (_req, res) => {
      response(res, 200, "text/plain", { message: "this is home page" });
    },
  },

  "/student": {
    GET: (_req, res) => {
      const filePath = path.join(__dirname, "../data/data.json");
      const raw = fs.readFileSync(filePath);
      const students = JSON.parse(raw);
      response(res, 200, "application/json", { data: students });
    },
    POST: (req, res) => {
      const filePath = path.join(__dirname, "../data/data.json");
      const raw = fs.readFileSync(filePath);
      const students = JSON.parse(raw);
      let body = "";

      req.on("data", (chunk) => {
        body = body + chunk;
      });

      req.on("end", () => {
        body = JSON.parse(body);
        students.push(body);
        fs.writeFileSync(filePath, JSON.stringify(students));
        response(res, 200, "application/json", {
          message: "insert successfully",
        });
      });
    },
  },

  default: (_req, res) => {
    response(res, 200, "text/plain", { message: "default" });
  },
};

module.exports = routes;
