import jwt from "jsonwebtoken";

export const auth = (roles = []) => {
  return (req, res, next) => {
    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Authorization token missing",
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        msg: "No token",
      });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const currentRole = String(payload.role || "")
        .trim()
        .toLowerCase();

      const allowedRoles = roles.map(
        (role) =>
            String(role || "")
                .trim()
                .toLowerCase()
      );

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(currentRole)
      ) {
        return res.status(403).json({
          msg: "Forbidden",
          role: currentRole,
          allowedRoles,
        });
      }

      req.user = {
        ...payload,
        role: currentRole,
      };

      next();
    } catch (error) {
      console.error(
        "Authentication error:",
        error.message
      );

      return res.status(401).json({
        msg: "Invalid or expired token",
      });
    }
  };
};