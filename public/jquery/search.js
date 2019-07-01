function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                if (td1) {
                    txtValue1 = td1.textContent || td1.innerText;
                    if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }
    
}

function DateConvert(date){
    var stringdate = "";
    stringdate += date.getFullYear() + '-';
    var day = date.getDay().toString();
    if (day.length < 2)
        day = '0' + day;
    var month = date.getMonth().toString();
    if (month.length < 2)
        month = '0' + month;
    
        stringdate += month  + '-' + day;
    return stringdate;
}

function LoadDataUser(listUser){
    listUser = JSON.parse(listUser);
    var cmnd = document.getElementById("cmnd").value;
    listUser.forEach(user => {
        if (user.cmnd == cmnd)
        {
            document.getElementById("hoten").value = user.hoten;

            var d = new Date(user.ngaycap.toString());
            document.getElementById("ngaycap").value = DateConvert(d);

            document.getElementById("noicap").value = user.diachicap;

            d = new Date(user.ngaysinh.toString());
            document.getElementById("ngaysinh").value = DateConvert(d);

            document.getElementById("quoctich").value = user.quoctich;
            document.getElementById("diachiTT").value = user.diachiTT;
            document.getElementById("sdt").value = user.sdt;
            document.getElementById("nghenghiep").value = user.nghenghiep;

            if (user.gioitinh == 1)
                document.getElementById("gioitinh_nam").checked = true;
            else
                document.getElementById("gioitinh_nu").checked = true;
            return;
        }
    });
}