<template>
    <div class="2FA">
        <div class="2FA-Verify">
            <input  @keyup.enter="Verify" v-model="verify_Token" placeholder="6-digit code recieved in the Authenticator app">
            <button type="submit" @click="Verify()">Verify</button>
            <h5 v-if="verified">Succesvol ingelogd!</h5>
        </div>
    </div>
</template>



<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import {defineProps} from 'vue';
import speakeasy from '@levminer/speakeasy';
import { prop } from 'vue-class-component';
import { authenticator } from "otplib";
let temp_token = ''
const props = defineProps<{id : string, secret: string}>();
const verify_Token = ref('');
let verified = ref(false)
function verify2fa(){

    temp_token = speakeasy.totp({
        secret: props.secret,
        encoding: 'base32',

  });
}

function Verify(){
    if(temp_token == verify_Token.value){
        verified.value =  true;
    }
    else{
        verified.value = false
    }
}

onMounted(function() {
    setInterval(() => {verify2fa()}, 1000);
});

</script>

<style scoped>

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: "center";
}
.error {
  border: 1px solid red !important;
}
</style>
