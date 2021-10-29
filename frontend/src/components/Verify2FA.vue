<template>
    <div class="2FA">
        <div class="2FA-Verify">
            <input v-model="verify_Token" placeholder="6-digit code recieved in the Authenticator app">
            <button type="submit" @click="Verify()">Verify</button>
            <h5 v-if="verified == true">Succesvol ingelogd!</h5>
        </div>
    </div>
</template>



<script lang="ts" setup>

import { ref } from 'vue';
import {defineProps} from 'vue';
import speakeasy from 'speakeasy';

const props = defineProps<{id : string, secret: string}>();
const verify_Token = ref('');

function Verify(){
    console.log(props.secret)
    console.log(verify_Token.value)
    var verified = speakeasy.totp.verify({
        secret: props.secret,
        token: verify_Token.value
    })
    console.log(verified)
}

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
