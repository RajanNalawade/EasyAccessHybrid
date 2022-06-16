let minAge_HomeLoan = 18;
let minAge_PersonalLoan = 18;
let minAge_VehicleLoan = 18;
let minAge_EducationLoan = 16;
let minAge_PersonalLoan_HomeLoanEquity = 18;
let maxAge_HomeLoan = 67;
let maxAge_PersonalLoan = 65;
let maxAge_VehicleLoan = 65;
let maxAge_EducationLoan = 65;
let maxAge_PersonalLoan_HomeLoanEquity = 67;
let serviceTaxJkResident = 0.126;
let SBCServiceTaxJkResident = 0.00;
let KKCServiceTaxJkResident = 0.00;
let serviceTax = 0.14;
let SBCServiceTax = 0.005;
let KKCServiceTax = 0.005;
let staffOrNonStaffList = [{
    value: 0,
    title: "Staff",
    returnValue: true,
  },
  {
    value: 1,
    title: "Non-Staff",
    returnValue: false
  }
];

let sourcedByList = [{
    value: 0,
    title: 'Branch'
  },
  {
    value: 1,
    title: 'HLST or MPST'
  },
  {
    value: 2,
    title: 'HLC'
  }
];

let loanTypeList = [{
    value: 0,
    title: "Home Loan",
    showLoanSubcategory: false,
    showCoBorrowerOption: true,
    numberOfCoBorrowersAllowed: 3,
    showPremiumPayingTerm: true,
    subCategoryList: [{
      value: -1,
      subCategoryTitle: ""
    }]
  },
  {
    value: 1,
    title: "Personal Loan",
    showLoanSubcategory: true,
    showCoBorrowerOption: true,
    numberOfCoBorrowersAllowed: 3,
    showPremiumPayingTerm: true,
    subCategoryList: [{
        value: 0,
        subCategoryTitle: "Personal Loan"
      },
      {
        value: 1,
        subCategoryTitle: "Mortgage Loan"
      },
      {
        value: 2,
        subCategoryTitle: "Home Loan Equity"
      }
    ]
  },
  {
    value: 2,
    title: "Vehicle Loan",
    showLoanSubcategory: false,
    showCoBorrowerOption: true,
    numberOfCoBorrowersAllowed: 2,
    showPremiumPayingTerm: true,
    subCategoryList: [{
      value: -1,
      subCategoryTitle: ""
    }]
  },
  {
    value: 3,
    title: "Education Loan",
    showLoanSubcategory: false,
    showCoBorrowerOption: false,
    numberOfCoBorrowersAllowed: 1,
    showPremiumPayingTerm: true,
    subCategoryList: [{
      value: -1,
      subCategoryTitle: ""
    }]
  }
];

let staffInterestRateRange = [{
    //Staff Home Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 6.00% to 8.00%",
        coverInterestRate: 8.00
      },
      {
        value: 1,
        interestRateString: "Between 8.50% to 11.50%",
        coverInterestRate: 11.50

      }
    ]
  },
  {
    //Staff Personal Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 7.00% to 10.00%",
        coverInterestRate: 10.00
      },
      {
        value: 1,
        interestRateString: "Between 14.00% to 16.99%",
        coverInterestRate: 17.00
      },
      {
        value: 2,
        interestRateString: "Between 17.00% to 20.00%",
        coverInterestRate: 20.00
      }
    ]
  },
  {
    //Staff Vehicle Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 7% to 10%(New Auto Loan)",
        coverInterestRate: 10.00
      },
      {
        value: 1,
        interestRateString: "Between 7% to 10%(Used Auto Loan)",
        coverInterestRate: 10.00
      },
      {
        value: 2,
        interestRateString: "Between 7% to 10%(Two Wheelers Loan)",
        coverInterestRate: 10.00
      },
      {
        value: 3,
        interestRateString: "Between 10.25% to 14%(New Auto Loan)",
        coverInterestRate: 14.00
      },
      {
        value: 4,
        interestRateString: "Between 15% to 18%(Used Auto Loan)",
        coverInterestRate: 18.00
      },
      {
        value: 5,
        interestRateString: "Between 15% to 18%(Two Wheelers Loan)",
        coverInterestRate: 18.00
      }
    ]
  },
  {
    //Staff Education Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 7.00% to 10.00%",
        coverInterestRate: 10.00
      },
      {
        value: 1,
        interestRateString: "Between 12.00% to 15.00%",
        coverInterestRate: 15.00
      }
    ]
  }
];


