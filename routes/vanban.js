var express = require('express');
var router = express.Router();
const con = require('../controller/connectDB')



// localhost:3000/vanban
router.get('/', function (req, res, next) {
   if(req.isAuthenticated()) {
       var quyen = req.session.passport.user.id_auth;
        con.query('select ow.*, vi.id as idVi, vi.*, nameAc from land_violation vi, land_owner ow, account acc where vi.id_chudat = ow.cmnd and vi.tinhtrang = 1 and vi.id_acc = acc.username order by vi.thoigianthucVi DESC ', function(error, results){
            if (error) throw(error);  
            res.render('vanban', {results, quyen});
        });
    } else {
        res.redirect('../') 
    }

})

router.get('/xem',(req, res)=>{

    res.redirect('../');
})

// localhost:3000/vanban/hoso/:cmnd/:idVi
router.get('/xem/:cmnd/:idVi', (req,res) => {

     if(req.isAuthenticated()) {
        var idVi = req.params.idVi;
        con.query("select * from docs where id_violation = '" + idVi +"' ORDER BY count_views ASC", (err, results)=>{
            if (err) 
            { throw err }
            else {

                con.query("select * from land_owner, land_violation where id = "+ idVi +" and cmnd = id_chudat", (err2, results2)=>{
                    if (err2) 
                    { throw err2 }
                    res.render('xem', {results, results2})
                })
            }
          
        })
    } else {
        res.redirect('../')
    }
})

module.exports = router;
