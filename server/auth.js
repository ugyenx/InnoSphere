import jwt from "jsonwebtoken";

export function userAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("userauth", token);
    if (!token) {
      return res.status(401).json({ message: "Please sign in" });
    }

    const verifyUser = jwt.verify(token, "user");
    console.log(verifyUser);
    req.user = verifyUser.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function adminAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please sign in as admin" });
    }

    const verifyUser = jwt.verify(token, "admin");
    console.log(verifyUser);
    req.user = verifyUser.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
