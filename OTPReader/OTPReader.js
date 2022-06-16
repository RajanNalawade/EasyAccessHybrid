let userType, policyno, mobileNo;
var otp;
var strswitchfrom, strswitchto;

window.onload = function () {
    if (sessionStorage.getItem("flag") != "forgetPass") {
        userType = sessionStorage.getItem('userType');
        // mobileNo = sessionStorage.getItem('mobileNo');
        strswitchfrom = sessionStorage.getItem('strswitchfrom');
        strswitchto = sessionStorage.getItem('strswitchto');
        // policyno = decryptData(sessionStorage.getItem('fundSwitchPolicyNumber'), getSessionID());

        if (userType == "newUser") {
            mobileNo = JSON.parse(sessionStorage.getItem('newUserDetails'));
        }
        if (userType == "fundSwitchUser" || userType == "newUser") {
            AsyncGenerateOTP().then((data) => {
                if (data == "1") {
                    alert("OTP is sent to your registered mobile number");
                }
            });
        }
    } else {
        mobileNo = sessionStorage.getItem('mobileNo');
    }
}

function AsyncGenerateOTP() {
    return new Promise((resolve, reject) => {
        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
             xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
         <soap:Body>
             <GenerateOTP_EasyAccess xmlns="http://tempuri.org/">
                 <MOBILE_NO>${mobileNo}</MOBILE_NO>
             </GenerateOTP_EasyAccess>
         </soap:Body>
        </soap:Envelope>`;
        showLoader();
        ApiCallService('/GenerateOTP_EasyAccess', requestBody, '<GenerateOTP_EasyAccessResult>', '</GenerateOTP_EasyAccessResult>').then((Data) => {
            hideLoader();
            console.log(JSON.stringify(Data.GenerateOTP_EasyAccessResult));
            if (Data == "<ErrCode>1</ErrCode>" && Data == "Please check your Policy Number OR DOB.") {
                alert("Please check your Policy Number OR DOB.")
            } else if (Data == "1") {
                resolve(Data)
            }

        });
    });
}

function otpValidation() {
    var num1, num2, num3, num4, num5;

    num1 = document.getElementById('1').value;
    num2 = document.getElementById('2').value;
    num3 = document.getElementById('3').value;
    num4 = document.getElementById('4').value;
    num5 = document.getElementById('5').value;


    if (num1 != "" || num2 != "" || num3 != "" || num4 != "" || num5 != "") {
        otp = num1 + num2 + num3 + num4 + num5;

        AsyncValidateOTP(otp);
    }

}

function AsyncValidateOTP(otp) {

    let requestBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
         xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
         <validateOTP_easyacess xmlns="http://tempuri.org/">
             <strOTP>${otp}</strOTP>
             <MOBILE_NO>${mobileNo}</MOBILE_NO>
         </validateOTP_easyacess>
     </soap:Body>
    </soap:Envelope>`;
    showLoader();
    ApiCallService('/validateOTP_easyacess', requestBody, '<GenerateOTP_EasyAccessResult>', '</GenerateOTP_EasyAccessResult>').then((Data) => {
        hideLoader()
        console.log(JSON.stringify(Data));
        //  resolve(Data)
        if (Data == 1) {
            if (userType == "newUser" || sessionStorage.getItem("flag") === "forgetPass") {
                window.location.href = "../SetPIN/SetPIN.html";
            } else if (newUser == "fundSwitchUser") {
                AsyncFundSwitchValidation();
            }
        }

    });
}

function changeFocus(id, value) {
    console.log(id)
    if (id == 1) {
        document.forms['otpForm'].elements['1'].focus();

    }
    if (id == 2) {
        document.forms['otpForm'].elements['2'].focus();
    }
    if (id == 3) {
        document.forms['otpForm'].elements['3'].focus();
    }
    if (id == 4) {
        document.forms['otpForm'].elements['4'].focus();
    }
    if (id == 5) {
        // document.forms['otpForm'].elements['0'].focus();
    }
}

// MONEY_MARKET|0.0|0,GROWTH|0.0|0,EQUITY_OPTIMIZER|0.0|0,BOND|242294.1394|0,EQUITY|61631.485|0,BALANCED|0.0|0,TOP_300|0.0|0,
// MONEY_MARKET|100,GROWTH|0,EQUITY_OPTIMIZER|0,BOND|0,EQUITY|0,BALANCED|0,TOP_300|0,

function AsyncFundSwitchValidation() {
    let requestBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
         xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
         <switchValidation xmlns="http://tempuri.org/">
             <strPolicyNo>  </strPolicyNo>
             <strswitchfrom>${strswitchfrom}</strswitchfrom>
             <strswitchto>${strswitchto}</strswitchto>
         </switchValidation>
     </soap:Body>
    </soap:Envelope>`;
    showLoader();
    ApiCallService('/switchValidation', requestBody, '<switchValidationResult>', '</switchValidationResult>').then((Data) => {
        hideLoader();
        console.log(JSON.stringify(Data.switchValidationResult));
        //  resolve(Data)
        if (Data.switchValidationResult == "ok") {
            // AsyncFundSwitch();
        }

    });
}

function AsyncFundSwitch() {
    let requestBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
         xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
         <switchFund xmlns="http://tempuri.org/">
             <strPolicyNo>  </strPolicyNo>
             <strswitchfrom>${strswitchfrom}</strswitchfrom>
             <strswitchto>${strswitchto}</strswitchto>
         </switchFund>
     </soap:Body>
    </soap:Envelope>`;
    showLoader();
    ApiCallService('/switchFund', requestBody, '<switchFundResult>', '</switchFundResult>').then((Data) => {
        hideLoader();
        console.log(JSON.stringify(Data.switchFundResult));
        //  resolve(Data)
        if (Data.switchFundResult == "ok") {
            alert("Funds Switched Successfully.")
            window.location.href = "../../../ViewPolicy/ViewPolicy.html"
        }

    });
}