export const API_VERSION = 'v3';

export const BASE_URLS = {
  sandbox: process.env.NEXT_PUBLIC_API_BASE_SANDBOX ?? 'https://apis.sandbox.wisr.tech',
  production: process.env.NEXT_PUBLIC_API_BASE_PROD ?? 'https://apis.wisr.tech',
};

export const SWAGGER_URLS = {
  sandbox: 'https://apis-docs.sandbox.wisr.tech/index.html',
  production: 'https://apis-docs.wisr.tech/index.html',
};

export const SWAGGER_SPEC_URL =
  process.env.NEXT_PUBLIC_SWAGGER_URL ??
  'https://apis-docs.sandbox.wisr.tech/openapi.json';

export const SUPPORT_EMAIL = 'apisupport@wisr.com.au';
