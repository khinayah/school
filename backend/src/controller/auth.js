const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dbPool = require('../config/database');


const login = async (req, res) => {
    let { email, username, password } = req.body
    const users = await findUsers(username, email);

    async function findUsers(username, email) {
        try {
            const [rows] = await dbPool.execute(
            `SELECT * FROM users WHERE username = ? OR email = ?`,
            [username, email]
          );
          return rows;
        } catch (err) {
          console.error('Error executing query', err);
          throw err;
        }
      }

    if (users.length > 0) {
      let user = users[0]
      
      if (user.password !== password) {
        return res.status(400).json("Invalid credentials");
      } else {
        const expiresIn = process.env.EXPIRE_HOURLY * 3600
  
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn });
        const { id, email, username, role } = user
  
  
        return res.status(200).json({ user: { id, username, email, role }, token })
      }
    } else {
      return res.status(400).json("invalid credentials")
    }
  }

  module.exports = { login }