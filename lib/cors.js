const allowedOrigins = ["http://localhost:3000", "http://www.localhost:3000"];

const cors = (handler) => async (req, res) => {
  // Check if the request origin is allowed
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return handler(req, res);
};

export default cors;
