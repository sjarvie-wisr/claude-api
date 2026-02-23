import type { Param, StatusEntry } from './rate-estimate';

export const APP_PUT_PARAMS: Param[] = [
  { field: 'LoanRequirementsAndObjectives', type: 'string', required: 'required', notes: 'Responsible lending requirement' },
  { field: 'offerId', type: 'string', required: 'required', notes: 'The indicative quote ID (3, 5 or 7yr term) from the rate estimate' },
  { field: 'financialDetails', type: 'object', required: 'required', notes: 'Expenses, liabilities, assets' },
  { field: 'SignificantPlannedChanges', type: 'object', required: 'required', notes: 'Any anticipated changes impacting repayment capacity' },
  { field: 'directDebitBankAccount', type: 'object', required: 'optional', notes: 'Bank account for loan repayments' },
  { field: 'useESignatureContract', type: 'boolean', required: 'optional', notes: 'Defaults to true (eSign). Set false for PDF contracts sent to broker.' },
];

export const APP_GET_STATUSES: StatusEntry[] = [
  {
    dot: 'success',
    name: 'Approved',
    description: 'Loan approved and contract sent (eSign or PDF per your setting).',
  },
  {
    dot: 'info',
    name: 'PreSubmitServicingFailed',
    description: '(v3+) Customer does not meet servicing requirements prior to submission.',
  },
  {
    dot: 'warn',
    name: 'Pending / InReview',
    description: 'Assessment in progress — continue polling.',
  },
  {
    dot: 'error',
    name: 'Declined',
    description: 'Application did not meet credit policy.',
  },
];
