var msg = "";
var money = 0;
var goodmsgclass = "";
var goodmsgaddlcost = "";

function validate() {
    //alert("function validate");
    var reg = document.forms["reg"];
    var valid = true;
    var myname = reg["fname"].value;
    var mylname = reg["lname"].value;
    var myphone = reg["phone"].value;
    var myid = reg["id"].value;
    var myemail = reg["email"].value;
    var myccnum = reg["ccnum"].value;
    var mydate = reg["date"];
    var myclass = reg["class"];
    var mystall = reg["stall"];
    var myrv = reg["rv"];
    var mycctype = reg["cctype"];
    var myccmonth = reg["ccmonth"];
    var myccyear = reg["ccyear"];

    //alert("getdate = " + getdate(mydate));

    if (!chkfname(myname)) {
        reg["fname"].style.backgroundColor = "pink";
        valid = false;
    }
    if (!chkfname(mylname)) valid = false;
    if (!chkphone(myphone)) valid = false;
    if (!chkid(myid)) valid = false;
    if (!chkemail(myemail)) valid = false;

    if (!chkclass(myclass)) valid = false;
    else money += addclass(myclass);

    if (mystall.checked) {
        goodmsgaddlcost += "\t- Stall Rental\n";
        money += 30;
    }
    if (myrv.checked) {
        goodmsgaddlcost += "\t- RV Hookup\n";
        money += 35;
    }

    if (!chkccnum(myccnum)) valid = false;
    if (!chkcardtype(mycctype)) valid = false;
    if (!chkccdate(myccmonth, myccyear)){
        msg += "Credit card date is invalid.\n\n";
        valid = false;
    }

    
    if (valid) {
        //var thedate = mydate.selected.innerHTML;
        alert(myname + " " + mylname + " has registered for event date: " + getdate(mydate) + "\nclasses:\n" + goodmsgclass + "\nAdditional:\n" + goodmsgaddlcost + "\nTotal Cost = $" + money);
        return valid;
    }
    else alert(msg)
    return valid;
}

function chkfname(fname) {
    //alert("checkfname function " + fname);
    var fnamegood = fname.search(/^[A-Z][a-z]+$/);
    //alert("fnamegood = " + fnamegood);
    if (fnamegood == 0) return true;
    else {
        msg += "The name " + fname + " is not correct format.\n\n";
        //fname.style.backgroundColor = pink;
        return false;
    }
}

function chkphone(phonenum) {
    var goodphone = phonenum.search(/^\d{3}-\d{3}-\d{4}$/);
    //alert("goodphone = " + goodphone);
    if (goodphone == 0) return true;
    else {
        msg += "The phone number " + phonenum + " is not formatted correctly.\n\n";
        return false;
    }
}

function chkid(id){
    //alert("function checkid " + id);
    var goodid = id.search(/^\d{6}$/);
    //alert("goodid " + goodid);
    if (goodid == 0) return true;
    else {
        msg += "NCHA ID # " + id + " is invaild\n\n";
        return false;
    }
}

function chkemail(email){
    //alert("function chkemail " + email);
    var goodemail = email.search(/^[a-z.-_]{3,}@\w{3,}\.[a-z]{3}$/i);
    //alert("goodemail " + goodemail);
    if (goodemail == 0) return true;
    else {
        msg += "The email address " + email + " is not valid\n\n";
        return false;
    }
}

function chkccnum(ccnum){
    //alert("function ccnum " + ccnum);
    var goodccnum = ccnum.search(/^\d{16}$/);
    //alert("goodccnum " + goodccnum);
    if (goodccnum == 0) return true;
    else {
        msg += "Credit card # " + ccnum + " is invalid\n\n";
        return false;
    }
}

function chkclass(thisclass){
    var count = 0;
    var i;
    for (i=0; i<thisclass.length; i++){
        if (thisclass[i].checked) count += 1;
    }
    //alert("class checks " + count);
    if (count == 0) {
        msg += "There were no classes selected\n\n";
        return false;
    }
    if (count > 3) {
        msg += "Too many classes were selected\n\n";
        return false;
    }
    return true;
}

function addclass(thisclass){
    var i;
    var addto = 0;
    for (i = 0; i<thisclass.length; i++){
        //alert("addclass switch " + thisclass[i].value);
        if (thisclass[i].checked){
            switch(thisclass[i].value){
                case "open":
                    goodmsgclass += "\t- Open\n";
                    addto += 300;
                    break;
                case "nonpro":
                    goodmsgclass += "\t- Non-Pro\n";
                    addto += 300;
                    break;
                case "25knnp":
                    goodmsgclass += "\t- 25K NNP\n";
                    addto += 250;
                    break;
                case "50kam":
                    goodmsgclass += "\t- 50K Amateur\n";
                    addto += 250;
                    break;
                case "35knp":
                    goodmsgclass += "\t- 35K NP\n";
                    addto += 150;
                    break;
                case "15kam":
                    goodmsgclass += "\t- 15K Amateur\n";
                    addto += 150;
                    break;
            }
        }
    }
    //alert("addclass money = " + addto);
    return addto;
}

function getdate(thisdate){
    var retdate = thisdate.options[thisdate.selectedIndex].text;
    return retdate;
}

function chkccdate(ccm, ccy){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var cmonth = ccm.options[ccm.selectedIndex].value;
    var cyear = ccy.options[ccy.selectedIndex].value;

    //alert(year + " " + month + " " + cyear + " " + cmonth + "\n");

    if (cmonth < month && cyear == year) return false;

    return true;

}

function chkcardtype(cctype){
    var typecount = 0;
    var i;
    for (i=0; i<cctype.length; i++){
        if (cctype[i].checked) typecount++;
    }

    //alert(typecount);

    if (typecount == 0) {
        msg += "Credit card type was not selected\n\n";
        return false;
    }
    return true;
}
