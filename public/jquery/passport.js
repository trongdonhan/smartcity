var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "smartcity"

});


con.connect();

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        con.query("select * from account where username = " +username, function (err, rows) {
        done(err, rows[0])
        }); 
    });

    passport.use('local-login', new LocalStrategy ({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        con.query("select * from account where username = " + username, function (err, rows) {
            if (err)
                return done(err);
                if (!rows.length){
                    return done(null, false, req.flash('loginMessage','No user found'))
                }
                if (!(rows[0].password == password)){
                    return done(null, false, req.flash('loginMessage', 'Wrong Password!'))
                }
            return done(null, rows[0])    
        });
        
    }));

}