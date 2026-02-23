export interface Param {
  field: string;
  type: string;
  required: 'required' | 'conditional' | 'optional';
  notes: string;
}

export interface StatusEntry {
  dot: 'success' | 'info' | 'warn' | 'error';
  name: string;
  description: string;
}

export const RE_POST_PARAMS: Param[] = [
  { field: 'loanAmount', type: 'number', required: 'required', notes: 'Amount to borrow' },
  { field: 'loanPurpose', type: 'string', required: 'required', notes: 'e.g. "holiday", "car", "consolidation"' },
  { field: 'requestSecuredRate', type: 'boolean', required: 'optional', notes: 'Defaults to true when loanPurpose is "car"' },
  { field: 'rateDiscount', type: 'number', required: 'conditional', notes: 'Broker only — up to 2.00% for eligible brokers on secured loans' },
  { field: 'brokerFee', type: 'number', required: 'conditional', notes: 'Broker only — custom fee; cannot exceed the default fee' },
  { field: 'applicants', type: 'array', required: 'required', notes: 'One applicant only at this stage' },
  { field: 'declarations', type: 'object', required: 'required', notes: 'All four consents must be true' },
];

export const RE_GET_STATUSES: StatusEntry[] = [
  {
    dot: 'success',
    name: 'RateEstimateSuccessful',
    description: 'Rate estimate generated. allowApplication: true — you can proceed to submit an application.',
  },
  {
    dot: 'info',
    name: 'RateEstimatePending',
    description: 'Still processing — keep polling every 500ms.',
  },
  {
    dot: 'warn',
    name: 'RateEstimateReduced',
    description: 'Customer eligible for a lower amount than requested. The estimate reflects the maximum eligible amount.',
  },
  {
    dot: 'error',
    name: 'RateEstimateDeclined',
    description: 'Does not meet credit policy. Stop polling.',
  },
  {
    dot: 'error',
    name: 'RateEstimateNoRecord',
    description: 'Equifax file not found. Try with additional identity documents or previous addresses.',
  },
  {
    dot: 'error',
    name: 'RateEstimateExpired',
    description: 'Estimate is older than 30 days. Request a new one.',
  },
  {
    dot: 'error',
    name: 'RateEstimateAccountSuspended',
    description: 'Broker account suspended. Contact BDM.',
  },
];

// Code samples for quickstart / rate estimate
export const QS_CURL = `<span class="hl-comment"># Quickstart – POST Rate Estimate (Sandbox)</span>
curl -X POST https://apis.sandbox.wisr.tech/apply/v3/application/rateEstimate \\
  -H <span class="hl-str">"subscription-key: YOUR_API_KEY"</span> \\
  -H <span class="hl-str">"partner-company-id: YOUR_COMPANY_ID"</span> \\
  -H <span class="hl-str">"Content-Type: application/json"</span> \\
  -d <span class="hl-str">'{
    "loanAmount": 10000.00,
    "loanPurpose": "holiday",
    "applicants": [{
      "firstName": "Test", "lastName": "Lot",
      "doB": "01/01/1999",
      "householdDetails": { "maritalStatus": "single" },
      "totalIncomeBeforeTax": 99999,
      "employments": [{ "employmentStatus": "full-time", "startDate": "06/2010" }],
      "addresses": [{
        "streetNumber": "55", "streetName": "Harrington",
        "streetType": "street", "suburb": "The Rocks",
        "state": "nsw", "postcode": "2000",
        "isPrimary": true, "startDate": "01/2016", "residencyStatus": "renter"
      }],
      "contact": { "mobile": "0400000000", "email": "test@example.com" }
    }],
    "declarations": {
      "accessSeekerCreditReportConsent": true,
      "electronicCommunicationConsent": true,
      "meetsEligibility": true,
      "privacyConsent": true
    }
  }'</span>`;

