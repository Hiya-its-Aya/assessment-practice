const User = require('../models/userModel')

const bcrypt = require('bcrypt')


const userController = {};
const WORKFACTOR = 10;

userController.getBcrypt = (req, res, next) => {
  try{ 
    const {password} = req.body;
    bcrypt.hash(password, WORKFACTOR)
      .then(hash => {
        req.body.password = hash;
        res.locals.user = req.body;
        return next()
      })
  } catch {
    return next({
      log: 'Error: in userController.getBcrypt cannot encrypt',
      message: err
    })
  }

}

userController.createUser = async (req, res, next) => {
  const {username, password} = res.locals.user;
  const hashedPass = password;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      const newUser = await User.create({ username: username, password: hashedPass });
      console.log('newUser:', newUser);
      res.locals.user = newUser;
      return next()
    }
    else {
      res.status(400).json('user already exists')
    }
  }
  catch (err) {
    const error = {
      log: 'Express error handler caught error in userContoller.createUser',
      message: { err: 'Error: problem creating user' },
    }
    next(error);
  }
}


module.exports = userController;
