// const abc = require('./uploadDrive');

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
// abc('../public/vanban/duyet/phanloaihoso.docx', 'abc', 1)
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

var noidung1 = [
    'abc',
    'cde'
]



var sss ; 

console.log(sss)
LoadFile('./QDXP.docx', '../', 'a', {
    noidung :[
        {noidung1 : noidung1}
    ]
}
);