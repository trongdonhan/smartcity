const papo = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const con = require('./connectDB')


papo.use(new LocalStrategy(
    (username, password, done) => {
        con.query("SELECT * FROM `account` WHERE `username` = '" + username + "'", function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!(rows[0].password == password))
                return done(null, false); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);

        });

    }

)
)

papo.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
papo.deserializeUser(function (user, done) {
    done(null, user);
});


module.exports = papo;