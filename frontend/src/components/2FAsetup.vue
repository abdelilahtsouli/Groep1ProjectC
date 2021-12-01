<template>
  <div>
  <div class="twoFA">
    <div class="twoFA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5><br>
      <img class="qr-img" :src="QR_Code" />
      <div>
        <br><br>
        <h5>Wanneer u de QR code heeft gescanned met de Google Authenticator app voer de 6 cijferige code hieronder in</h5>
        <input class="qr-input" v-model="verify_Token" placeholder="6-cijferige code uit de authenticator app">
        <button type="submit" @click="Verify()">Verify</button>
      </div>
    </div>
  </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";
import router from '../router'
import { VueCookieNext } from 'vue-cookie-next'

let QR_Code = ref("");
const props = defineProps<{ id: string, email: string}>();
const verify_Token = ref('');
let verified = ref(false)
let token = ref('');
const errormessage = ref('');

async function Verify(){
  var bodyFormData = new FormData();
  bodyFormData.append("id", props.id);
  bodyFormData.append("token_input", verify_Token.value)
  await axios.post("/api/auth/2FAverify", bodyFormData).then((Response: any) => {verified.value = Response.data.isCorrectPIN, token.value = Response.data.token,errormessage.value = Response.data.error})

  if(verified.value){
    VueCookieNext.setCookie("token", decodeURI(token.value), {expire :"2h"});
    router.push({
      name: "Home"
    })
  }
  
}

async function twoFactorAuthentication() {
  var bodyFormData = new FormData();
  bodyFormData.append("email", props.email);
  bodyFormData.append("id", props.id);
  await axios
    .post("/api/auth/2FA", bodyFormData)
    .then((Response: any) => QR_Code.value = (Response.data.qrCodeImageUrl))
}

onMounted(async function () {
  twoFactorAuthentication();
});

</script>

<style>
.qr-input{  
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;}

.twoFA-QR{
  width: 100%;
  margin: 0 auto;
  background-color: var(--dark-blue);
}
.twoFA{
  width: 50%;
  margin: 0 auto;
  margin-top: 30% !important;
  padding: 30px;
  background-color: var(--dark-blue);
  border-radius: 5px;
}
.qr-img{
  margin: auto;
  display: block;

}
.twoFA-QR button{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-align: center;
  border: 1px solid;
  color: white;
  background-color: var(--light-red);
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
}
.twoFA-QR h5{
  color: white;
  font-size: 0.8em;
  margin: 0;
  margin-bottom: 10px;
}
</style>
