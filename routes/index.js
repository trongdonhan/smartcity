const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('../controller/authenLogin');


router.use(bodyparser.urlencoded({ extended: true }))
router.use(session({
    secret: "mysecret",
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
router.use(passport.initialize())
router.use(passport.session())

  
router.get('/', (req, res) => res.render('index'))
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}),
    (req, res) => {
        if (req.session.passport.user.id_auth == '1') {
            res.redirect('/quan/');
        }
        else
            res.redirect('/phuong/');
    });



router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
