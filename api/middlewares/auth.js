const { validateToken } = require("../config/tokens");

function validateAuth(req, res) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;
 
}

module.exports = { validateAuth };
