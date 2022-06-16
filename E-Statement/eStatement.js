var totalPrem, pensionPrem, otherPrem, critiPrem;

window.onload = function () {
    setDateDropdown();
    getPolicies();
}

function setDateDropdown() {
    dateDropdownList = document.forms["eStatementForm"]["dateSelection"];
    var todayDate = new Date();
    var CurrentMonth = todayDate.getMonth();
    var CurrentYear = todayDate.getFullYear()
    if (CurrentMonth > 2) {
        nextYear = CurrentYear + 1;
        prevYear = CurrentYear - 1;

        dateDropdownList.add(new Option(CurrentYear + "-" + (nextYear.toString()).substring(2)));
        dateDropdownList.add(new Option(prevYear + "-" + (CurrentYear.toString()).substring(2)));


    } else {

        prevYear = CurrentYear - 1;
        befPrevYear = CurrentYear - 2;

        dateDropdownList.add(new Option(prevYear + "-" + (CurrentYear.toString()).substring(2)));
        dateDropdownList.add(new Option(befPrevYear + "-" + (prevYear.toString()).substring(2)));

    }
}

function getPolicies() {

    let custId = getCustomerId();
    policyNoDropdownList = document.forms["eStatementForm"]["policyNumberList"];

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


        showLoader();
        ApiCallService('/showAllPolicyDtls', requestBody, '<CustDls>', '</CustDls>').then((policyData) => {
            hideLoader()
            console.log("policyData ", policyData);
            var data = new Array();
            if (!Array.isArray(policyData.CustDls.Table)) {
                data.push(policyData.CustDls.Table);
            } else {
                data = policyData.CustDls.Table
            }
            for (var policy = 0; policy < data.length; policy++) {
                console.log("inside ");

                let policyNumber = data[policy].POLICYNO;
                policyNoDropdownList.add(new Option(policyNumber));

            }
        });

    });

}

function getPolicyNumber() {
    return document.forms["eStatementForm"]["policyNumberList"].value;
}

function getDate() {
    return document.forms["eStatementForm"]["dateSelection"].value;
}

