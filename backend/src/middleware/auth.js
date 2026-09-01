// backend/src/middleware/auth.js
// Placeholder middleware: checks for Authorization header
module.exports = function (req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    // allow through for MVP - implement real checks later
    // return res.status(401).json({ error: 'missing auth' });
    return next();
  }
  // TODO: verify JWT with Supabase
  next();
};
