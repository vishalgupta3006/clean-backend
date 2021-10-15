const crypto = require('crypto');

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  console.log(salt)
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  console.log(genHash)
  return {
    salt: salt,
    hash: genHash
  }
}

const verifyPassword = (password, hash, salt) => {
  var hasVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hasVerify;

}
module.exports.genPassword = genPassword;
module.exports.verifyPassword = verifyPassword;