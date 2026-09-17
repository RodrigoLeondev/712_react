export interface HCaptchaRenderParams {
  sitekey: string;
  theme?: 'light' | 'dark';
}

export interface HCaptchaApi {
  render: (container: HTMLElement, params: HCaptchaRenderParams) => string;
  reset: (widgetId?: string) => void;
}

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi;
  }
}
