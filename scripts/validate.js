var msg = "";
var money = 0;
var goodmsgclass = "";

var formItems = {fname:"", lname:"", idnum:"", phone:"", email:"", date:0, classOpen: false, classNP: false, class25knnp:false, class50kam:false, class35knp:false, class15kam:false, stall:false, rv:false, ccnum:"", ccVisa:false, ccMC:false, ccDisc:false, ccmonth:0, ccyear:0};

function validate() {
    // alert("function validate");
    var reg = document.forms[0];
    var valid = true;
    formItems["fname"] = reg["0"].value;
    formItems["lname"] = reg[1].value;
    formItems["idnum"] = reg[2].value;
    formItems["phone"] = reg[3].value;
    formItems["email"] = reg[4].value;
    formItems["date"] = reg[5].selectedIndex;
    formItems["classOpen"] = reg[6].checked;
    formItems["classNP"] = reg[7].checked;
    formItems["class25knnp"] = reg[8].checked;
    formItems["class50kam"] = reg[9].checked;
    formItems["class35knp"] = reg[10].checked;
    formItems["class15kam"] = reg[11].checked;
    formItems["stall"] = reg[12].checked;
    formItems["rv"] = reg[13].checked;
    formItems["ccnum"] = reg[14].value;
    formItems["ccVisa"] = reg[15].checked;
    formItems["ccMC"] = reg[16].checked;
    formItems["ccDisc"] = reg[17].checked;
    formItems["ccmonth"] = reg[18].selectedIndex;
    formItems["ccyear"] = reg[19].selectedIndex;

    if (!chkccdate(formItems["ccmonth"], formItems["ccyear"])){
        formItems["ccmonth"] = 0;
        formItems["ccyear"] = 0;
        valid = false;
        reg[18].focus();
        reg[18].style.backgroundColor = "red";
        reg[19].style.backgroundColor = "red";
    }
    else {
        reg[18].style.backgroundColor = "#d6dbdf";
        reg[19].style.backgroundColor = "#d6dbdf";
    }
    // alert("post chkccdate");
    if (!chkcardtype(formItems["ccVisa"], formItems["ccMC"], formItems["ccDisc"])){
        formItems["ccVisa"].checked = false;
        formItems["ccMC"].checked = false;
        formItems["ccDisc"].checked = false;
        valid = false;
        reg[15].focus();
        document.getElementById("ccVisa").style.color = "red";
        document.getElementById("ccMC").style.color = "red";
        document.getElementById("ccDisc").style.color = "red";
    }
    else {

        document.getElementById("ccVisa").style.color = "#f1c40f";
        document.getElementById("ccMC").style.color = "#f1c40f";
        document.getElementById("ccDisc").style.color = "#f1c40f";
    }
    // alert("post chkcctype");
    if (!chkccnum(formItems["ccnum"])){
        formItems["ccnum"] = "";
        valid = false;
        reg[14].focus();
        reg[14].style.backgroundColor = "red";
    }
    else {
        reg[14].style.backgroundColor = "#d6dbdf";
    }
    // alert("post ccnum");
    if (formItems["stall"]) money += 30;
    if (formItems["rv"]) money += 35;
    // alert("money now = " + money);
    if (!chkclass(formItems["classOpen"],formItems["classNP"],formItems["class25knnp"],formItems["class50kam"],formItems["class35knp"],formItems["class15kam"])){

        formItems["classOpen"] = false;
        formItems["classNP"] = false;
        formItems["class25knnp"] = false;
        formItems["class50kam"] = false;
        formItems["class35knp"] = false;
        formItems["class15kam"] = false;
        valid = false;
        reg[6].focus();
        // alert(document.getElementById("classOpen").innerText);
        document.getElementById("classOpen").style.color = "red";
        document.getElementById("classNP").style.color = "red";
        document.getElementById("class25knnp").style.color = "red";
        document.getElementById("class50kam").style.color = "red";
        document.getElementById("class35knp").style.color = "red";
        document.getElementById("class15kam").style.color = "red";
    }
    else {
        document.getElementById("classOpen").style.color = "#f1c40f";
        document.getElementById("classNP").style.color = "#f1c40f";
        document.getElementById("class25knnp").style.color = "#f1c40f";
        document.getElementById("class50kam").style.color = "#f1c40f";
        document.getElementById("class35knp").style.color = "#f1c40f";
        document.getElementById("class15kam").style.color = "#f1c40f";

    }
    // alert("money = " + money);
    regdate = getdate(formItems["date"]);
    // alert("date = " + regdate);
    if (!chkemail(formItems["email"])){
        formItems["email"] = "";
        valid = false;
        reg[4].focus();
        reg[4].style.backgroundColor = "red";
    }
    else {
        reg[4].style.backgroundColor = "#d6dbdf";
    }
    // alert("post chkmail");
    if (!chkphone(formItems["phone"])){
        formItems["phone"] = "";
        valid = false;
        reg[3].focus();
        reg[3].style.backgroundColor = "red";
    }
    else {
        reg[3].style.backgroundColor = "#d6dbdf";
    }
    // alert("post chkphone");
    if (!chkid(formItems["idnum"])){
        formItems["idnum"] = "";
        valid = false;
        reg[2].focus();
        reg[2].style.backgroundColor = "red";
    }
    else {
        reg[2].style.backgroundColor = "#d6dbdf";
    }
    // alert("post chkid");
    if (!chkfname(formItems["lname"])){
        formItems["lname"] = "";
        valid = false;
        reg[1].focus();
        reg[1].style.backgroundColor = "red";
    }
    else {
        reg[1].style.backgroundColor = "#d6dbdf";
    }

    // alert("post chklname");
    if (!chkfname(formItems["fname"])){
        formItems["fname"] = "";
        reg[0].focus();
        reg[0].style.backgroundColor = "red";
        valid = false;
    }
    else {
        reg[0].style.backgroundColor = "#d6dbdf";
    }
    // alert("post chkname");

    if (!valid){
        alert(msg);
        msg = "";
        goodmsgclass = "";
        money = 0;
    }
    else {
        var msg1 = formItems["fname"] + " " + formItems["lname"] + " has registered for event day " + regdate + " in events:\n" + goodmsgclass;
        var msg2 = "\nAdditional Items:\n"
        var msg3 = "";
        if (formItems["stall"]) msg3 += "\tStall Rental\n";
        if (formItems["rv"]) msg3 += "\tRV Hookup\n";
        var msg4 = "\nTotal Cost: $" + money + "\n";
        alert(msg1+msg2+msg3+msg4);
    }

    return valid;
}

