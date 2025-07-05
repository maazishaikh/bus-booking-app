module.exports = function(req, res, next) {
  if (req.session.userId && req.session.isAdmin) {
    next();
  } else {
    res.send("Access Denied. Admins only.");
  }
};
