import { EncryptStorage } from 'encrypt-storage';

const prefix = import.meta.env.VITE_APP_ENCRYPT_STORAGE_PREFIX || '@adoorei';
const secret =
  import.meta.env.VITE_APP_ENCRYPT_STORAGE_SECRET_KEY ||
  'a5878d92-975c-48cc-9398-b7ca579e01c5';

export const encryptStorage = new EncryptStorage(secret, {
  prefix,
});
