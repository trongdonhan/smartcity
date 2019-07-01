var convertapi = require('convertapi')('ehMEjmEH2qZAkjMR');



module.exports = function () {
        convertapi.convert('pdf', {
            File: file + '/phanloaihoso_' + idViD + '.docx'
        }, 'docx').then(function (result) {
            result.saveFiles(file + '/phanloaihoso_' + idViD + '.pdf');
        });


        convertapi.convert('pdf', {
            File: file + '/phieukiemsoat_' + idViD + '.docx'
        }, 'docx').then(function (result) {
            result.saveFiles(file + '/phieukiemsoat_' + idViD + '.pdf');
        });


        convertapi.convert('pdf', {
            File: file + '/QDXP_' + idViD + '.docx'
        }, 'docx').then(function (result) {
            result.saveFiles(file + '/QDXP_' + idViD + '.pdf');
        });


        convertapi.convert('pdf', {
            File: file + '/TTXPVPHC_' + idViD + '.docx'
        }, 'docx').then(function (result) {
            result.saveFiles(file + '/TTXPVPHC_' + idViD + '.pdf');
        });
    }