function savePDF() {
    let custId = getCustomerId();
    callServiceHits('getPPC', custId, "").then((logService) => {

        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
  
                           <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  
                                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  
                                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  
                            <soap:Body>
  
                                <getPPC xmlns="http://tempuri.org/">
  
                                    <strPolicyNumber>123456789</strPolicyNumber>
                                    <strFinYear>${getDate()}</strFinYear>
  
                                </getPPC>
  
                            </soap:Body>
  
                           </soap:Envelope>`;

        // 123456789 use for uat

        showLoader();
        ApiCallService('/getPPC', requestBody, '<getPPCResult>', '</getPPCResult>').then((data) => {
            hideLoader();
            console.log("data ", data);

            var newData = data.getPPCResult.NewDataSet;
            console.log("newData ", newData);

            if (newData == undefined || newData == null) {
                document.getElementById("responseError").innerHTML = " Premium Paid Certificate could not be generated for yor policy.For any clarification, mail us at mycare@sbilife.co.in or contact us on toll free number 1800-267-9090."
            } else {
                calculateTotalPrem(newData.Table1)
                // createPDF(newData);
            }


        });

    });

}



let createPDF = (calculationJSONDataReceivedFromServer) => {
    // calculationJSONDataReceivedFromServer = calculationJSONDataReceivedFromServer.Table1;
    console.log("Inside PDF");
    return new Promise((resolve, reject) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let doc = {
            // a string or { width: number, height: number }
            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'potrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [10, 30, 10, 30],
            header: function (currentPage, pageCount, pageSize) {
                return [{
                    text: `Date:- ${new Date().toLocaleString('en-IN',options)} `,
                    alignment: 'right',
                    margin: [0, 10, 50, 0]
                }]
            },
            content: [{
                    image: `sbiLogo`,
                    width: 100
                },
                {
                    canvas: [{
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 580,
                        y2: 5,
                        lineWidth: 1,
                        lineCap: 'round'
                    }]
                },

                {
                    style: 'addressFontStyle',
                    margin: [10, 40, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.PH_NAME}`], //calculationJSONDataReceivedFromServer.PH_NAME
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyle',
                    margin: [10, 20, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.ADDRESS1}`], //calculationJSONDataReceivedFromServer.ADDRESS1
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyle',
                    margin: [10, 0, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.ADDRESS2}`], //calculationJSONDataReceivedFromServer.ADDRESS2
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyle', //calculationJSONDataReceivedFromServer.ADDRESS3
                    margin: [10, 0, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.ADDRESS3}`],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyle',
                    margin: [10, 0, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.CITY,  calculationJSONDataReceivedFromServer.PINCODE}`], //calculationJSONDataReceivedFromServer.CITY,calculationJSONDataReceivedFromServer.PINCODE
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyle',
                    margin: [10, 0, 0, 0],
                    text: [`${calculationJSONDataReceivedFromServer.STATE}`], //calculationJSONDataReceivedFromServer.STATE
                    alignment: 'left',
                },
                {
                    style: 'benefitIllustratorHeading',
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*'],
                        alignment: 'center',
                        body: [
                            [{
                                text: `PREMIUM PAID CERTIFICATE FOR THE YEAR  ${getDate()}`,
                                border: [false, false, false, false],
                                alignment: 'center'
                            }]
                        ]
                    }
                },
                {
                    style: 'addressFontStyle',
                    margin: [10, 15, 0, 0],
                    text: ['This is to certify that the following payments have been made under life insurance policies held by'],
                    alignment: 'left',
                },

                {
                    style: 'smallFontSize',
                    margin: [10, 15, 0, 0],
                    table: {
                        widths: ['*', '*', '*', '*', '*', '*', '*'],
                        body: returnMultipleRows(calculationJSONDataReceivedFromServer),
                    }
                },
                {
                    style: 'smallFontSize',
                    margin: [10, 15, 0, 0],
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [{
                                    text: "#Total Premium paid Under pension plan is : ",
                                    colSpan: 2,
                                    border: [false, false, false, false, ]
                                }, {},
                                {
                                    text: `${pensionPrem}`,
                                    border: [false, false, false, false, ]
                                }
                            ],
                            [{
                                    text: "&Total Premium paid Under Other plan is : ",
                                    colSpan: 2,
                                    border: [false, false, false, false, ]
                                }, {},
                                {
                                    text: `${otherPrem}`,
                                    border: [false, false, false, false, ]
                                }
                            ],
                            [{
                                    text: "^Total Premium paid Under Critical Illness is : ",
                                    colSpan: 2,
                                    border: [false, false, false, false, ]
                                }, {},
                                {
                                    text: `${critiPrem}`,
                                    border: [false, false, false, false, ]
                                }
                            ],
                            [{
                                    text: "Total Amount paid towards Premium is : ",
                                    colSpan: 2,
                                    border: [false, true, false, false, ]
                                }, {},
                                {
                                    text: `${totalPrem}`,
                                    border: [false, true, false, false, ]
                                }
                            ]

                        ]
                    }
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 15, 0, 0],
                    text: ['#Pension Plan are provided exemption under section 80 CCC(1)'],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 5, 0, 0],
                    text: ['&Premium paid Under Other plan is provided exemption under Sec 8o C'],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 5, 0, 0],
                    text: ['*Premium Amount is Inclusive of Critical Illness Premium'],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 5, 0, 0],
                    text: ['^Critical Illness Premium is provided exemption under section 80 D'],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 5, 0, 0],
                    text: ['Service Tax has been included in Premium from 10-Sep-2004 Onwards'],
                    alignment: 'left',
                },
                {
                    style: 'addressFontStyleWithoutBold',
                    margin: [10, 5, 0, 0],
                    text: ['This Certificate is electronically generated and does not require any signature'],
                    alignment: 'left',
                },

            ],
            images: {
                sbiLogo: 'data:image/jpeg;base64,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'
            },
            styles: {
                tableSingleRow: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 5, 0, 15]
                },
                tableLastRow: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 0, 0, 0]
                },
                unorderedList: {
                    margin: [0, 0, 0, 15]
                },
                boldText: {
                    bold: true
                },
                smallFontSize: {
                    fontSize: 8
                },
                noBorderCellStyle: {
                    border: [false, false, false, false]
                },
                addressFontStyle: {
                    fontSize: 8,
                    bold: true,
                },
                addressFontStyleWithoutBold: {
                    fontSize: 8,
                },
                benefitIllustratorHeading: {
                    fontSize: 10,
                    bold: true,
                    margin: [0, 5, 0, 15],

                },
                smallestFontSize: {
                    fontSize: 6
                },
                theSmallestFontSizePossible: {
                    fontSize: 3
                },
                theMostSmallestFontSizeInTheWholeGoddamnWorld: {
                    fontSize: 2
                }
            }
        };

        saveBase64PDF(doc).then((base64String) => {
            // function openPDF(base64String) {
            var byteCharacters = atob(base64String);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], {
                type: 'application/pdf;base64'
            });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            // }
        });
    });
};

