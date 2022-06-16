let METHOD_NAME_UPLOAD_FILE = "UploadFile_SMRT";
var docExtension;
var doc_base64;

function addDocInputChangeListener() {
    document.getElementById('browseFile').addEventListener('change', (e) => {
        age_file = e.target.files[0];
        getFileExtension(e.target.files[0].name).then(function (fileExtension) {
                docExtension = fileExtension;
                if (fileExtension == 'jpeg' || fileExtension == 'png' || fileExtension == 'jpg') {
                    compressionEvent(e.target.files[0]).then(data => {
                        console.log("got data ", data);

                        doc_base64 = data;
                    });
                } else {
                    getBase64(e.target.files[0]).then(data => {
                        console.log("got data ", data);
                        doc_base64 = data;
                    });
                }
            })
            .catch(function (error) {
                alert(error);
            });
    });
}

function validatePostInsuranceForm() {
    if (postInsuranceForm.checkValidity()) {
        uploadDoc(doc_base64, docExtension);
    }
}

async function uploadDoc(byteArray, fileExtension) {
    createFileName(getPostInsuranceProposalNo(), 0, fileExtension).then(function (fileName) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + '?op=' + METHOD_NAME_UPLOAD_FILE, true);

        var sr =
            `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
            <soap12:Body>
            <UploadFile_SMRT xmlns="http://tempuri.org/">
            <f>${byteArray}</f>
            <fileName>${fileName}</fileName>
            <qNo></qNo>
            <agentCode>990134795</agentCode>
            <strEmailId>a@g.com</strEmailId>
            <strMobileNo>0000000000</strMobileNo>
            <strAuthKey>${userAuth}</strAuthKey>
            </UploadFile_SMRT>
            </soap12:Body>
            </soap12:Envelope>`;
        self.showLoader();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                self.hideLoader();
                if (xmlhttp.status == 200) {

                    data = unescapeHTML(xmlhttp.responseText);
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(data, "text/xml");
                    } else {
                        xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(text);
                    }

                    var response = xmlDoc.getElementsByTagName("UploadFile_SMRTResult")[0].textContent;
                    if (response == "1") {

                        alert("Upload Successful")
                    } else {
                        alert("Please try again later");
                    }

                }
            }
        }
        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //send the SOAP request
        xmlhttp.send(sr);

    }).catch(function (err) {
        alert(err);
        hideLoader();
    });
}

function getPostInsuranceProposalNo() {
    return document.forms["postInsuranceForm"]["postInsuranceProposalNo"].value;
}
