/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_NAME?: string;
  readonly VITE_DEV_APP?: 'main' | 'template';
}
