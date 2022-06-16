window.onload = function () {
    console.log(sessionStorage.getItem('PolicyData'));

    var data = JSON.parse(sessionStorage.getItem('PolicyData'));

    var selectDDL = document.getElementById('policy_no');

    console.log("DATA LENGTH---" + data.Table.length);
    let policyList = "";

    for (let policy = 0; policy < data.Table.length; policy++) {

        let policyNumber = data.Table[policy].POLICYNO;
        selectDDL.add(new Option(policyNumber, (policy)));

    }
};

var policyHolderName, policyNumber, premiumDueDate, premiumPayable;
var panNo;


function getEFT() {
    var policySelected = document.getElementById('policy_no');

    /*   let request = `<?xml version="1.0" encoding="utf-8"?>
                      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                          xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                          xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                      <soap:Body>
                          <GetPremiumDetailCSS xmlns="http://tempuri.org/">
                              <strPolicyNo>${policySelected.options[policySelected.selectedIndex].text}</strPolicyNo>
                              <baCode>0</baCode>
                              <reqCssStr>EASYACCESS</reqCssStr>
                          </GetPremiumDetailCSS>
                      </soap:Body>
                      </soap:Envelope>`; */

    let request = "";
    showLoader();
    callServiceHits('GetPremiumDetailCSS', request, "MyPolicy").then((serverLog) => {
        hideLoader();
        console.log(serverLog);
        if (serverLog == "Success") {

            let requestBody = `<?xml version="1.0" encoding="utf-8"?>
                               <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                                <soap:Body>
                                    <GetPremiumDetailCSS xmlns="http://tempuri.org/">
                                        <strPolicyNo>${policySelected.options[policySelected.selectedIndex].text}</strPolicyNo>
                                        <baCode>0</baCode>
                                        <reqCssStr>EASYACCESS</reqCssStr>
                                    </GetPremiumDetailCSS>
                                </soap:Body>
                               </soap:Envelope>`;
            showLoader();
            ApiCallService('/GetPremiumDetailCSS', requestBody, '<ScreenData>', '</ScreenData>').then((policyData) => {
                hideLoader();
                policyData = policyData.ScreenData;

                if (policyData.ErrCode == "1") {
                    document.getElementById('myModal').style.display = 'block';
                    alert(policyData.ErrDesc)
                } else {

                    policyHolderName = policyData.Sbi_First_Name + " " + policyData.Sbi_Middle_Name + " " + policyData.Sbi_Last_Name;
                    policyNumber = policyData.PolNo;
                    premiumDueDate = policyData.DueDate;
                    premiumPayable = Math.round(policyData.GrossAmt);

                    document.getElementById('policyHolderName').innerHTML = policyData.Sbi_First_Name + " " + policyData.Sbi_Middle_Name + " " + policyData.Sbi_Last_Name;
                    document.getElementById('policyNumber').innerHTML = policyData.PolNo;
                    document.getElementById('premiumDueDate').innerHTML = policyData.DueDate;
                    document.getElementById('premiumPayable').innerHTML = Math.round(policyData.GrossAmt);
                }
            });
        }

    });
}

