const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local', {failureRedirect: '/failed', successRedirect:'/success'})
);

router.get('/failed',(req, res) =>{
  res.send("LOGIN FAILED");
});
router.get('/success',(req, res) =>{
  res.send("LOGIN DONE");
})
module.exports = router;