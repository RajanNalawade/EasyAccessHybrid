let userType, policyno;
var listFundSwitchT1 = new Array();
var listFundSwitchT2 = new Array();
var listFundNameValue = new Array();
var listFundNameValue2 = new Array();
let fundValue = 0;

let status, policy_status, prevprocstatus, switch_charge, Error_desc;

window.onload = function () {
    // userType = sessionStorage.getItem('userType');
    // policyno = decryptData(sessionStorage.getItem('fundSwitchPolicyNumber'), getSessionID());

    userType = "newUser";
    //policyno = "1K000014204";
    //policyno = "10082889";
    policyno = "47163191";


    if (userType == "newUser") {
        AsyncCheckAssignee().then((data) => {
            data = "no"
            if (data == "yes") {
                AsyncGetAssigneeName().then((data) => {

                });
            } else {
                /*  AsyncFundSwitchDetails().then((data) => {

                 }); */
                AsyncFundSwitchDetails();
            }
        });
    }
}

function AsyncCheckAssignee() {
    return new Promise((resolve, reject) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
             xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
         <soap:Body>
             <CheckAssignPresent xmlns="http://tempuri.org/">
                 <strPolicyNo>${policyno}</strPolicyNo>
             </CheckAssignPresent>
         </soap:Body>
        </soap:Envelope>`;
        showLoader();
        ApiCallService('/CheckAssignPresent', requestBody, '<CheckAssignPresentResult>', '</CheckAssignPresentResult>').then((Data) => {
            hideLoader();
            console.log(JSON.stringify(Data));
            resolve(Data)
        }).catch((error) => {
            console.log("err ", error);

            alert("Service Error occurred");
            self.hideLoader();
        });;
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });;
}

function AsyncGetAssigneeName() {
    return new Promise((resolve, reject) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
             xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
         <soap:Body>
             <GetAssigneName xmlns="http://tempuri.org/">
                 <strPolicyNo>${policyno}</strPolicyNo>
             </GetAssigneName>
         </soap:Body>
        </soap:Envelope>`;
        showLoader();
        ApiCallService('/GetAssigneName', requestBody, '<Dataset>', '</Dataset>').then((Data) => {
            hideLoader();
            console.log(JSON.stringify(Data));

            Data = Data.Table;
            var policyHolderName = Data.POLICYHOLDER;
            var assigneeName = Data.ASSIGNEE_NAME;

            if (policyHolderName.uppercase != assigneeName.uppercase) {
                AsyncFundSwitchDetails().then((data) => {
                    AsyncFundSwitchValue().then((data) => {

                    })
                });
            } else {
                alert("Your fund switch request couldn't be processed. Please try again later.");
            }
            // resolve(Data)
        });
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });;
}

