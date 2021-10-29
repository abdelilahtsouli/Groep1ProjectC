<template>
  <div class="2FA">
      <div class="2FA-QR">
          <h1>{{twoFactorAuthentication()}}</h1>
          <img :src='QR_Code'>
      </div>
  </div>
</template>

<script lang="ts" setup>


import { ref } from 'vue';
import axios from 'axios';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

let QR_Code = ref('');



async function twoFactorAuthentication(){
  var secret = speakeasy.generateSecret({
    name: "Star-shl"
  })
  // var bodyFormData = new FormData();
  // bodyFormData.append('secret_key', secret);
  // await axios.post('/api/auth/twoFA',bodyFormData)

  qrcode.toDataURL(secret.otpauth_url, function(err: any,data: any){
    QR_Code.value = data
  })
}

</script>

<style>

</style>