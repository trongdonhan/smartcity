var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Docxtemplater = require("docxtemplater");
var JSZip = require('jszip');
var fs = require('fs');
const upLoadDrive = require('../controller/uploadDrive');
const con = require('../controller/connectDB')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



// localhost:3000/quan
router.get('/', (req, res) => {
    var phuong = ['Tây Thạnh','Sơn Kỳ','Tân Quý','Tân Sân Nhì','Tân Thành','Phú Thọ Hòa','Hòa Thạnh','Phú Thạnh', 'Hiệp Tân', 'Tân Thới Hòa','Phú Trung'];
    if (req.isAuthenticated() && req.session.passport.user.id_auth == '1') {
        con.query('SELECT * FROM `work_daily` vi, `account` acc WHERE vi.id_acc = acc.username order by ngayTT DESC, thoigianthuc DESC', (err, results) => {
            if (err) throw err;
            else {
                con.query('SELECT * FROM `account` where id_auth = 2', (err, results_acc)=>{
                    console.log(phuong);
                    res.render('trangchuQuan', { results, results_acc, phuong});
                    
                })
            }   
        })
    }
    else {
        res.redirect('../')
    }
});


// localhost:3000/quan/xuphatquan
/* dislay info land owner */
router.get('/xuphatquan', function (req, res, next) {
    if (req.isAuthenticated() && req.session.passport.user.id_auth == '1') {

        con.query('select ow.*, vi.id as idVi, vi.*, nameAc from land_violation vi, land_owner ow, account acc where vi.id_chudat = ow.cmnd and vi.id_acc = acc.username ORDER BY vi.tinhtrang ASC, vi.thoigianthucVi DESC', function (error, results, field) {
            if (error) {
                throw error;
            } else {
                con.query("select * from content", (err, results_content) => {
                    if (err)
                        throw err;
                    res.render('xuphatQuan', { results, results_content });
                })
            }
        });
    }
    else {
        res.redirect('/')
    }
});


// submit Docx
function LoadFile(sourceFile, name_sc, name, data) {
    fs.readFile(sourceFile, 'binary', function (err, content) {
        if (err)
            throw (err);
        let zip = new JSZip(content);
        let doc = new Docxtemplater();
        doc.loadZip(zip);

        doc.setData(data);
        try {
            doc.render();
        }
        catch (err) {
            console.log(err);
        }
        let buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFile(name_sc + '/' + name + '.docx', buf, function (err) {
            if (err)
                throw (err);

        })

    });
}

//Action apply docs
router.post('/duyet', function (req, res, next) {
    var idViD = req.body.idViD;
    var ngoixung;
    var ngoixungH;
    if (req.body.gioitinhD == 'Nam') {
        ngoixung = 'ông';
        ngoixungH = 'Ông';
    }

    else {
        ngoixung = 'bà';
        ngoixungH = 'Bà';
    }




    //path save docs 
    var file = './public/vanban/xem/';
    var congvanUBNDphuong = 'congvanUBNDphuong_' + req.body.cmndD + '_' + idViD;
    var phanloaihoso = 'phanloaihoso_' + req.body.cmndD + '_' + idViD;
    var phieukiemsoat = 'phieukiemsoat_' + req.body.cmndD + '_' + idViD;
    var QDXP = 'QDXP_' + req.body.cmndD + '_' + idViD;
    var TTXPVPHC = 'TTXPVPHC_' + req.body.cmndD + '_' + idViD;
    var TTQDCC = 'TTQDCC_' + req.body.cmndD + '_' + idViD;
    var QDCC = 'QDCC_' + req.body.cmndD + '_' + idViD;



    // Get info Phường 
    con.query("select nameAC from account, land_violation where username = id_acc and id = ' " + idViD + "'", (err, result) => {
        if (err) throw err;
        var phuong = result[0].nameAC;
        //json data is got data from broswer 
        var data = {
            //Info Owner
            hoten: req.body.hotenD,
            cmnd: req.body.cmndD,
            ngaycap: req.body.ngaycapD,
            diachicap: req.body.diachicapD,
            ngaysinh: req.body.ngaysinhD,
            gioitinh: req.body.gioitinhD,
            diachiTT: req.body.diachiD,
            quoctich: req.body.quoctichD,
            //info land Violation::
            diachiVP: req.body.diachiViD,
            thoigianVP: req.body.thoigianVPD,
            thoigianLBB: req.body.thoigianLBBD,
            noidung: [
                {noidung1: req.body.noidungVPD[0]},
                {noidung1: req.body.noidungVPD[1]},
                {noidung1: req.body.noidungVPD[2]}, 
                {noidung1: req.body.noidungVPD[3]}, 
            ],
            
            tienphat: req.body.tienphatD,
            ngoixung: ngoixung,
            ngoixungH: ngoixungH,
            phuong: phuong,
            soBB: req.body.soBBD,
            hientrangCT: req.body.hientrangCTD,
            gioLBB: req.body.gioLBBD
        };


        // create file congvanUBNDphuong.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/congvanUBNDphuong.docx', file, congvanUBNDphuong, data);
        // create file phanloaihoso.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/phanloaihoso.docx', file, phanloaihoso, data);
        // create file phieukiemsoat.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/phieukiemsoat.docx', file, phieukiemsoat, data);
        // create file QDXP.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/QDXP.docx', file, QDXP, data);
        // create file TTXPVPHC.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/TTXPVPHC.docx', file, TTXPVPHC, data);
        // create file TTQDCC.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/TTQDCC.docx', file, TTQDCC, data);
        // create file QDCC.docx ứng với Mã Vi phạm
        LoadFile('./public/vanban/duyet/QDCC.docx', file, QDCC, data);
    })
    

    // Update status violation 0 => 1
    con.query('UPDATE `land_violation` SET `tinhtrang`= 1 WHERE id =' + idViD, function (error, results, field) {
        if (error) {

            throw error;

        } else {

            console.log('success!!!');
        }
    });


    //Upload docs into Drive (acc: smartcitytphcm@gmail.com; pass:tanphu123456789)
    setTimeout(function () {
        upLoadDrive(file + congvanUBNDphuong + '.docx', congvanUBNDphuong + '.docx', idViD, 0)
        upLoadDrive(file + phanloaihoso + '.docx', phanloaihoso + '.docx', idViD, 1)
        upLoadDrive(file + phieukiemsoat + '.docx', phieukiemsoat + '.docx', idViD, 2)
        upLoadDrive(file + TTXPVPHC + '.docx', TTXPVPHC + '.docx', idViD, 3)
        upLoadDrive(file + QDXP + '.docx', QDXP + '.docx', idViD, 4)
        upLoadDrive(file + TTQDCC + '.docx', TTQDCC + '.docx', idViD, 5)
        upLoadDrive(file + QDCC + '.docx', QDCC + '.docx', idViD, 6)
    }, 100)
    res.redirect('../quan/xuphatQuan')
})



module.exports = router;