function returnMultipleRows(calculationJSONDataReceivedFromServer) {
    console.log("calculationJSONDataReceivedFromServer ", calculationJSONDataReceivedFromServer);
    // calculationJSONDataReceivedFromServer = calculationJSONDataReceivedFromServer.Table1;
    let row1 = [];
    row1.push(
        [{
            text: `${calculationJSONDataReceivedFromServer.PH_NAME}`, //calculationJSONDataReceivedFromServer.PH_NAME
            colSpan: 4,
            alignment: 'left',
            border: [false, false, false, false]
        }, {}, {}, {}, {
            text: `Customer ID : ${calculationJSONDataReceivedFromServer.PH_NO}`, //calculationJSONDataReceivedFromServer.PH_NO
            colSpan: 3,
            alignment: 'right',
            border: [false, false, false, false]
        }, {}, {}], [{
                text: 'Policy No.',
                alignment: 'center'
            },
            {
                text: 'Product Name',
                alignment: 'center'
            },
            {
                text: 'Sum Assured (Rs)',
                alignment: 'center'
            },
            {
                text: 'Mode',
                alignment: 'center'
            },
            {
                text: 'Premium Due Date',
                alignment: 'center'
            },
            {
                text: 'Premium Allocation Date',
                alignment: 'center'
            },
            {
                text: 'Premium Amt (Rs)',
                alignment: 'center'
            }

        ]
    );


    // for (let i = 0; i <= calculationJSONDataReceivedFromServer.GROSS_PREMIUM.length; i++) {
    let colDataArray = [];
    colDataArray.push({
        text: `${calculationJSONDataReceivedFromServer.POLICY_NUMBER}`,
        alignment: 'center'
    }, {
        text: `${calculationJSONDataReceivedFromServer.PRODUCT_NAME}`,
        alignment: 'center'
    }, {
        text: `${calculationJSONDataReceivedFromServer.SUM_ASSURED}`,
        alignment: 'right'
    }, {
        text: `${calculationJSONDataReceivedFromServer.FREQUENCY}`,
        alignment: 'center'
    }, {
        text: `${getDDMMFromMMDDFormat(getFormatedDateFromResponse(calculationJSONDataReceivedFromServer.DUE_DATE))}`,
        alignment: 'center'
    }, {
        text: `${getDDMMFromMMDDFormat(getFormatedDateFromResponse(calculationJSONDataReceivedFromServer.EFFECT_DATE))}`,
        alignment: 'center'
    }, {
        text: `${calculationJSONDataReceivedFromServer.GROSS_PREMIUM}`,
        alignment: 'right'
    }, );
    row1.push(colDataArray);
    //console.log(multipleRowArray);
    // }

    row1.push([{
        text: ``, //calculationJSONDataReceivedFromServer.PH_NAME
        colSpan: 6,
        alignment: 'left',
    }, {}, {}, {}, {}, {}, {
        text: `${totalPrem}`, //calculationJSONDataReceivedFromServer.PH_NO

        alignment: 'left',
    }, ])

    return row1;
}

function calculateTotalPrem(calculationJSONDataReceivedFromServer) {
    var dblTotalPrem = 0;
    var grossPrem = calculationJSONDataReceivedFromServer.GROSS_PREMIUM;
    for (var i = 0; i < grossPrem.length; i++) {
        dblTotalPrem += parseFloat(grossPrem[i]);
    }

    totalPrem = dblTotalPrem.toString();

    //						grossPrem =prsObj.parseXmlTag(result, "GROSS_PREMIUM");
    //						dueDate = prsObj.parseXmlTag(result, "DUE_DATE"); 

    critiPrem = calculationJSONDataReceivedFromServer.CI_PREMIUM;

    if (calculationJSONDataReceivedFromServer.PENSION_PROD === ("Y")) {
        pensionPrem = parseFloat(totalPrem) - parseFloat(critiPrem);
        otherPrem = "0.00";

    } else {
        pensionPrem = "0.00";
        otherPrem = parseFloat(totalPrem) - parseFloat(critiPrem);
    }

    createPDF(calculationJSONDataReceivedFromServer);
}

function sendEmail() {
    let custId = getCustomerId();
    callServiceHits('getPPC', custId, "").then((logService) => {

        let requestBody = `<?xml version="1.0" encoding="utf-8"?>
  
                           <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  
                                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  
                                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  
                            <soap:Body>
  
                                <getPPC_EasyAccess_mail xmlns="http://tempuri.org/">
  
                                    <strPolicyNumber>${getPolicyNumber()}</strPolicyNumber>
                                    <strFinYear>${getDate()}</strFinYear>
  
                                </getPPC_EasyAccess_mail>
  
                            </soap:Body>
  
                           </soap:Envelope>`;
        showLoader();
        ApiCallService('/getPPC_EasyAccess_mail', requestBody, '<getPPC_EasyAccess_mailResult>', '</getPPC_EasyAccess_mailResult>').then((data) => {
            hideLoader();
            var response = data.getPPC_EasyAccess_mailResult
            try {
                if (response == "") {
                    alert("Data is Not Available Please check Your Input.");
                } else if (response == "1") {
                    alert("PDF Sent Successfully to Your Registered Email-Id");
                }
            } catch (error) {
                hideLoader();
                alert("Data is Not Available Please check Your Input.");
            }


        });

    });

}
