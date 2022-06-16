let protectionProducts = [];
let childProducts = [];
let wealthProducts = [];
let retirementProducts = [];

function createNeedAnalysisPDFMethod(NaOutPutData, formInputByUser) {

    return new Promise((resolve, reject) => {

        //Split Products
        //Child Traditional
        if (NaOutPutData.ProdLstChTrad !== '') {
            let splitProd = NaOutPutData.ProdLstChTrad.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                childProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        //Child ULIP
        if (NaOutPutData.ProdLstChUnit !== '') {
            let splitProd = NaOutPutData.ProdLstChUnit.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                childProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        //Protection Traditional
        if (NaOutPutData.ProdLstLifeProtTrad !== '') {
            let splitProd = NaOutPutData.ProdLstLifeProtTrad.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                protectionProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        if (NaOutPutData.ProdLstLifeProtUnit !== '') {
            let splitProd = NaOutPutData.ProdLstLifeProtUnit.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                protectionProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        //Retirement Traditional
        if (NaOutPutData.ProdLstRetTrad !== '') {
            let splitProd = NaOutPutData.ProdLstRetTrad.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                retirementProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        if (NaOutPutData.ProdLstRetUnit !== '') {
            let splitProd = NaOutPutData.ProdLstRetUnit.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                retirementProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        //Insurance Savings Traditional
        if (NaOutPutData.ProdLstWealthCreTrad !== '') {
            let splitProd = NaOutPutData.ProdLstWealthCreTrad.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                wealthProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }

        if (NaOutPutData.ProdLstWealthCreUnit !== '') {
            let splitProd = NaOutPutData.ProdLstWealthCreUnit.split('/');

            for (let loop = 0; loop < splitProd.length; loop++) {
                let products = splitProd[loop].split(';');

                wealthProducts.push({
                    'productCode': products[1],
                    'UIN': products[2],
                    'productName': products[0]
                });
            }
        }
        console.log('Inside Need Analysis PDF');

        var salutation;
        if (formInputByUser.Gender == "Male") {
            salutation = "Sir";
        } else if (formInputByUser.Gender == "Female") {
            salutation = "Madam";
        }
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let doc = {
            pageSize: 'A4',
            pageOrientation: 'potrait',
            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [10, 30, 10, 30],
            content: [{
                    image: `sbiLogo`,
                    width: 100
                }, {
                    canvas: [{
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 500,
                        y2: 5,
                        lineWidth: 1,
                        lineCap: 'round'
                    }]
                }, {
                    margin: [0, 15, 0, 0],
                    text: ['SBI Life Insurance Co. Ltd \n Corporate Office: Natraj, M.V. Road and Western Express, Highway Junction, Andheri(East),Mumbai 400069. Regn No. 111'],
                    alignment: 'center',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 0, 0, 0],
                    text: ['Website: www.sbilife.co.in | Email: info@sbilife.co.in | CIN: L99999MH2000PLC129113. Toll Free: 1800 267 9090 (Between 9.00 am & 9.00 pm)', {
                        text: '',
                        style: 'addressFontStyle',
                    }],
                    alignment: 'center',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    style: 'Need Analysis Summary',
                    table: {
                        widths: ['*', 'auto', '*'],
                        alignement: 'center',
                        body: [
                            [{
                                text: '',
                                border: [true, true, false, true]
                            }, {
                                text: 'Need Analysis Summary',
                                border: [false, true, false, true]
                            }, {
                                text: '',
                                border: [false, true, true, true]
                            }]
                        ]
                    },
                    layout: {
                        fillColor: '#CCCCCC'
                    }
                }, {
                    margin: [0, 15, 0, 0],
                    text: 'Dear ' + salutation + '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 15, 0, 0],
                    text: 'We thank you for providing your personal and financial information, such as : age, income, assets, liabilities, risk profile, future financial goals etc.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    //style : 'fontSize11',
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['*', '*', '*', '0.1%', '*', '*', '*'],
                        alignment: 'center',
                        body: getPersonalRowTableColumns(NaOutPutData, formInputByUser)
                    }
                }, {
                    //style : 'fontSize11',
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['*', '*', '0.1%', '*', '*', '0.1%', '*', '*', '*'],
                        alignment: 'center',
                        body: getFinancialRowTableColumns(NaOutPutData, formInputByUser)
                    }
                },
                //{
                //    //style : 'fontSize11',
                //    margin: [0, 10, 0, 0],
                //    table: {
                //        widths: ['*','*','*','*','*','*'],
                //        alignment: 'center',
                //        body: getChildRowTableColumns(NaOutPutData,formInputByUser)
                //    }
                //},
                getChildRowTableColumns(NaOutPutData, formInputByUser),
                {
                    margin: [0, 15, 0, 0],
                    text: 'We have made the analysis below of your current circumstances and your insurance and financial needs, based on the information recorded above. The products suggested for the various needs are also presented below.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: '# Inflation Rates are assumed & subjective in nature',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: '*The Monthly Investment Required is the absolute amount required and does not include the Mortality Charge, Service Tax & Other charges.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: 'We request you to review the above analysis and set your priorities of the needs that you would like to address now or in the near future and take a considered decision on the suggested insurance products that you would wish to buy from us. As per your analysis of your needs, you may also review the other insurance products offered by SBI Life.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: 'Note: This is an illustrative projection of your future insurance and financial needs. All figures are calculated as per SBI Lifes need analysis calculator and are based on the information provided by you, estimated cost of living and assumed inflation rate.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },

                {
                    margin: [0, 15, 0, 0],
                    text: 'I have gone through the financial analysis carefully and have chosen the following products from those recommended to me, based on my financial circumstances and priorities. The products have been explained to me in detail.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: 'I  - ' + formInputByUser.ProductSelected.productName + ' (' + formInputByUser.ProductSelected.UIN + ') - ' + formInputByUser.ProductSelected.planType, //Selected Product Name
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: 'I have voluntarily chosen products based on my insurance needs and financial objectives.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: 'I further confirm that I have not been compelled to purchase any of the above insurance products by the sales intermediary for availing any other financial product or facility that is offered by the bank.',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                },
                {
                    style: 'smallFontSize',
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', '0.1%', '*'],
                        alignment: 'center',
                        body: [
                            [{
                                text: '',
                                border: [false, false, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }, {
                                text: '',
                                border: [false, false, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }, {
                                text: self.getUserFname() + ' ' + self.getUserLName() + '/' + self.getUserCode(),
                                border: [false, false, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }],
                        ]
                    }
                }, {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    style: 'smallFontSize',
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', '0.5%', '*'],
                        alignment: 'center',
                        body: [
                            [{
                                text: 'Customer Name/Signature',
                                border: [false, true, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }, {
                                text: '',
                                border: [false, false, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }, {
                                text: 'Intermediarys Name/Code/Signature',
                                border: [false, true, false, false], // left,top,right,bottom
                                alignment: 'center',
                            }],
                        ]
                    }
                }, {
                    margin: [0, 15, 0, 0],
                    text: 'Date : ' + $.datepicker.formatDate("dd/mm/yy", new Date()),
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 15, 0, 0],
                    text: '',
                    alignment: 'justify',
                    style: 'addressFontStyle'
                }, {
                    margin: [0, 15, 0, 0],
                    text: 'Purchase of insurance product is voluntary. For more details on the products, risk factors, terms and conditions please read sales brochure carefully before concluding a sale. Trade logo displayed above belongs to State Bank of India and is used by SBI Life under license. Registered and Corporate Office: SBI Life Insurance Company Limited, Natraj, M.V.Road & Western Express Highway Junction, Andheri(East), Mumbai-400069. IRDAI Registration. No. 111. CIN: L99999MH2000PLC129113\\ Website: www.sbilife.co.in\\ Email id: info@sbilife.co.in \\ Toll free no - 1800-267-9090(Between 9:00 am to 9.00 pm)',
                    alignment: 'justify',
                    style: 'addressFontStyle'
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
                smallFontSizeBoldText: {
                    fontSize: 8,
                    bold: true
                },
                noBorderCellStyle: {
                    border: [false, false, false, false]
                },
                addressFontStyle: {
                    fontSize: 8,
                    bold: true,
                    alignment: 'right'
                },
                benefitIllustratorHeading: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 15]
                },
                smallestFontSize: {
                    fontSize: 6
                },
                theSmallestFontSizePossible: {
                    fontSize: 4
                }
            }
        };
        pdfMake.createPdf(doc).getBase64(function (encodedString) {
            resolve(encodedString);
        });
    });
}

function getPersonalRowTableColumns(NaOutPutData, formInputByUser) {
    let multipleRowArray = [];

    multipleRowArray.push([{
        style: 'smallFontSizeBoldText',
        text: "Personal Details",
        colSpan: 3,
        alignment: 'center',
        color: 'red'
    }, {}, {}, {
        text: '',
        alignment: 'center',
        colSpan: 1,
        border: [false, false, false, false]
    }, {
        style: 'smallFontSizeBoldText',
        text: "Financial Details",
        alignment: 'center',
        colSpan: 3,
        color: 'red'
    }, {}, {}], [{
        style: 'smallFontSize',
        text: `Gender \n ${formInputByUser.Gender}`,
        noWrap: false,
        alignment: 'center',
        border: [true, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `DOB \n ${formInputByUser.DOB}`,
        border: [false, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `Age \n ${formInputByUser.Age}`,
        border: [false, false, true, false] // left,top,right,bottom
    }, {
        text: '',
        noWrap: false,
        border: [false, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `Monthly Income \n Rs. ${formInputByUser.MonthlyIncome}`,
        noWrap: false,
        alignment: 'center',
        border: [true, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `Monthly Expenses \n Rs. ${formInputByUser.MonthlyExpense}`,
        border: [false, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `Outstanding Home Loan Amount \n Rs. ${formInputByUser.HomeLoan}`,
        border: [false, false, true, false] // left,top,right,bottom
    }], [{
        style: 'smallFontSize',
        text: `Martial Status \n ${formInputByUser.MartialStatus}`,
        noWrap: false,
        alignment: 'center',
        border: [true, false, false, true]
    }, {
        style: 'smallFontSize',
        text: `No. of minor Children \n ${formInputByUser.NumberOfChildren}`,
        border: [false, false, false, true]
    }, {
        style: 'smallFontSize',
        text: "",
        border: [false, false, true, true] // left,top,right,bottom
    }, {
        text: '',
        noWrap: false,
        border: [false, false, false, false]
    }, {
        style: 'smallFontSize',
        text: `Outstanding Loan Amount(Others) \n Rs. ${formInputByUser.MonthlyIncome}`,
        noWrap: false,
        alignment: 'center',
        border: [true, false, false, true]
    }, {
        style: 'smallFontSize',
        text: `Expected Inflation Rates# \n ${formInputByUser.Inflation}%`,
        border: [false, false, false, true]
    }, {
        style: 'smallFontSize',
        text: `Risk Appetite \n ${formInputByUser.RiskAppetite}`,
        border: [false, false, true, true] // left,top,right,bottom
    }])
    return multipleRowArray;
};

function getFinancialRowTableColumns(NaOutPutData, formInputByUser) {
    let multipleRowArray = [];
    multipleRowArray.push([{
            style: 'smallFontSizeBoldText',
            text: "Protection",
            color: 'red',
            colSpan: 2,
            alignment: 'center',
        }, {}, {
            text: '',
            alignment: 'center',
            colSpan: 1,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: "Retirement @ 60 Yrs",
            alignment: 'center',
            colSpan: 2,
            color: 'red',
        }, {}, {
            text: '',
            alignment: 'center',
            colSpan: 1,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: "Insurance with Savings",
            alignment: 'center',
            colSpan: 3,
            color: 'red',
        }, {}, {}], [{
            style: 'smallFontSize',
            text: '',
            border: [true, true, false, true]
        }, {
            style: 'smallFontSize',
            text: '',
            border: [false, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSize',
            text: '',
            border: [true, true, false, true]
        }, {
            style: 'smallFontSize',
            text: '',
            border: [false, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSize',
            text: '',
            noWrap: false,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Dream Home',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Other',
            border: [true, true, true, true] // left,top,right,bottom
        }], [{
                style: 'smallFontSizeBoldText',
                text: 'Total Protection Coverage Required',
                border: [true, true, true, true]
            },
            {
                style: 'smallFontSize',
                text: `Rs. ${NaOutPutData.LifeProtCorReq}`,
                alignment: 'center',
                border: [true, true, true, true]
            }, {
                text: '',
                noWrap: false,
                border: [false, false, false, false]
            }, {
                style: 'smallFontSizeBoldText',
                text: 'Total Corpus Required',
                border: [true, true, true, true]
            }, {
                style: 'smallFontSize',
                text: `Rs. ${NaOutPutData.RetCorReq}`,
                alignment: 'center',
                border: [true, true, true, true]
            }, {
                text: '',
                noWrap: false,
                border: [false, false, false, false]
            }, {
                style: 'smallFontSizeBoldText',
                text: 'Total Corpus Required',
                noWrap: false,
                border: [true, true, true, true]
            }, {
                style: 'smallFontSize',
                text: `Rs. ${NaOutPutData.homeCorReq}`,
                alignment: 'center',
                border: [true, true, true, true]
            }, {
                style: 'smallFontSize',
                text: `Rs. ${NaOutPutData.otheCorReq}`,
                alignment: 'center',
                border: [true, true, true, true] // left,top,right,bottom
            }
        ], [{
            style: 'smallFontSizeBoldText',
            text: 'Gap in Protection Coverage*',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.LifeProtGapAmt}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Gap Remaining',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.RetGap}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Gap Remaining',
            noWrap: false,
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.homeGap}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.otheGap}`,
            alignment: 'center',
            border: [true, true, true, true] // left,top,right,bottom
        }], [{
            style: 'smallFontSizeBoldText',
            text: 'Current Protection Coverage',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.LifeProtCurrCoverAmt}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Monthly Investment Required*',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.RetMonthInv}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Monthly Investment Required*',
            noWrap: false,
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.homeMonInvreq}`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `Rs. ${NaOutPutData.otheMonInvreq}`,
            alignment: 'center',
            border: [true, true, true, true] // left,top,right,bottom
        }], [{
            style: 'smallFontSize',
            text: '',
            border: [false, false, false, false]
        }, {
            style: 'smallFontSize',
            text: "",
            alignment: 'center',
            border: [false, false, false, false]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Year Left to Retire',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `${NaOutPutData.RetYrLeft} Years`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'No. of Years to realise',
            noWrap: false,
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `${formInputByUser.DreamHomeYears} Years`,
            alignment: 'center',
            border: [true, true, true, true]
        }, {
            style: 'smallFontSize',
            text: `${formInputByUser.OtherYears} Years`,
            alignment: 'center',
            border: [true, true, true, true] // left,top,right,bottom
        }], [{
            style: 'smallFontSizeBoldText',
            text: 'Suggested Product(s)',
            color: 'red',
            alignment: 'center',
            colSpan: 2,
        }, {}, {
            text: '',
            alignment: 'center',
            colSpan: 1,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Suggested Product(s)',
            color: 'red',
            alignment: 'center',
            colSpan: 2,
        }, {}, {
            text: '',
            noWrap: false,
            border: [false, false, false, false]
        }, {
            style: 'smallFontSizeBoldText',
            text: 'Suggested Product(s)',
            color: 'red',
            alignment: 'center',
            colSpan: 3,
        }, {}, {}],
        //Suggested Plan
        [{
                style: 'smallFontSize',
                margin: [0, 0, 0, 0],
                colSpan: 2,
                table: {
                    widths: ['*'],
                    alignment: 'left',
                    body: getSuggestedProducts(protectionProducts).length > 0 ? getSuggestedProducts(protectionProducts) : [{
                        text: ""
                    }],
                    border: [true, true, true, false]
                }
            }, {},
            {
                text: '',
                noWrap: false,
                border: [false, false, false, false]
            },
            {
                style: 'smallFontSize',
                margin: [0, 0, 0, 0],
                colSpan: 2,
                table: {
                    widths: ['*'],
                    alignment: 'left',
                    body: getSuggestedProducts(retirementProducts).length > 0 ? getSuggestedProducts(retirementProducts) : [{
                        text: ""
                    }],
                    border: [true, true, true, false]
                }
            }, {},
            {
                text: '',
                noWrap: false,
                border: [false, false, false, false]
            },
            {
                style: 'smallFontSize',
                margin: [0, 0, 0, 0],
                colSpan: 3,
                table: {
                    widths: ['*'],
                    alignment: 'left',
                    body: getSuggestedProducts(wealthProducts).length > 0 ? getSuggestedProducts(wealthProducts) : [{
                        text: ""
                    }],
                    border: [true, true, true, false]
                }
            }, {}, {}
        ])
    return multipleRowArray;
};

function getSuggestedProducts(productsArray) {
    let multipleRowArray = [];

    for (let loop = 0; loop < productsArray.length; loop++) {
        multipleRowArray.push([{
            border: [false, false, false, false],
            style: 'smallFontSize',
            text: productsArray[loop].productName + ' (' + productsArray[loop].UIN + ')',
            alignment: 'left',
        }])
    }

    return multipleRowArray;
}

function getSuggestedProductsProtection(productsArray) {
    let multipleRowArray = [];
    for (let loop = 0; loop < productsArray.length; loop++) {
        multipleRowArray.push([{
            border: [false, false, false, false],
            style: 'smallFontSize',
            text: productsArray[loop].productName + ' (' + productsArray[loop].UIN + ')',
            alignment: 'left',
        }])
    }
    return multipleRowArray;
}

function getSuggestedProductsInsurance(productsArray) {
    let multipleRowArray = [];
    for (let loop = 0; loop < productsArray.length; loop++) {
        multipleRowArray.push([{
            border: [false, false, false, false],
            style: 'smallFontSize',
            text: productsArray[loop].productName + ' (' + productsArray[loop].UIN + ')',
            alignment: 'left',
        }])
    }
    return multipleRowArray;
}

function getSuggestedProductsChild(productsArray) {
    let multipleRowArray = [];
    for (let loop = 0; loop < productsArray.length; loop++) {
        multipleRowArray.push([{
            border: [false, false, false, false],
            style: 'smallFontSize',
            text: productsArray[loop].productName + ' (' + productsArray[loop].UIN + ')',
            alignment: 'left',
        }])
    }
    return multipleRowArray;
}

function getChildRowTableColumns(NaOutPutData, formInputByUser) {
    let multipleRowArray = [];

    if (formInputByUser.NumberOfChildren > 0) {
        multipleRowArray.push({
            style: 'smallFontSize',
            margin: [0, 15, 0, 0],
            alignment: 'center',
            table: {
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [
                    [{
                        style: 'smallFontSizeBoldText',
                        color: 'red',
                        text: 'Child Future Planning',
                        colSpan: 6,
                        alignment: 'center',
                    }, {}, {}, {}, {}, {}],
                    [{
                        style: 'smallFontSize',
                        text: '',
                        alignment: 'center',
                        colSpan: 2
                    }, {}, {
                        style: 'smallFontSizeBoldText',
                        text: 'Age at Which money is required',
                        alignment: 'center',
                    }, {
                        style: 'smallFontSizeBoldText',
                        text: 'Total Corpus Required',
                        alignment: 'center',
                    }, {
                        style: 'smallFontSizeBoldText',
                        text: 'Gap Remaining',
                        alignment: 'center',
                    }, {
                        style: 'smallFontSizeBoldText',
                        text: 'Monthly Investment Required*',
                        alignment: 'center',
                    }],
                ]
            }
        })

        for (let loop = 1; loop <= formInputByUser.NumberOfChildren; loop++) {
            multipleRowArray.push({
                style: 'smallFontSize',
                margin: [0, 0, 0, 0],
                alignment: 'center',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [ //Education Child
                        [{
                            style: 'smallFontSize',
                            text: eval("formInputByUser.Child" + loop + "Name") + ' (' + eval("formInputByUser.Child" + loop + "Age") + ') yrs',
                            alignment: 'left',
                            rowSpan: 2
                        }, {
                            style: 'smallFontSize',
                            text: 'Education',
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: eval("formInputByUser.Child" + loop + "EduAge"),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chEduCorRe" + loop),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chEduGap" + loop),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chEduMonInvreq" + loop),
                            alignment: 'center'
                        }],
                        //Marriage Child
                        [{}, {
                            style: 'smallFontSize',
                            text: 'Marriage',
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: eval("formInputByUser.Child" + loop + "MarriageAge"),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chMarCorRe" + loop),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chMarGap" + loop),
                            alignment: 'center'
                        }, {
                            style: 'smallFontSize',
                            text: 'Rs. ' + eval("NaOutPutData.chMarMonInvreq" + loop),
                            alignment: 'center'
                        }]
                    ]
                }
            })
        }

        multipleRowArray.push({
            style: 'smallFontSize',
            margin: [0, 0, 0, 0],
            alignment: 'center',
            table: {
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [
                    [{
                        style: 'smallFontSizeBoldText',
                        color: 'red',
                        text: 'Suggested Products',
                        colSpan: 6,
                        alignment: 'center',
                    }, {}, {}, {}, {}, {}],
                    [{
                        style: 'smallFontSize',
                        margin: [0, 0, 0, 0],
                        colSpan: 6,
                        table: {
                            widths: ['*'],
                            alignment: 'left',
                            body: getSuggestedProducts(childProducts).length > 0 ? getSuggestedProducts(childProducts) : [{
                                text: ""
                            }],
                            border: [true, true, true, false]
                        }
                    }, {}, {}, {}, {}, {}]
                ]
            }
        })
    }

    return multipleRowArray;
}