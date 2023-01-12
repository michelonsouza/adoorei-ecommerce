import { EncryptStorage, AsyncEncryptStorage } from 'encrypt-storage';

declare global {
  export interface Window {
    encryptStorage?: EncryptStorage;
    EncryptStorage?: EncryptStorage;
    AsyncEncryptStorage?: AsyncEncryptStorage;
  }
}
