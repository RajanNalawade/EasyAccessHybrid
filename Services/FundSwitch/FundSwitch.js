window.onload = function () {
    getPolicyDetails();
};
let mobileNo;

function getPolicyDetails() {
    console.log(sessionStorage.getItem('custId'));
    let custId = getCustomerId();
    // let custId = 'dummy';
    showLoader();
    callServiceHits('getFundValueDetail', custId, "").then((logService) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
                           <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                            <soap:Body>
                                <getFundValueDetail xmlns="http://tempuri.org/">
                                    <strCustID>${custId}</strCustID>
                                </getFundValueDetail>
                            </soap:Body>
                           </soap:Envelope>`;
        ApiCallService('/getFundValueDetail', requestBody, '<CustDls>', '</CustDls>').then((fundSwitchData) => {

            hideLoader();
            console.log("-----------------------------------Policy Lists------------------------------------ \n" + JSON.stringify(fundSwitchData));

            console.log(JSON.stringify(fundSwitchData));
            sessionStorage.setItem('FundSwitchData', JSON.stringify(fundSwitchData.CustDls));
            // sessionStorage.setItem('PolicyData', JSON.stringify(policyData.CustDls)); //Saving policy data in session for further use.

            // document.getElementById('lblPolicyCount').innerHTML = policyData.CustDls.Table.length; //Display PolicyCount in UI.

            let policyList = "";

            for (let i = 0; i < fundSwitchData.CustDls.Table.length; i++) {
                //Assign PolicyDetails to variables.
                let policyNumber = fundSwitchData.CustDls.Table[i].POLICYNO;
                let status = fundSwitchData.CustDls.Table[i].STATUS;
                let FUP = fundSwitchData.CustDls.Table[i].FUP;
                let fundValue = fundSwitchData.CustDls.Table[i].FUNDVALUE;
                let policyType = fundSwitchData.CustDls.Table[i].POLICYTYPE;
                let productName = fundSwitchData.CustDls.Table[i].PRODUCTNAME;
                mobileNo = fundSwitchData.CustDls.Table[i].MOBILE_NO;

                policyList += `<div class='row'>`;
                policyList += `<div class='col-md-6' style='padding: unset;'>`;
                policyList += `<button type='button' class='btntab' style='width: 100%;' value=policyNumber onclick='redirectToFundSwitchDetails(this.value,"newUser",policyType);'>Policy Number: ${policyNumber}</button>`;
                policyList += `<div class='policy-box'>`;
                policyList += `<div class='container' style='width:100%;'>`;
                policyList += `<div class='row'>`;
                policyList += `<div class='col-xs-12' style='padding-left: 0px !important;padding-right: 0px !important;'>`;
                policyList += `<div class='table-responsive' style='margin-bottom: 0px !important'>`;
                policyList += `<table class='table table-bordered table-hover'>`;
                policyList += `<tbody>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Product Name:</th>`;
                policyList += `<td>${productName}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Status:</th>`;
                policyList += `<td>${status}</td>`;
                policyList += `</tr>`
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>FUP:</th>`;
                policyList += `<td>${FUP}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Fund Value:</th>`;
                policyList += `<td>${fundValue}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Policy Type:</th>`;
                policyList += `<td>${policyType}</td>`;
                policyList += `</tr>`;
                policyList += `</tbody>`;
                policyList += `</table>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</div>`;
                policyList += `</br>`;
            }

            document.getElementById('divPolicyList').innerHTML = policyList;
        });
    });
};

function redirectToFundSwitchDetails(policyNumber, userType, policyType) {
    // policyNumber = "11111111111"
    // userType = "newUser"
    // if(policyType == "ULIP"){
    sessionStorage.setItem('fundSwitchPolicyNumber', encryptData(policyNumber, getSessionID()));
    sessionStorage.setItem('userType', userType);
    sessionStorage.setItem('mobileNo', '1111111111');
    window.location.href = "../FundSwitch/FundSwitchDetails/FundSwitchDetails.html"
    // }
}