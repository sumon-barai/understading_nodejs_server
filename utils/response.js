const response = (res, status = 200, type = "text/plain", data = {}) => {
  res.writeHead(status, { "Content-Type": type });
  res.write(JSON.stringify(data));
  res.end();
};

module.exports = { response };
