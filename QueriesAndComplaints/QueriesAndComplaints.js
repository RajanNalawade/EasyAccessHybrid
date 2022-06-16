/* *********************** GETTERS ************************* */
var user_id = "8655356870";
var methodName = "/getSubComplaintCategory";
var startTag = "<getSubComplaintCategoryResult>";
var endTag = "</getSubComplaintCategoryResult>";

var methodName1 = "/getComplaintCategory";
var startTag1 = "<getComplaintCategoryResult>";
var endTag1 = "</getComplaintCategoryResult>";

var number = /^[0-9]+$/;
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


window.onload = function () {
    // build SOAP request

    // dv_polcyNo_Query.style.display = "none";
    onQueryClick();
    var requestBody1 = '<?xml version="1.0" encoding="utf-8"?> ' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        '<soap:Body>' +
        '<getComplaintCategory xmlns="http://tempuri.org/">' +
        '<user_id>' + user_id + '</user_id> ' +
        '</getComplaintCategory>' +
        '</soap:Body>' +
        '</soap:Envelope>';
    showLoader();
    ApiCallService(methodName1, requestBody1, startTag1, endTag1).then((resp) => {
        hideLoader();
        let subCatData = resp.getComplaintCategoryResult.CustDls.Table;

        for (let subCat = 0; subCat < subCatData.length; subCat++) {
            let subCatID = subCatData[subCat].CATEG_ID;
            let subCatDesc = subCatData[subCat].CATEG_DESC;

            let el = document.createElement('option');
            el.textContent = subCatDesc;
            el.value = subCatID;
            document.getElementById('Queries').appendChild(el);
        }

        let CATEG_ID = '2';

        var requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soap:Body>' +
            '<getSubComplaintCategory xmlns="http://tempuri.org/">' +
            '<user_id>' + user_id + '</user_id> ' +
            '<categoryId>' + CATEG_ID + '</categoryId>' +
            '</getSubComplaintCategory>' +
            '</soap:Body>' +
            '</soap:Envelope>';

        showLoader()
        ApiCallService(methodName, requestBody, startTag, endTag).then((resp) => {
            hideLoader();
            let subCatData = resp.getSubComplaintCategoryResult.CustDls.Table;
            document.getElementById('selectSubCat').options.length = 0;
            for (let subCat = 0; subCat < subCatData.length; subCat++) {
                let subCatID = subCatData[subCat].SUB_CATEG_ID;
                let subCatDesc = subCatData[subCat].SUB_CATEG_DESC;
                document.getElementById('selectSubCat').add(new Option(subCatDesc, subCatID));
            }
        });
    });
}

function subCatChange() {
    if (document.getElementById('Queries').value == "2") {
        var CATEG_ID = "2"
        console.log(CATEG_ID);

        var requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soap:Body>' +
            '<getSubComplaintCategory xmlns="http://tempuri.org/">' +
            '<user_id>' + user_id + '</user_id> ' +
            '<categoryId>' + CATEG_ID + '</categoryId>' +
            '</getSubComplaintCategory>' +
            '</soap:Body>' +
            '</soap:Envelope>';

        showLoader();
        ApiCallService(methodName, requestBody, startTag, endTag).then((resp) => {
            hideLoader();
            let subCatData = resp.getSubComplaintCategoryResult.CustDls.Table;
            document.getElementById('selectSubCat').options.length = 0;
            for (let subCat = 0; subCat < subCatData.length; subCat++) {
                let subCatID = subCatData[subCat].SUB_CATEG_ID;
                let subCatDesc = subCatData[subCat].SUB_CATEG_DESC;

                document.getElementById('selectSubCat').add(new Option(subCatDesc, subCatID));
            }
        });



    } else if (document.getElementById('Queries').value == "11") {
        var CATEG_ID = "11"
        console.log(CATEG_ID);
        var requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soap:Body>' +
            '<getSubComplaintCategory xmlns="http://tempuri.org/">' +
            '<user_id>' + user_id + '</user_id> ' +
            '<categoryId>' + CATEG_ID + '</categoryId>' +
            '</getSubComplaintCategory>' +
            '</soap:Body>' +
            '</soap:Envelope>';

        showLoader();
        ApiCallService(methodName, requestBody, startTag, endTag).then((resp) => {
            hideLoader();
            let subCatData = resp.getSubComplaintCategoryResult.CustDls.Table;
            document.getElementById('selectSubCat').options.length = 0;
            for (let subCat = 0; subCat < subCatData.length; subCat++) {
                let subCatID = subCatData[subCat].SUB_CATEG_ID;
                let subCatDesc = subCatData[subCat].SUB_CATEG_DESC;

                document.getElementById('selectSubCat').add(new Option(subCatDesc, subCatID));
            }
        });




    }

};


function onQueryClick() {
    document.getElementById("dv_polcyNo_Query").style.display = "none";
    document.getElementById("dv_RaiseQuery").style.display = "block";
}

function onQueryStatusClick() {
    document.getElementById("dv_polcyNo_Query").style.display = "block";
    document.getElementById("dv_RaiseQuery").style.display = "none";
}

function getUserPolcyNo() {
    return document.forms['QueriesComp']['txt_polcyNo'].value;
}

function getUserEmail() {
    return document.forms['QueriesComp']['txt_Email'].value;
}

