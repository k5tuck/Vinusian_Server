const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/unauthorized");
  }
};

// req.session.user = {
// username
// id: user ID from data table
// }

module.exports = {
  requireLogin,
};
