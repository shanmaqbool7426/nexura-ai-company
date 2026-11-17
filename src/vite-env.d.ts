/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PAYMENT_LINK: string;
  readonly VITE_STRIPE_PORTAL_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