function onPayClicked() {
    // console.log(document.forms['modalForm']['agree'].checked);
    if (document.forms['modalForm']['agree'].checked) {
        if (parseInt(premiumPayable) >= 50000) {
            CheckPanExist().then((data) => {
                console.log(data)

                if (data == 0) {

                    var strFinalMainMsg = policyNumber + "|" + premiumPayable + "|" +
                        "ConnectLife-EASYACC";
                    var finalUrl = "javascript:" +
                        "var to = 'https://sbilposservices.sbilife.co.in/EasyPayrequest.aspx?REQ_CHANNEL=" +
                        strFinalMainMsg + "';" + "var p = {param:'" + 12345 + "'};" +
                        "var myForm = document.createElement('form');" +
                        "myForm.method='post' ;" + "myForm.action = to;" +
                        "for (var k in p) {" +
                        "var myInput = document.createElement('input') ;" +
                        "myInput.setAttribute('type', 'hidden');" +
                        "myInput.setAttribute('name', 'msg') ;" +
                        "myInput.setAttribute('value', '" + strFinalMainMsg + "');" +
                        "myForm.appendChild(myInput) ;" + "}" +
                        "document.body.appendChild(myForm) ;" + "myForm.submit() ;" +
                        "document.body.removeChild(myForm) ;";
                    window.location.href = finalUrl;
                } else {

                    $("#myModal1").modal("show");

                }
            });
        } else {

            var strFinalMainMsg = policyNumber + "|" + premiumPayable + "|" +
                "ConnectLife-EASYACC";
            var finalUrl = "javascript:" +
                "var to = 'https://sbilposservices.sbilife.co.in/EasyPayrequest.aspx?REQ_CHANNEL=" +
                strFinalMainMsg + "';" + "var p = {param:'" + 12345 + "'};" +
                "var myForm = document.createElement('form');" +
                "myForm.method='post' ;" + "myForm.action = to;" +
                "for (var k in p) {" +
                "var myInput = document.createElement('input') ;" +
                "myInput.setAttribute('type', 'hidden');" +
                "myInput.setAttribute('name', 'msg') ;" +
                "myInput.setAttribute('value', '" + strFinalMainMsg + "');" +
                "myForm.appendChild(myInput) ;" + "}" +
                "document.body.appendChild(myForm) ;" + "myForm.submit() ;" +
                "document.body.removeChild(myForm) ;";
            window.location.href = finalUrl;
        }
    } else {
        alert("Please select declaration checkbox!")
    }
}

function CheckPanExist() {
    return new Promise((resolve, reject) => {
        var parser, data, xmlDoc, requestBody, serviceResp;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + '/checkPanReq', true);

        // build SOAP request
        requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soap:Body> ' +
            '<checkPanReq xmlns="http://tempuri.org/"> ' +
            '<strPolicyNum>' + policyNumber + '</strPolicyNum> ' +
            '</checkPanReq> ' +
            '</soap:Body> ' +
            '</soap:Envelope> ';

        console.log(requestBody);
        self.showLoader();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                self.hideLoader();
                if (xmlhttp.status == 200) {
                    data = unescapeHTML(xmlhttp.responseText);
                    console.log(data)
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(data, 'text/xml')
                    } else {
                        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                        xmlDoc.async = false;
                        xmlDoc.loadXML(data);
                    }
                    serviceResp = xmlDoc.getElementsByTagName('checkPanReqResult')[0].textContent;
                    resolve(serviceResp);
                }
            }
        }

        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //send the SOAP request
        xmlhttp.send(requestBody);
    });
}

function panSubmit() {
    var panNo = document.getElementById('panNo').value;
    var regpan = /^([A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})$/

    console.log(panNo);
    if (panNo != "") {
        if (panNo.search(regpan) == -1) {
            alert("Please enter valid PAN Number")
        } else {
            InsertPanCard();
        }
    }
}

function InsertPanCard() {
    var parser, data, xmlDoc, requestBody, serviceResp;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Base_URL + '/saveEasyAccessPancardDtls', true);

    // build SOAP request
    requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        '<soap:Body> ' +
        '<saveEasyAccessPancardDtls xmlns="http://tempuri.org/"> ' +
        '<policyNo>' + policyNumber + '</policyNo> ' +
        '<pancardNo>' + panNo + '</pancardNo> ' +
        '<source>Android</source> ' +
        '</saveEasyAccessPancardDtls> ' +
        '</soap:Body> ' +
        '</soap:Envelope> ';

    console.log(requestBody);
    self.showLoader();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            self.hideLoader();
            if (xmlhttp.status == 200) {
                data = unescapeHTML(xmlhttp.responseText);
                console.log(data)
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(data, 'text/xml')
                } else {
                    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                    xmlDoc.async = false;
                    xmlDoc.loadXML(data);
                }

                $('#myModal1').modal('hide');

            } else {
                alert("Something went wrong")
            }
        }
    }

    //specify request headers
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    //send the SOAP request
    xmlhttp.send(requestBody);
}