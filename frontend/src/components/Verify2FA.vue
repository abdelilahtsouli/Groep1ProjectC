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
import { prop } from 'vue-class-component';
import axios from "axios";
let temp_token = ''
const props = defineProps<{id : string}>();
const verify_Token = ref('');
let verified = ref(false)

function Verify(){
    var bodyFormData = new FormData();
    bodyFormData.append("id", props.id);
    bodyFormData.append("token_input", verify_Token.value)
    axios.post("/api/auth/2FAverify", bodyFormData).then((Response: any) => verified.value = Response.data.isCorrectPIN)
    console.log(verified.value)
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