function getUserMobNo() {
    return document.forms['QueriesComp']['txt_mobNo'].value;
}

function getDesc() {
    return document.forms['QueriesComp']['txt_Description'].value;
}

function getProposalNo() {
    return document.forms['QueriesComp']['txt_polcyNo_Query'].value;
}

function validateQueryComp() {
    console.log(getUserPolcyNo(), getUserEmail(), getUserMobNo())
    if (getUserPolcyNo() !== undefined && getUserPolcyNo() !== null && getUserPolcyNo() !== "") {
        if (!filter.test(getUserEmail())) {
            alert('Please provide a valid email address');
        } else {
            if (!getUserMobNo().match(number)) {
                alert("Kindly Enter Numeric Value for Mobile Number")
            }
        }


        onQueryStatus();

        //             var cat_ID = document.getElementById('Queries').value;
        //             console.log(cat_ID);
        //             var SUB_CATEG_ID = document.getElementById('selectSubCat').value;
        //             console.log(SUB_CATEG_ID);
        //            
        //             var methodName="/saveComplaDtls";
        //             var startTag = "<saveComplaDtlsResult>";
        //             var endTag = "</saveComplaDtlsResult>";
        //    
        //             var  requestSaveComplaDtlsBody1 = '<?xml version="1.0" encoding="utf-8"?> ' +
        //             '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        //             'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        //             'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        //             '<soap:Body>' +
        //             '<saveComplaDtls  xmlns="http://tempuri.org/">' +
        //             '<categ_id>' + cat_ID + '</categ_id> ' +
        //             '<sub_categ_id>' + SUB_CATEG_ID + '</sub_categ_id> ' +
        //             '<pl_pol_num>' + getUserPolcyNo() + '</pl_pol_num> ' +
        //             '<user_id>' + user_id + '</user_id> ' +
        //             '<pr_person_id>' + user_id + '</pr_person_id> ' +
        //             '<desc>' + getDesc() + '</desc> ' +
        //             '</saveComplaDtls >' +
        //             '</soap:Body>' +
        //             '</soap:Envelope>';
        //            
        //            ApiCallService(methodName,requestSaveComplaDtlsBody1,startTag,endTag).then((resp) => {});


    } else {
        alert("Kindly Enter Numeric Value for Policy Number")
    }
}


function onQueryStatus() {
    var cat_ID = document.getElementById('Queries').value;
    console.log(cat_ID);
    var SUB_CATEG_ID = document.getElementById('selectSubCat').value;
    console.log(SUB_CATEG_ID);

    var methodName = "/saveComplaDtls";
    var startTag = "<saveComplaDtlsResult>";
    var endTag = "</saveComplaDtlsResult>";

    var requestSaveComplaDtlsBody1 = '<?xml version="1.0" encoding="utf-8"?> ' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        '<soap:Body>' +
        '<saveComplaDtls  xmlns="http://tempuri.org/">' +
        '<categ_id>' + cat_ID + '</categ_id> ' +
        '<sub_categ_id>' + SUB_CATEG_ID + '</sub_categ_id> ' +
        '<pl_pol_num>' + getUserPolcyNo() + '</pl_pol_num> ' +
        '<user_id>123</user_id> ' +
        '<pr_person_id>0</pr_person_id> ' +
        '<desc>' + getDesc() + '</desc> ' +
        '</saveComplaDtls >' +
        '</soap:Body>' +
        '</soap:Envelope>';
    showLoader();
    ApiCallService(methodName, requestSaveComplaDtlsBody1, startTag, endTag).then((response) => {
        hideLoader();
        // console.log("resp ",resp);
        if (response !== undefined || response !== null) {
            if (response.saveComplaDtlsResult.ComplaintDt !== undefined) {
                response = response.saveComplaDtlsResult.ComplaintDt;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table1;
                    if (response.ErrCode == "0") {
                        saveEasyAccessServiceHits();
                    } else {
                        showPopUP("Send Feedback Failed..Try again..");
                    }
                }

            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }

    });
}


function onQueryStatusServcClick() {
    console.log(getProposalNo());
    var methodName = "/GetConnectServiceDetails ";
    var startTag = "<GetConnectServiceDetailsResult>";
    var endTag = "</GetConnectServiceDetailsResult>";


    var requestSaveComplaDtlsBody1 = '<?xml version="1.0" encoding="utf-8"?> ' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        '<soap:Body>' +
        '<GetConnectServiceDetails xmlns="http://tempuri.org/">' +
        '<strProposalNo>' + getProposalNo() + '</strProposalNo> ' +
        '</GetConnectServiceDetails >' +
        '</soap:Body>' +
        '</soap:Envelope>';
    showLoader();
    ApiCallService(methodName, requestSaveComplaDtlsBody1, startTag, endTag).then((resp) => {
        hideLoader();
    });


};


function saveEasyAccessServiceHits() {
    callServiceHits('saveComplaDtls', '', 'saveComplaDtls')
        .then((resolve) => {
            showPopUP("Your complaint has been forwarded to our Customer Service Department .We shall revert to you at the earliest.");
        }).catch((reject) => {
            console.log(reject);
        });
}

function showPopUP(message) {
    document.getElementById('messageTextId').innerHTML = message;
    $("#myModal1").modal("show");
}
