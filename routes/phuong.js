var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const con = require('../controller/connectDB')
var formidable = require('formidable'); 
const upLoadDriveImage = require('../controller/uploadDriveImage')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })




// localhost:3000/phuong
//dislay info work daily
router.get('/', function (req, res, next) {
    
    if (req.isAuthenticated() && req.session.passport.user.id_auth == '2') {
        var taikhoan = req.session.passport.user.username;
        con.query("select *, wd.id as idWD, id.id as idIM  from work_daily wd left join images id on wd.id = id.id_WD where wd.id_acc = '" + taikhoan + "' ORDER BY thoigianthuc DESC", function (error, results, field) {           
            if (error) throw error;
            console.log(results)
            res.render('trangchuPhuong', { results, taikhoan });
        });
    }
    else {
        res.redirect('../')
    }
});

//create event button add Job
router.post('/capnhatPhuong', urlencodedParser, function (req, res, next) {
    //Land_Owner::
    var ngayTT = req.body.ngayTT;
    var diachiCT = req.body.diachiCT;
    var hientrangCT = req.body.hientrangCT;
    var canboPH = req.body.canboPH;
    var canboTN = req.body.canboTN;
    var ghichu = req.body.ghichu;
    //var form = new formidable.IncomingForm();
    var sql = "INSERT INTO `work_daily`(`ngayTT`, `diachiCT`, `hientrangCT`, `canboPH`, `canboTN`, `xacnhan`, `ghichu`, `id_acc`) VALUES ('" + ngayTT + "','" + diachiCT + "','" + hientrangCT + "','" + canboPH + "','" + canboTN + "','0','" + ghichu + "','" + req.session.passport.user.username + "')";
    con.query(sql, function (error, results, field) {
            if (error) {
                console.log(error.message);
                console.log('hey man, lỗi nhé!!!')
            } else {
                console.log('success!! ' + results.insertId);
                // form.parse(req, function (err, fields, files) {
                //     if (err) throw err;
                //     upLoadDriveImage(files.upload.path, req.session.passport.user.username , results.insertId);
                // });
            }
        });
    res.redirect('/phuong/');
});


//add image 
router.post('/uploadImage/:param', urlencodedParser, function (req, res, next) {
    var taikhoan = req.session.passport.user.username;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var id_WD = req.params.param;
        var namefile = id_WD +"_capnhatCV_"+ taikhoan;
        if (err) throw err;
        upLoadDriveImage(files.upload.path, namefile , id_WD , null);
    });

    res.redirect('/phuong/');
});



//create event button edit Job
router.post('/suaPhuong', urlencodedParser, function (req, res, next) {
    //Land_Owner::
    var id = req.body.id;
    var ngayTT = req.body.ngayTT;
    var diachiCT = req.body.diachiCT;
    var hientrangCT = req.body.hientrangCT;
    var canboPH = req.body.canboPH;
    var canboTN = req.body.canboTN;
    var xacnhan = req.body.xacnhan;
    var ghichu = req.body.ghichu;


    var sql = "UPDATE `work_daily` SET `ngayTT`='" + ngayTT + "',`diachiCT`='" + diachiCT + "',`hientrangCT`='" + hientrangCT + "' ,`canboPH`='" + canboPH + "',`canboTN`='" + canboTN + "',`ghichu`='" + ghichu + "' where id = " + id;

    con.query(sql, function (error, results, field) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success!!');
        }
    });
    res.redirect('/phuong/');

});





// localhost:3000/phuong/xuphatphuong

/* dislay info land owner */
router.get('/xuphatphuong', function (req, res, next) {
    if (req.isAuthenticated() && req.session.passport.user.id_auth == '2') {
        var taikhoan = req.session.passport.user.username;
        con.query("select *, vi.id as idVi, id.id as idIM  from land_violation vi left join images id on vi.id = id.id_Vi, land_owner ow where vi.id_chudat = ow.cmnd and id_acc = '" + taikhoan + "' ORDER BY vi.tinhtrang ASC, vi.thoigianthucVi DESC", function (error, results, field) {
            if (error) {
                throw error;
            } else {
                con.query("select ct.* from content ct left JOIN land_violation vi on ct.id_violation = vi.id left JOIN account acc on vi.id_acc = acc.username where acc.username = '" + taikhoan + "'", (err, results_content) => {
                    if (err)
                        throw err;
                    res.render('xuphatPhuong', { results, results_content , taikhoan});
                })

            }
            //console.log(results)

        });
    }
    else {
        res.redirect('../')
    }
});



