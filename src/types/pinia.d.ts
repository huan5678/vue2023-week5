import 'pinia';

// 擴展 Pinia Store 類型定義
declare module 'pinia' {
  export interface PiniaCustomProperties {
    showMessage: (message: string) => void;
  }
}
