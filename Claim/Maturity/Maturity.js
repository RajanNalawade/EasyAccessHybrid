window.onload = function () {
    this.ready();
};

var authKey = "SBIL";
var source = "EASYACCESS";

function ready() {

}

function validateMaturityForm() {
    if (maturityForm.checkValidity()) {
        getMaturityData();
    }
}

function getMaturityData() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <checkMaturityProposal xmlns="http://tempuri.org/">
                    <strProposalNo>${getProposalNo()}</strProposalNo>
                    <authkey>${authKey}</authkey>
                    <source>${source}</source>
                    </checkMaturityProposal>
                </soap:Body>
                </soap:Envelope>`;

    showLoader();
    self.ApiCallService('/checkMaturityProposal', body, '<CIFPolicyList>', '</CIFPolicyList>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.CIFPolicyList !== undefined) {
                response = response.CIFPolicyList;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrorMsg);
                } else if (response.ErrCode == 1) {
                    alert(response.ScreenData.ErrorMsg);
                } else {
                    response = response.Table;
                    var ouput = "";

                    if (!Array.isArray(response)) {
                        var temp = response;
                        response = new Array();
                        response.push(temp);
                    }
                    document.getElementById("total_count").innerHTML = "Total Policy : " + response.length;
                    var output = "";

                    //output += "<table id='mytab1'><tr><td>Code</td><td>Collectable</td><td>Collected</td><td>Persistency</td><td>Unpaid Policy Count</td><td>Name</td></tr></table>";
                    for (var i = 0; i < response.length; i++) {

                        var POLICYNUMBER, customerCode, lifeAssuredName, STATUS, benefitTerm,
                            POLICYRISKCOMMENCEMENTDATE, MATURITYDATE, PAYMENTAMOUNT,
                            DOB, CITY, ADDRESS, Postal_x0020_Code, STATE, contactNumber;

                        POLICYNUMBER = response[i].POLICYNUMBER;
                        if (POLICYNUMBER == undefined) {
                            POLICYNUMBER = "";
                        }


                        customerCode = response[i].Customer_x0020_Code;
                        if (customerCode == undefined) {
                            customerCode = "";
                        }

                        lifeAssuredName = response[i].LIFEASSUREDNAME;
                        if (lifeAssuredName == undefined) {
                            lifeAssuredName = "";
                        }

                        STATUS = response[i].STATUS;
                        if (STATUS == undefined) {
                            STATUS = "";
                        }
                        benefitTerm = response[i].Benefit_x0020_Term;
                        if (benefitTerm == undefined) {
                            benefitTerm = 0;
                        }

                        POLICYRISKCOMMENCEMENTDATE = response[i].POLICYRISKCOMMENCEMENTDATE;
                        if (POLICYRISKCOMMENCEMENTDATE == undefined) {
                            POLICYRISKCOMMENCEMENTDATE = "";
                        } else {
                            POLICYRISKCOMMENCEMENTDATE = dateDDFullMonthYYYY(getFormatedDate(POLICYRISKCOMMENCEMENTDATE));
                        }


                        MATURITYDATE = response[i].MATURITYDATE;
                        if (MATURITYDATE == undefined) {
                            MATURITYDATE = "";
                        } else {
                            MATURITYDATE = dateDDFullMonthYYYY(getFormatedDate(MATURITYDATE));
                        }

                        PAYMENTAMOUNT = parseFloat(response[i].PAYMENTAMOUNT);
                        if (PAYMENTAMOUNT == undefined) {
                            PAYMENTAMOUNT = 0;
                        } else {
                            PAYMENTAMOUNT = PAYMENTAMOUNT.toFixed(2);
                        }

                        DOB = response[i].DOB;
                        if (DOB == undefined) {
                            DOB = "";
                        } else {
                            DOB = dateDDFullMonthYYYY(getFormatedDate(DOB));
                        }

                        CITY = response[i].CITY;
                        if (CITY == undefined) {
                            CITY = "";
                        }

                        ADDRESS = response[i].ADDRESS;
                        if (ADDRESS == undefined) {
                            ADDRESS = "";
                        }

                        Postal_x0020_Code = response[i].Postal_x0020_Code;
                        if (Postal_x0020_Code == undefined) {
                            Postal_x0020_Code = "";
                        }

                        STATE = response[i].STATE;
                        if (STATE == undefined) {
                            STATE = "";
                        }

                        contactNumber = response[i].CONTACT_NO_R;
                        if (contactNumber == undefined) {
                            contactNumber = "";
                        }

                        output += `<table class='table table-striped borderless one' id="tableRow${i}" onclick="openModal(${i})"> <tbody>`;
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Policy Number  </th> <td> " + POLICYNUMBER + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Customer Code  </th> <td> " + customerCode + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Life Assured Name  </th> <td> " + lifeAssuredName + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Status  </th> <td> " + STATUS + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Benefit Term   </th> <td> " + benefitTerm + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Risk Commencement Date   </th> <td> " + POLICYRISKCOMMENCEMENTDATE + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Maturity Date  </th> <td> " + MATURITYDATE + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>* Maturity Amount:  </th> <td> " + PAYMENTAMOUNT + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>DOB  </th> <td> " + DOB + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>City  </th> <td> " + CITY + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Address  </th> <td> " + ADDRESS + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Postal Code  </th> <td> " + Postal_x0020_Code + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>State  </th> <td> " + STATE + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Contact Number  </th> <td> " + contactNumber + "</td></tr>";
                        output += "</tbody> </table>";
                    }

                    output += "<hr/>"

                    document.getElementById("display-resources").innerHTML = output;
                }
            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });
}

function getProposalNo() {
    return document.forms["maturityForm"]["proposalNo"].value;
}