export const QS_PYTHON = `<span class="hl-comment"># Quickstart – POST Rate Estimate (Sandbox)</span>
<span class="hl-key">import</span> requests

url = <span class="hl-str">"https://apis.sandbox.wisr.tech/apply/v3/application/rateEstimate"</span>
headers = {
    <span class="hl-str">"subscription-key"</span>: <span class="hl-str">"YOUR_API_KEY"</span>,
    <span class="hl-str">"partner-company-id"</span>: <span class="hl-str">"YOUR_COMPANY_ID"</span>,
    <span class="hl-str">"Content-Type"</span>: <span class="hl-str">"application/json"</span>
}
payload = {
    <span class="hl-str">"loanAmount"</span>: <span class="hl-num">10000.00</span>,
    <span class="hl-str">"loanPurpose"</span>: <span class="hl-str">"holiday"</span>,
    <span class="hl-str">"applicants"</span>: [{
        <span class="hl-str">"firstName"</span>: <span class="hl-str">"Test"</span>, <span class="hl-str">"lastName"</span>: <span class="hl-str">"Lot"</span>,
        <span class="hl-str">"doB"</span>: <span class="hl-str">"01/01/1999"</span>,
        <span class="hl-str">"totalIncomeBeforeTax"</span>: <span class="hl-num">99999</span>,
        <span class="hl-str">"householdDetails"</span>: {<span class="hl-str">"maritalStatus"</span>: <span class="hl-str">"single"</span>},
        <span class="hl-str">"employments"</span>: [{<span class="hl-str">"employmentStatus"</span>: <span class="hl-str">"full-time"</span>, <span class="hl-str">"startDate"</span>: <span class="hl-str">"06/2010"</span>}],
        <span class="hl-str">"addresses"</span>: [{<span class="hl-str">"streetNumber"</span>: <span class="hl-str">"55"</span>, <span class="hl-str">"streetName"</span>: <span class="hl-str">"Harrington"</span>,
            <span class="hl-str">"streetType"</span>: <span class="hl-str">"street"</span>, <span class="hl-str">"suburb"</span>: <span class="hl-str">"The Rocks"</span>,
            <span class="hl-str">"state"</span>: <span class="hl-str">"nsw"</span>, <span class="hl-str">"postcode"</span>: <span class="hl-str">"2000"</span>,
            <span class="hl-str">"isPrimary"</span>: <span class="hl-bool">True</span>, <span class="hl-str">"startDate"</span>: <span class="hl-str">"01/2016"</span>,
            <span class="hl-str">"residencyStatus"</span>: <span class="hl-str">"renter"</span>}],
        <span class="hl-str">"contact"</span>: {<span class="hl-str">"mobile"</span>: <span class="hl-str">"0400000000"</span>, <span class="hl-str">"email"</span>: <span class="hl-str">"test@example.com"</span>}
    }],
    <span class="hl-str">"declarations"</span>: {
        <span class="hl-str">"accessSeekerCreditReportConsent"</span>: <span class="hl-bool">True</span>,
        <span class="hl-str">"electronicCommunicationConsent"</span>: <span class="hl-bool">True</span>,
        <span class="hl-str">"meetsEligibility"</span>: <span class="hl-bool">True</span>,
        <span class="hl-str">"privacyConsent"</span>: <span class="hl-bool">True</span>
    }
}
r = requests.post(url, json=payload, headers=headers)
<span class="hl-key">print</span>(r.json())  <span class="hl-comment"># { "wisrApplicationId": "..." }</span>`;

export const QS_JS = `<span class="hl-comment">// Quickstart – POST Rate Estimate (Sandbox)</span>
<span class="hl-key">const</span> res = <span class="hl-key">await</span> fetch(
  <span class="hl-str">"https://apis.sandbox.wisr.tech/apply/v3/application/rateEstimate"</span>,
  {
    method: <span class="hl-str">"POST"</span>,
    headers: {
      <span class="hl-str">"subscription-key"</span>: <span class="hl-str">"YOUR_API_KEY"</span>,
      <span class="hl-str">"partner-company-id"</span>: <span class="hl-str">"YOUR_COMPANY_ID"</span>,
      <span class="hl-str">"Content-Type"</span>: <span class="hl-str">"application/json"</span>,
    },
    body: JSON.stringify({
      loanAmount: <span class="hl-num">10000</span>,
      loanPurpose: <span class="hl-str">"holiday"</span>,
      applicants: [{ firstName: <span class="hl-str">"Test"</span>, lastName: <span class="hl-str">"Lot"</span>, ... }],
      declarations: { meetsEligibility: <span class="hl-bool">true</span>, privacyConsent: <span class="hl-bool">true</span>,
        accessSeekerCreditReportConsent: <span class="hl-bool">true</span>, electronicCommunicationConsent: <span class="hl-bool">true</span> }
    })
  }
);
<span class="hl-key">const</span> { wisrApplicationId } = <span class="hl-key">await</span> res.json();
console.log(wisrApplicationId); <span class="hl-comment">// Use this to poll status</span>`;

export const RE_RESPONSE_JSON = `{
  <span class="hl-key">"wisrApplicationId"</span>: <span class="hl-str">"1d5f30ee-d16b-427b-8749-d491de859064"</span>
}`;
