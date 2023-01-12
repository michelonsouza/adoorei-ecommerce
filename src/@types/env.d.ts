/// <reference types="vite/client" />

type EnvType = 'development' | 'staging' | 'production' | 'test';
type BooleanType = 'true' | 'false';

interface ImportMetaEnv {
  readonly VITE_APP_ENCRYPT_STORAGE_PREFIX: string;
  readonly VITE_APP_ENCRYPT_STORAGE_SECRET_KEY: string;
  readonly VITE_APP_NODE_ENV: EnvType;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