function AsyncFundSwitchDetails() {
    return new Promise((resolve, reject) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
             xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
         <soap:Body>
             <GetFundValue xmlns="http://tempuri.org/">
                 <strPolicyNo>${policyno}</strPolicyNo>
             </GetFundValue>
         </soap:Body>
        </soap:Envelope>`;
        showLoader();
        ApiCallService('/GetFundValue', requestBody, '<Dataset>', '</Dataset>').then((Data) => {
            hideLoader();
            Data = Data.Dataset;
            console.log(JSON.stringify(Data.Table));

            Data = JSON.stringify(Data.Table);
            // Data = JSON.parse(Data);

            // Data = `{"Dataset": {"Table": [{"FUNDNAME": "FN361:Equity Fund - SBIL","UNITS": "1627.755300","NAV": "95.98690294542429073952331778615619","VALUE": "156243.19","NAV_DATE": ""},{    "FUNDNAME": "FN362:Top 300 Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN363:Equity Optimiser Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN364:Growth Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN365:Balanced Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN366:Bond Fund - SBIL",    "UNITS": "1035.025300",    "NAV": "36.15610169142725303429780895210967",    "VALUE": "37422.48",    "NAV_DATE": ""},{    "FUNDNAME": "FN367:Money Market Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""}]}}`;
            // Data = Data;
            let jsonData = JSON.parse(Data);

            listFundSwitchT1 = [];
            listFundSwitchT1 = new Array();

            for (var i = 0; i < jsonData.length; i++) {


                var FUNDNAME, UNITS, NAV, VALUE;

                FUNDNAME = jsonData[i].FUNDNAME;
                if (FUNDNAME == undefined) {
                    FUNDNAME = "";
                }
                UNITS = Math.round(jsonData[i].UNITS);
                if (UNITS == undefined) {
                    UNITS = "";
                }
                NAV = Math.round(jsonData[i].NAV);
                if (NAV == undefined) {
                    NAV = "";
                }
                VALUE = Math.round(jsonData[i].VALUE);
                if (VALUE == undefined) {
                    VALUE = "";
                }

                listFundSwitchT1.push(new getFundSwitchT1(FUNDNAME, UNITS, NAV, VALUE));
            }

            console.log(listFundSwitchT1);

            AsyncFundSwitchValue();
        });
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });;
}

function AsyncFundSwitchValue() {
    return new Promise((resolve, reject) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
             xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
         <soap:Body>
             <getFundDetails xmlns="http://tempuri.org/">
                 <strPolicyNo>${policyno}</strPolicyNo>
             </getFundDetails>
         </soap:Body>
        </soap:Envelope>`;

        showLoader();
        ApiCallService('/getFundDetails', requestBody, '<NewDataSet>', '</NewDataSet>').then((Data) => {
            hideLoader();
            Data = Data.NewDataSet;


            Data = JSON.stringify(Data.Table1);
            // Data = JSON.parse(Data);

            // Data = `{"NewDataSet": {"Table1": [{"FUNDNAME": "FN361:Equity Fund - SBIL","UNITS": "1627.755300","NAV": "95.98690294542429073952331778615619","VALUE": "156243.19","NAV_DATE": ""},{    "FUNDNAME": "FN362:Top 300 Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN363:Equity Optimiser Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN364:Growth Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN365:Balanced Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""},{    "FUNDNAME": "FN366:Bond Fund - SBIL",    "UNITS": "1035.025300",    "NAV": "36.15610169142725303429780895210967",    "VALUE": "37422.48",    "NAV_DATE": ""},{    "FUNDNAME": "FN367:Money Market Fund - SBIL",    "UNITS": "0.000000",    "NAV": "NAN",    "VALUE": "0.00",    "NAV_DATE": ""}]}}`;
            // Data = Data;
            let jsonData = JSON.parse(Data);

            listFundNameValue = [];
            listFundNameValue = new Array();

            // listFundSwitchT2 = [];
            // listFundSwitchT2 = new Array();
            if (jsonData != null) {

                for (var i = 0; i < jsonData.length; i++) {


                    // var STATUS, POLICY_STATUS, PH_NAME, PREVPROCSTATUS, SWITCH_CHARGE, Error_desc;

                    var FundName, FundValue

                    FundName = jsonData[i].FundName;
                    if (FundName == undefined) {
                        FundName = "";
                    }
                    FundValue = jsonData[i].FundValue;
                    if (FundValue == undefined) {
                        FundValue = "";
                    }
                    /*  STATUS = jsonData.Dataset.Table[i].STATUS;
                     if (STATUS == undefined) {
                         STATUS = "";
                     }
                     POLICY_STATUS = Math.round(jsonData.Dataset.Table[i].POLICY_STATUS);
                     if (POLICY_STATUS == undefined) {
                         POLICY_STATUS = "";
                     }
                     PH_NAME = Math.round(jsonData.Dataset.Table[i].PH_NAME);
                     if (PH_NAME == undefined) {
                         PH_NAME = "";
                     }
                     PREVPROCSTATUS = Math.round(jsonData.Dataset.Table[i].PREVPROCSTATUS);
                     if (PREVPROCSTATUS == undefined) {
                         PREVPROCSTATUS = "";
                     }
                     SWITCH_CHARGE = Math.round(jsonData.Dataset.Table[i].SWITCH_CHARGE);
                     if (SWITCH_CHARGE == undefined) {
                         SWITCH_CHARGE = "";
                     }
                     Error_desc = Math.round(jsonData.Dataset.Table[i].Error_desc);
                     if (Error_desc == undefined) {
                         Error_desc = "";
                     } */

                    // listFundSwitchT2.push(new getFundSwitchT1(STATUS, POLICY_STATUS, PH_NAME, PREVPROCSTATUS, SWITCH_CHARGE, Error_desc));
                    listFundNameValue.push(new getListFundNameValue(FundName, FundValue));


                }
                // console.log(JSON.stringify(listFundNameValue));
                setFundNameValue(listFundNameValue);
            }

            // showT2(listFundSwitchT2);

        }).catch((error) => {
            console.log("err ", error);

            alert("Service Error occurred");
            self.hideLoader();
        });;
    });
}


function getFundSwitchT1(FUNDNAME, UNITS, NAV, VALUE) {
    return {
        'FUNDNAME': FUNDNAME,
        'UNITS': UNITS,
        'NAV': NAV,
        'VALUE': VALUE
    }
}

function getListFundNameValue(FundName, FundValue) {
    return {
        'FundName': FundName,
        'FundValue': FundValue
    }
}

function getFundSwitchT2(STATUS, POLICY_STATUS, PH_NAME, PREVPROCSTATUS, SWITCH_CHARGE, Error_desc) {
    return {
        'STATUS': STATUS,
        'POLICY_STATUS': POLICY_STATUS,
        'PH_NAME': PH_NAME,
        'PREVPROCSTATUS': PREVPROCSTATUS,
        'SWITCH_CHARGE': SWITCH_CHARGE,
        'Error_desc': Error_desc
    }
}

function showT1(jsonArr1) {
    // console.log("jsonArr ", jsonArr.length, " startIndex ", startIndex, " endIndex ", endIndex);

    var output = setTableColumnHeader1();
    console.log("JSON ARRAY----" + JSON.stringify(jsonArr1))
    for (var i = 0; i < jsonArr1.length; i++) {
        output += setTable(i, jsonArr1[i].FUNDNAME, jsonArr1[i].UNITS, jsonArr1[i].NAV, jsonArr1[i].VALUE);
        fundValue = parseInt(fundValue) + parseInt(jsonArr1[i].VALUE);
    }

    output += `<tr><td colspan="3">Fund Value(Rs.)</td><td>${fundValue}</td></tr></tbody></table>`;

    document.getElementById("display-resources").innerHTML = output;
}

function setFundNameValue(listFundNameValue1) {
    // listFundNameValue.pop();
    for (var i = 0; i < listFundNameValue1.length; i++) {

        if (listFundNameValue1[i].FundName == "STATUS") {
            status = listFundNameValue1[i].FundValue
        } else if (listFundNameValue1[i].FundName == "POLICY_STATUS") {
            policy_status = listFundNameValue1[i].FundValue
        } else if (listFundNameValue1[i].FundName == "PH_NAME") {
            policyHolderName = listFundNameValue1[i].FundValue
        } else if (listFundNameValue1[i].FundName == "PREVPROCSTATUS") {
            prevprocstatus = listFundNameValue1[i].FundValue
        } else if (listFundNameValue1[i].FundName == "SWITCH_CHARGE") {
            switch_charge = listFundNameValue1[i].FundValue
        } else if (listFundNameValue1[i].FundName == "Error_desc") {
            Error_desc = listFundNameValue1[i].FundValue
        } else {
            listFundNameValue2.push(new getListFundNameValue(listFundNameValue1[i].FundName, listFundNameValue1[i].FundValue));
        }
        // output += setTable(i, jsonArr[i].FUNDNAME, jsonArr[i].UNITS, jsonArr[i].NAV, jsonArr[i].VALUE);
        // fundValue = parseInt(fundValue) + parseInt(jsonArr[i].VALUE);
    }

    if (status == "OK" && prevprocstatus == "OK") {
        document.getElementById('polNum').style.display = "block";
        document.getElementById('polHolder').style.display = "block";
        document.getElementById('value').style.display = "block";
        document.getElementById('policyNumb').innerHTML = policyno;
        document.getElementById('polHolderName').innerHTML = policyHolderName;

        document.getElementById('details').style.display = "block";
        document.getElementById('declaration').style.display = "block";
        showT1(listFundSwitchT1);
        showT2(listFundNameValue2)
    } else {
        document.getElementById('polNum').style.display = "none";
        document.getElementById('polHolder').style.display = "none";
        document.getElementById('value').style.display = "none";

        document.getElementById('details').style.display = "none";
        document.getElementById('declaration').style.display = "none";
        alert("Your fund switch request couldn't be processed. Please try again later.");
    }
}

function showT2(jsonArr) {
    // console.log("jsonArr ", jsonArr.length, " startIndex ", startIndex, " endIndex ", endIndex);

    var output = setTableColumnHeader2();
    console.log("JSON ARRAY----" + JSON.stringify(jsonArr))
    for (var i = 0; i < jsonArr.length; i++) {
        output += setTable2(i, jsonArr[i].FundName);
        // fundValue = parseInt(fundValue) + parseInt(jsonArr[i].VALUE);
    }

    // output += `<tr><td>Fund Value(Rs.)</td><td>${fundValue}</td></tr></tbody></table>`;

    document.getElementById("display-resources1").innerHTML = output;
}

function setTableColumnHeader1() {
    var output = `<table border="1" id="tableRow" ><tbody> `
    var column = '<tr>' +
        '<th>FUND NAME</th>' +
        '<th>UNITS</th>' +
        '<th>NAV</th>' +
        '<th>VALUE</th>' +
        '</tr>';
    output += column;
    return output;
}

function setTableColumnHeader2() {
    var output = `<table border="1" id="tableRow" ><tbody> `
    var column = '<tr>' +
        '<th>FUND NAME</th>' +
        '<th>Switch From</th>' +
        /*   '<th>FUND NAME</th>' + */
        '<th>Switch To</th>' +
        '</tr>';
    output += column;
    return output;
}

function setTable(i, FUNDNAME, UNITS, NAV, VALUE) {

    var output = `<tr >` +
        `<td>` + FUNDNAME + '</td>' +
        `<td>` + UNITS + '</td>' +
        '<td>' + NAV + '</td>' +
        '<td>' + VALUE + '</td>' +
        '</tr>';
    return output;
}

function setTable2(i, FUNDNAME) {

    var output = `<tr >` +
        `<td>` + FUNDNAME + '</td>' +
        `<td><input type="text" placeholder="0%" value= "0" id='from${i}' ></td>` +
        /*   `<td>` + FUNDNAME + `</td>` + */
        `<td> <input type="text" placeholder="0%" value= "0" id='to${i}'></td>` +
        '</tr>';
    return output;
}

function validate() {
    if (document.forms['detailsForm']['agree'].checked) {
        var percent = 0;

        for (var i = 0; i < listFundNameValue2.length; i++) {
            // console.log(document.getElementById(`to${i}`).value);
            // console.log(parseInt(percent));
            percent = parseInt(percent) + parseInt(document.getElementById(`to${i}`).value);
        }

        if (percent != 100) {
            alert("Fund allocation(Switch To) is not 100 %")
        } else {
            var fromList = "",
                toList = "";
            for (var i = 0; i < listFundNameValue2.length; i++) {
                // console.log(document.getElementById(`to${i}`).value);
                // console.log(parseInt(percent));
                fromList = fromList + listFundNameValue2[i].FundName + "|" + listFundNameValue2[i].FundValue + "|" + document.getElementById(`from${i}`).value + ",";
                toList = toList + listFundNameValue2[i].FundName + "|" + document.getElementById(`to${i}`).value + ",";
            }
            console.log(fromList);
            console.log(toList);
            // AsyncServerHits(fromList,toList,policyno)

            var serviceInput =
                "strPolicyNo=" + "1230000000" +
                ",strswitchfrom=" + fromList +
                ",strswitchto=" + toList;

            callServiceHits("switchFund", serviceInput, "MyPolicy").then(function (resolved) {
                console.log(resolved);
                if (resolved == 'Success') {
                    sessionStorage.setItem('userType', "fundSwitchUser");
                    sessionStorage.setItem('strswitchfrom', fromList);
                    sessionStorage.setItem('strswitchto', toList);
                    window.location.href = "../../../FundSwitchDetails/OTPReader/OTPReader.html"
                }
            });

        }
    } else {
        alert("Kindly accept terms and condition.")
    }
}