<template>
  <div>
  <div class="twoFA">
    <div class="twoFA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5><br>
      <img class="qr-img" :src="qrcode" />
      <h5>Of voer onderstaande code handmatig toe in de google authenticator app</h5><br>
      <div class="qrcode-manual">
        <h5 >{{qrcodeManual}}</h5>
      </div>
      <div>
        <br>
        <h5>Wanneer u de QR code heeft gescanned met de Google Authenticator app voer de 6 cijferige code hieronder in</h5>
        <input class="qr-input" v-model="verifyCode" placeholder="6-cijferige code uit de authenticator app">
        <button type="submit" @click="Verify()">Verify</button>
      </div>
    </div>
  </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref, defineProps } from "vue";
import axios from "axios";
import router from '../router'
import { VueCookieNext } from 'vue-cookie-next'
import bus from "../bus"

const props = defineProps<{ id: string, email: string, password: string}>();
const qrcodeManual = ref("");
const qrcode = ref("");
const verifyCode = ref('');
const isVerified = ref(false);
const errorMessage = ref('');

async function Verify(){
  let token = "";

  var bodyFormData = new FormData();
  bodyFormData.append("id", props.id);
  bodyFormData.append("token_input", verifyCode.value)
  await axios.post("/api/auth/2FAverify", bodyFormData).then((Response: any) =>
    {isVerified.value = Response.data.isCorrectPIN,
     token = Response.data.token,
     errorMessage.value = Response.data.error})

  if(isVerified.value){
    VueCookieNext.setCookie("token", decodeURI(token), {expire :"2h"});
    bus.emit("sessionModify", {
      "loggedIn": VueCookieNext.getCookie("token") != null,
      "superUser": VueCookieNext.getCookie("superUser") != null
    });
    router.push({
      name: "Home"
    })
  }
  
}

async function twoFactorAuthentication() {
  var bodyFormData = new FormData();
  bodyFormData.append("email", props.email);
  bodyFormData.append("id", props.id);
  bodyFormData.append("password", props.password)
  await axios
    .post("/api/auth/2FA", bodyFormData)
    .then((Response: any) => {
    qrcode.value = (Response.data.qrCodeImageUrl),
    qrcodeManual.value = (Response.data.qrCodeManual)
    })
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
  width: 70%;
  margin: 0 auto;
  margin-top: 30% !important;
  padding: 25px;
  background-color: var(--dark-blue);
  border-radius: 5px;
}
.qr-img{
  margin: auto;
  display: block;
  width: 100%;
  margin-bottom: 10px;

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
.qrcode-manual {
  width: 50% !important;
  color: red !important ;
}
</style>
