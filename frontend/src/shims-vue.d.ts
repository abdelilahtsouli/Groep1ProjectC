/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.speakeasy'{
  import type {speakeasy} from 'speakeasy'
}
declare module '*.qrcode'{
  import type {qrcode} from 'qrcode'
}
declare module '*./router';
declare module '@bachdgvn/vue-otp-input'{
  import type OtpInput from '@bachdgvn/vue-otp-input'
}
