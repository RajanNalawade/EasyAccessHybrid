window.onload = function () {
    getViewPolicyDetails();
};

function getViewPolicyDetails() {
    //let custId = sessionStorage.getItem('custid');
    let custId = getCustomerId();
    console.log("custId ", custId);
    showLoader();
    callServiceHits('showAllPolicyDtls', custId, "").then((logService) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
                           <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                            <soap:Body>
                                <showAllPolicyDtls xmlns="http://tempuri.org/">
                                    <strCustId>${custId}</strCustId>
                                </showAllPolicyDtls>
                            </soap:Body>
                           </soap:Envelope>`;

        ApiCallService('/showAllPolicyDtls', requestBody, '<CustDls>', '</CustDls>').then((policyData) => {
            hideLoader();
            console.log("-----------------------------------Policy Lists------------------------------------ \n" + JSON.stringify(policyData.CustDls));

            sessionStorage.setItem('PolicyData', JSON.stringify(policyData.CustDls)); //Saving policy data in session for further use.

            let policyList = "";
            var data = new Array();
            if (!Array.isArray(policyData.CustDls.Table)) {
                data.push(policyData.CustDls.Table);
            } else {
                data = policyData.CustDls.Table
            }

            document.getElementById('lblPolicyCount').innerHTML = data.length; //Display PolicyCount in UI.

            for (let policy = 0; policy < data.length; policy++) {
                //Assign PolicyDetails to variables.
                let policyNumber = data[policy].POLICYNO;
                let productName = data[policy].PRODUCTNAME;
                let dateOfCommencement = data[policy].DATEOFCOMMENCEMENT;
                let frequency = data[policy].FREQUENCY;
                let premiumAmount = data[policy].PREMIUMAMOUNT;
                let status = data[policy].STATUS;
                let premiumDate = data[policy].PREMIUMDUEDATE;
                let unpaidPremium = data[policy].UNPAIDPREMIUM;
                let maturityDate = data[policy].MATURITYDATE;
                let maturityFlag = data[policy].MATURITYFLAG;

                policyList += `<div class='row'>`;
                policyList += `<div class='col-md-6' style='padding: unset;'>`;
                policyList += `<button type='button' class='btntab' style='width: 100%;' value=${policyNumber} onclick='redirectToPolicyDetails(this.value);'>Policy Number: ${policyNumber}</button>`;
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
                policyList += `<th class='col-md-3'>Date of Commencement:</th>`;
                policyList += `<td>${dateOfCommencement}</td>`;
                policyList += `</tr>`
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Payment Frequency:</th>`;
                policyList += `<td>${frequency}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Premium Amount:</th>`;
                policyList += `<td>${premiumAmount}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Status:</th>`;
                policyList += `<td>${status}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Last Paid Premium:</th>`;
                policyList += `<td>${premiumDate}</td>`;
                policyList += `</tr>`;
                policyList += `<tr>`;
                policyList += `<th class='col-md-3'>Next Due Premium:</th>`;
                policyList += `<td>${unpaidPremium}</td>`;
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

function redirectToPolicyDetails(policyNumber) {
    sessionStorage.setItem('Policy Number', encryptData(policyNumber, '1234'));
    window.location.href = '../MyPolicyDetails/MyPolicyDetails.html';
}