let nonStaffInterestRateRange = [{
    //Non-Staff Home Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 08.00% to 08.49%",
        coverInterestRate: 8.49
      },
      {
        value: 1,
        interestRateString: "Between 8.50% to 11.50%",
        coverInterestRate: 11.50

      },
      {
        value: 2,
        interestRateString: "Between 11.50% to 12.75%",
        coverInterestRate: 12.75
      }
    ]
  },
  {
    //Non-Staff Personal Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateSybRange: [{
            value: 0,
            interestRateString: "Between 7.75% to 10.75%",
            coverInterestRate: 10.75

          },
          {
            value: 1,
            interestRateString: "Between 10.76% to 13.75%",
            coverInterestRate: 13.75

          },
          {
            value: 2,
            interestRateString: "Between 13.76% to 16.99%",
            coverInterestRate: 16.99

          },
          {
            value: 3,
            interestRateString: "Between 17.00% to 20.00%",
            coverInterestRate: 20.00

          }
        ]

      },
      {
        value: 1,
        interestRateSybRange: [{
            value: 0,
            interestRateString: "Between 14.00% to 16.99%",
            coverInterestRate: 17.00

          },
          {
            value: 1,
            interestRateString: "Between 17.00% to 20.00%",
            coverInterestRate: 20.00

          }
        ]
      },
      {
        value: 2,
        interestRateSybRange: [{
            value: 0,
            interestRateString: "Between 10.00% to 12.99%",
            coverInterestRate: 13.00

          },
          {
            value: 1,
            interestRateString: "Between 13.00% to 16.00%",
            coverInterestRate: 16.00

          }
        ]
      }
    ]
  },
  {
    //Non-Staff Vehicle Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 10.25% to 14%(New Auto Loan)",
        coverInterestRate: 14.00
      },
      {
        value: 1,
        interestRateString: "Between 15% to 18%(Used Auto Loan)",
        coverInterestRate: 18.00
      },
      {
        value: 2,
        interestRateString: "Between 15% to 18%(Two Wheelers Loan)",
        coverInterestRate: 18.00
      },
      {
        value: 3,
        interestRateString: "Between 10.25% to 14%(Combo Vehicle Loan)",
        coverInterestRate: 14.00
      },
      {
        value: 4,
        interestRateString: "Between 8.50% to 10.24%(New Auto Loan)",
        coverInterestRate: 10.24
      }
    ]
  },
  {
    //Non-Staff Education Loan Interest Range
    interestRateRange: [{
        value: 0,
        interestRateString: "Between 09.00% to 11.50%",
        coverInterestRate: 11.50
      },
      {
        value: 1,
        interestRateString: "Between 11.51% to 15.00%",
        coverInterestRate: 15.00
      }
    ]
  }
];


let moratoriumBooleanList = [{
    wantMoratorium: false,
    toShowUser: "No"
  },
  {
    wantMoratorium: true,
    toShowUser: "Yes"
  }
];

let minMoratoriumEducationLoan = 3;
let maxMoratoriumEducationLoan = 72;

let minMoratoriumHomeLoan_Staff = 3;
let maxMoratoriumHomeLoan_Staff = 36;

let minMoratoriumHomeLoan_NonStaff = 3;
let maxMoratoriumHomeLoan_NonStaff = 48;


let interestPaymentList = [{
    value: 0,
    title: "No"
  },
  {
    value: 1,
    title: "Yes"
  }
];

let coBorrowerOptionsList = [{
    value: 0,
    coBorrowerList: [{
        value: 0,
        title: 'Only Primary Borrower',
        showEachBorrowerCovered: false

      },
      {
        value: 1,
        title: '2 Co-Borrowers',
        showEachBorrowerCovered: true

      },
      {
        value: 2,
        title: '3 Co-Borrowers',
        showEachBorrowerCovered: true

      }
    ]
  },
  {
    value: 1,
    coBorrowerList: [{
        value: 0,
        title: 'Only Primary Borrower',
        showEachBorrowerCovered: false

      },
      {
        value: 1,
        title: '2 Co-Borrowers',
        showEachBorrowerCovered: false

      },
      {
        value: 2,
        title: '3 Co-Borrowers',
        showEachBorrowerCovered: false

      }
    ]
  },
  {
    value: 2,
    coBorrowerList: [{
        value: 0,
        title: 'Only Primary Borrower',
        showEachBorrowerCovered: false

      },
      {
        value: 1,
        title: '2 Co-Borrowers',
        showEachBorrowerCovered: false

      }
    ]
  },
  {
    value: 3,
    coBorrowerList: [{
      value: -1,
      title: "",
      showEachBorrowerCovered: false
    }]
  }
];

let eachBorrowerCoveredList = [{
    value: 0,
    title: "1"
  },
  {
    value: 1,
    title: "2"
  }
];

let premiumPaidByList = [{
    value: 0,
    title: "Bank"
  },
  {
    value: 1,
    title: "Self Paid"
  }
];

let premiumFrequencyModeList = [{
    value: 0,
    title: 'Single'
  },
  {
    value: 1,
    title: 'Yearly'
  }
];