// create event for button "addvipham"
router.post('/themvipham', urlencodedParser, function (req, res, next) {
    //Land_Owner::
    var hoten = req.body.hoten;
    var cmnd = req.body.cmnd;
    var ngaycap = req.body.ngaycap;
    var diachicap = req.body.diachicap;
    var sdt = req.body.sdt;
    var ngaysinh = req.body.ngaysinh;
    var gioitinh = req.body.gioitinh;
    var diachiTT = req.body.diachiTT;
    var nghenghiep = req.body.nghenghiep;
    //Land_Violation::
    var diachiVP = req.body.diachiVP;
    var thoigianVP = req.body.thoigianVP;
    var thoigianLBB = req.body.thoigianLBB;
    var noidungVP = req.body.noidungVP;
    var tienphat = req.body.tienphat;
    var soBB = req.body.soBB;
    var gioLBB = req.body.gioLBB;
    var hientrangCT = req.body.hientrangCT;


    con.query("SELECT count(*) as count FROM `land_owner` where cmnd = '" + cmnd + "'", function (err, results) {
        if (err) {
            return err;

        } else {
            console.log(results[0].count)
            if (results[0].count == 0) {
                con.query("INSERT INTO `land_owner`(`hoten`, `cmnd`, `ngaycap`, `diachicap`, `ngaysinh`, `gioitinh`, `quoctich`, `diachiTT`, `nghenghiep`, `sdt`) VALUES ('" + hoten + "','" + cmnd + "','" + ngaycap + "','" + diachicap + "','" + ngaysinh + "','" + gioitinh + "','Việt Nam','" + diachiTT + "','" + nghenghiep + "','" + sdt + "')", function (error, result1, field) {
                    if (error) {
                        console.log('lỗi owner')
                        console.log(error.message);
                    } else {
                        console.log('success owner!!');
                    }
                });
            }
            con.query("INSERT INTO `land_violation`(`diachiVP`, `thoigianVP`, `thoigianLBB` ,`tienphat`, `tinhtrang`, `id_chudat`, `id_acc`, `gioLBB`, `soBB`,`hientrangCT`) VALUES ('" + diachiVP + "','" + thoigianVP + "','" + thoigianLBB + "','" + tienphat + "',0,'" + cmnd + "', '" + req.session.passport.user.username + "','"+gioLBB+"','"+soBB+"','"+hientrangCT+"') ", function (error, result2, field) {
                if (error) {
                    console.log('lỗi violation')
                    console.log(error.message);
                } else {
                    console.log('success!!');
                    var i = 0;

                    while (noidungVP[i]) {
                        var tam = i + 1;
                        con.query("INSERT INTO `content`(`noidung`, `id_violation`) VALUES ('" + tam + ". " + noidungVP[i] + "', '" + result2.insertId + "')"), function (err) {
                            if (err) throw err;
                        }
                        i += 1;

                    }
                }
            });
        }
    });
    res.redirect('../phuong/xuphatphuong');
});




//add image 
router.post('/uploadImageXP/:param', urlencodedParser, function (req, res, next) {
    var taikhoan = req.session.passport.user.username;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var idVi = req.params.param;
        var namefile = idVi +"_diachiVP_"+ taikhoan;
        console.log(idVi)
        if (err) throw err;
        upLoadDriveImage(files.upload.path, namefile , null ,  idVi);
    });

    res.redirect('/phuong/xuphatphuong');
});



//create event button edit Violation
router.post('/suavipham', urlencodedParser, function (req, res, next) {
    //Land_Owner::
    var hoten = req.body.hoten;
    var cmnd = req.body.cmnd;
    var ngaycap = req.body.ngaycap;
    var diachicap = req.body.diachicap;
    var sdt = req.body.sdt;
    var ngaysinh = req.body.ngaysinh;
    var gioitinh = req.body.gioitinh;
    var diachiTT = req.body.diachiTT;
    var quoctich = req.body.quoctich;
    var nghenghiep = req.body.nghenghiep;
    //Land_Violation::
    var idVP = req.body.idVP;
    var diachiVP = req.body.diachiVP;
    var thoigianVP = req.body.thoigianVP;
    var thoigianLBB = req.body.thoigianLBB;
    var noidungVP = req.body.noidungVP;
    var tienphat = req.body.tienphat;
    var idcontent = req.body.idcontent;
    var soBB = req.body.soBB;
    var gioLBB = req.body.gioLBB;
    var hientrangCT = req.body.hientrangCT;


    var sql = {
        a: "UPDATE `land_owner` SET `hoten`='" + hoten + "',`ngaycap`='" + ngaycap + "',`diachicap`='" + diachicap + "',`ngaysinh`='" + ngaysinh + "',`gioitinh`=" + gioitinh + ",`diachiTT`='" + diachiTT + "',`nghenghiep`='" + nghenghiep + "',`sdt`='" + sdt + "' where cmnd = '" + cmnd + "'",
        b: "UPDATE `land_violation` SET `diachiVP`='" + diachiVP + "',`thoigianVP`='" + thoigianVP + "',`thoigianLBB`='" + thoigianLBB + "',`tienphat`=" + tienphat + ",`soBB`=" + soBB + ",`gioLBB`='" + gioLBB + "',`hientrangCT`='" + hientrangCT + "' WHERE id = " + idVP
    };

    con.query(sql.a, function (error, results, field) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success update owner');
        }
    });

    con.query(sql.b, function (error, results, field) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success update violation');
            var i = 0;

            while (noidungVP[i]) {
                con.query("UPDATE `content` SET `noidung`= '" + noidungVP[i] + "' WHERE  `id` =" + idcontent[i], function (err) {
                    if (err) throw err;
                    console.log("success update content")
                })
                i += 1;
            }
        }
    });
    res.redirect('../phuong/xuphatphuong');
});

// router.use('*', function(req,res){
//     res.status(404).send("URL not found.")
// })



module.exports = router;