function chkfname(fname) {
    // alert("checkfname function " + fname);
    var fnamegood = fname.search(/^[A-Z][a-z]+$/);
    // alert("fnamegood = " + fnamegood);
    if (fnamegood == 0) return true;
    else {
        msg = "The name " + fname + " is not correct format.\n\n" + msg;
        //fname.style.backgroundColor = pink;
        return false;
    }
}

function chkphone(phonenum) {
    var goodphone = phonenum.search(/^\d{3}-\d{3}-\d{4}$/);
    // alert("goodphone = " + goodphone);
    if (goodphone == 0) return true;
    else {
        msg = "The phone number " + phonenum + " is not formatted correctly.\n\n" + msg;
        return false;
    }
}

function chkid(id){
    // alert("function checkid " + id);
    var goodid = id.search(/^\d{6}$/);
    // alert("goodid " + goodid);
    if (goodid == 0) return true;
    else {
        msg = "NCHA ID # " + id + " is invaild\n\n" + msg;
        return false;
    }
}

function chkemail(email){
    // alert("function chkemail " + email);
    var goodemail = email.search(/^[a-z.-_]{3,}@\w{3,}\.[a-z]{3}$/i);
    // alert("goodemail " + goodemail);
    if (goodemail == 0) return true;
    else {
        msg = "The email address " + email + " is not valid\n\n" + msg;
        return false;
    }
}

function chkccnum(ccnum){
    // alert("function ccnum " + ccnum);
    var goodccnum = ccnum.search(/^\d{16}$/);
    // alert("goodccnum " + goodccnum);
    if (goodccnum == 0) return true;
    else {
        msg = "Credit card # " + ccnum + " is invalid\n\n" + msg;
        return false;
    }
}

function chkclass(class1, class2,class3,class4,class5,class6){
    var count = 0;
    if (class1) {
        count++;
        money += 300;
        goodmsgclass += "\tOpen\n";
    }
    if (class2) {
        count++;
        money += 300;
        goodmsgclass += "\tNon-Pro\n";
    }
    if (class3) {
        count++;
        money += 250;
        goodmsgclass += "\t25K NNP\n";
    }
    if (class4) {
        count++;
        money += 250;
        goodmsgclass += "\t50K Amateur\n";
    }
    if (class5) {
        count++;
        money += 150;
        goodmsgclass += "\t35K NP\n";
    }
    if (class6) {
        count++;
        money += 150;
        goodmsgclass += "\t15K Amateur\n";
    }

    // alert("class checks " + count);

    if (count == 0) {
        msg = "There were no classes selected\n\n" + msg;
        money = 0;
        return false;
    }
    if (count > 3) {
        msg = "Too many classes were selected\n\n" + msg;
        money = 0;
        return false;
    }
    return true;
}

function getdate(thisdate){
    return document.forms["reg"][5].options[thisdate].text;
}

function chkccdate(ccm, ccy){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var cyear = document.forms["reg"][19].options[ccy].text;

    // alert(year + " " + month + " " + cyear + " " + ccm + "\n");

    if (ccm < month && cyear == year) {
        msg = "Credit card date is invalid.\n\n" + msg;
        return false;
    }

    return true;

}

function chkcardtype(cv, cm, cd){
    if (cv || cm || cd) return true;
    else {
        msg = "Credit card type was not selected\n\n" + msg;
        return false;
    }
}
