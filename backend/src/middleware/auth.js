const jwt = require('jsonwebtoken');
const ROLE_ADMIN = 'admin'

function jwtAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user

    next()
  })
}

function jwtAuthAdmin(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err || user.role != ROLE_ADMIN) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user

    next()
  })
}

module.exports = { jwtAuth, jwtAuthAdmin }