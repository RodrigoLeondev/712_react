export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export const HONEYPOT_FIELD = 'botcheck';

export const HCAPTCHA_FIELD = 'h-captcha-response';

export const RECAPTCHA_COMPAT_FIELD = 'g-recaptcha-response';

export const HCAPTCHA_SCRIPT = 'https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=off';

export const HCAPTCHA_SITEKEY =
  import.meta.env.VITE_HCAPTCHA_SITEKEY ?? '50b2fe65-b00b-4b9e-ad62-3ba471098be2';
