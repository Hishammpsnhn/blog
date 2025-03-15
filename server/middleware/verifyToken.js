import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(401).send("Invalid Token");
      req.user = decoded.id
      
      next();
    });
  } else {
    return res.status(403).send("Token required");
  }
}

export default verifyToken;