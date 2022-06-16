window.onload = function () {
    getMyPolicyDetails();
};

$(".tabs_goto").click(function () {
    $(this)
        .addClass("-active")
        .siblings()
        .removeClass("-active")
        .closest(".tabs")
        .find(".tabs_section")
        .eq($(this).index())
        .addClass("-open")
        .siblings()
        .removeClass("-open")
});

//This function is used to policy details from service.
function getMyPolicyDetails() {
    let policyNumber = decryptData(sessionStorage.getItem('Policy Number'), '1234');
    console.log(decryptData(sessionStorage.getItem('Policy Number'), '1234'));
    //let custId = sessionStorage.getItem('custid');
    let custId = getCustomerId();
    showLoader();
    callServiceHits('showPolicyDtls', custId + " " + policyNumber, "").then((logService) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
                           <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                           <soap:Body>
                               <showPolicyDtls  xmlns="http://tempuri.org/">
                                   <strPolicyNumber>${policyNumber}</strPolicyNumber>
                                   <userId>${custId}</userId>
                               </showPolicyDtls>
                           </soap:Body>
                           </soap:Envelope>`;

        ApiCallService('/showPolicyDtls', requestBody, '<CustDls>', '</CustDls>').then((myPolicyData) => {
            console.log("-----------------------------------Policy Lists------------------------------------ \n" + JSON.stringify(myPolicyData.CustDls));
            hideLoader();
            //Customer Information
            document.getElementById('lblProductName').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.PRODUCT;
            document.getElementById('lblPolicyHolderName').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.POLICYHOLDER;
            document.getElementById('lblNominee').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.NOMIEE;
            document.getElementById('lblAddress').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.ADDRESS;
            document.getElementById('lblChannel').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.CHANNEL;
            document.getElementById('lblChannelID').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.CAHNNELID;
            document.getElementById('lblComments').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.COMMENTS;
            document.getElementById('lblPolicyNo').innerHTML = policyNumber;
            document.getElementById('lblProposalNo').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.PROPOSAL_NO;
            document.getElementById('lblFrequency').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.FREQUENCY;
            document.getElementById('lblSumAssured').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.SUM_ASSURED;
            document.getElementById('lblInstPremium').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.INST_PREM;
            document.getElementById('lblDOC').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.DOC;
            document.getElementById('lblStatus').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.STATUS;
            document.getElementById('lblFirstUnpaidPremDate').innerHTML = myPolicyData.CustDls.CustomerPolicyDetails.FUP_DATE;

            //Policy Information
            document.getElementById('lblRiderName').innerHTML = myPolicyData.CustDls.PolicyDetails.RIDERNAME;
            document.getElementById('lblSumAssuredPolicy').innerHTML = myPolicyData.CustDls.PolicyDetails.SUMINSURED;
            document.getElementById('lblRiskPremium').innerHTML = myPolicyData.CustDls.PolicyDetails.RISKPREMIUM;
            document.getElementById('lblPremiumTerm').innerHTML = myPolicyData.CustDls.PolicyDetails.PREMIUMTERM;
            document.getElementById('lblBenefitTerm').innerHTML = myPolicyData.CustDls.PolicyDetails.BENEFITERM;

            //Payment Summary
            document.getElementById('lblTotalPremiumPaid').innerHTML = myPolicyData.CustDls.TotalPremiumpaidDT[0].TOTALPREMIUMPAID;
            document.getElementById('lblLastUnpaidDate').innerHTML = myPolicyData.CustDls.TotalPremiumpaidDT[0].LASTTOPUPPAIDDATE;

            //Servicing History
            document.getElementById('lblDOP').innerHTML = myPolicyData.CustDls.RequestHistory[0].DOP;
            document.getElementById('lblUserID').innerHTML = myPolicyData.CustDls.RequestHistory[0].USERID;
            document.getElementById('lblPlace').innerHTML = myPolicyData.CustDls.RequestHistory[0].PLACE;
            document.getElementById('lblDescription').innerHTML = myPolicyData.CustDls.RequestHistory[0].DESCRIPTION;
        });
    });
};