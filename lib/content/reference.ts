export interface ErrorRow {
  code: string;
  meaning: string;
  cause: string;
  isLink?: boolean;
}

export interface ValidationRule {
  field: string;
  rule: string;
}

export const ERRORS_TABLE: ErrorRow[] = [
  { code: '400 Bad Request', meaning: 'Validation error', cause: 'Missing/invalid partner IDs, malformed request body' },
  { code: '401 Unauthorized', meaning: 'Auth failed', cause: 'Invalid or missing subscription-key' },
  { code: '202 Accepted', meaning: 'Success', cause: 'Request received and valid' },
  { code: '429 Too Many Requests', meaning: 'Rate limited', cause: 'Polling too frequently — back off and retry' },
  { code: '5xx Server Error', meaning: 'Wisr-side error', cause: 'Contact apisupport@wisr.com.au', isLink: true },
];

export const VALIDATION_RULES: ValidationRule[] = [
  { field: 'doB', rule: 'Format: DD/MM/YYYY' },
  { field: 'startDate / endDate', rule: 'Format: MM/YYYY' },
  { field: 'addresses', rule: 'Previous address required if current address < 36 months. Time calculated inclusively.' },
  { field: 'employments', rule: 'Previous employment required if current employment < 6 months.' },
  { field: 'driverLicence.cardNumber', rule: 'Required for all Australian states (mandatory since v2, Sept 2022)' },
  { field: 'investmentProperty', rule: 'Required on all rate estimate requests (mandatory since v3, June 2025)' },
  { field: 'rateDiscount', rule: 'Max 2.00% for eligible brokers on secured loans only' },
  { field: 'securedAssetDetails.yearOfManufacture', rule: 'Assets 13+ years old at loan start cannot be secured — defaults to unsecured' },
  { field: 'loanPurpose: "consolidation"', rule: 'Must include ≥1 creditCard or personalLoan with isForConsolidation: true' },
  { field: 'saleType: "refinance"', rule: 'Must include exactly 1 personalLoan with isForConsolidation: true' },
];

export const LEGAL_TERMS = [
  'Wisr grants a non-exclusive, revocable, non-transferable licence to use the API solely for the Release Purpose.',
  'You must keep your API Key secure and must not share it with third parties.',
  'You may not sub-license, sell, or distribute API data or use it to build a competing product.',
  'All API requests must be over HTTPS. You are responsible for securing the Customer System.',
  'Wisr may update the API at its discretion. You must adopt updates within a reasonable time at your own cost.',
  "Wisr's total liability under this agreement is capped at AUD $100.",
  'Either party may terminate with 7 days written notice. Wisr may terminate immediately for breach.',
  'The agreement is governed by the laws of New South Wales, Australia.',
];
