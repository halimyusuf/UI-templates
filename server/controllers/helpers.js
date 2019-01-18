const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')

const Helper = {
    
    hashPassword(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },
    
    comparePassword(hashPassword, password) {
      return bcrypt.compareSync(password, hashPassword);
    },
    
    isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    },
    
    generateToken(id,user) {
      const token = jwt.sign({
        userId: id,
        username: user
      },
        process.env.SECRET, { expiresIn: '7d' }
      );
      return token;
    }
  }
  
  module.exports = Helper
  require('make-runnable')