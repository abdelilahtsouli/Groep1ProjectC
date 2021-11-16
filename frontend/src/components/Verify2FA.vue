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

import { ref } from 'vue';
import {defineProps} from 'vue';
import { VueCookieNext } from 'vue-cookie-next'
import axios from "axios";
import router from '../router';

const props = defineProps<{id : string}>();
const verify_Token = ref('');
let verified = ref(false)
let token = ref('');



async function Verify(){
    var bodyFormData = new FormData();
    bodyFormData.append("id", props.id);
    bodyFormData.append("token_input", verify_Token.value)
    await axios.post("/api/auth/2FAverify", bodyFormData).then((Response: any) => {verified.value = Response.data.isCorrectPIN, token.value = Response.data.token})
    if(verified.value){
      VueCookieNext.setCookie("token", decodeURI(token.value), {expire :"2h"});
      router.push({
        name: "Home", 
        params: {cookie: token.value }})
    }

    
}


</script>

<style scoped>
input{
  width: 50%;
  height: 40px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button{
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
