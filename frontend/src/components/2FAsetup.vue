<template>
  <div>

  <div class="twoFA">
    <div class="twoFA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5><br>
      <img class="qr-img" :src="QR_Code" />
      <div>
        <br><br>
        <button type="submit" @click="router.push
        ({name: 'verify2FA', params: {id: props.id}})">Verify</button>
      </div>
    </div>
  </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";
import router from "../router";
import Header from './Header.vue'
let QR_Code = ref("");

const props = defineProps<{ id: string, email: string}>();


async function twoFactorAuthentication() {

  var bodyFormData = new FormData();
  bodyFormData.append("email", props.email);
  bodyFormData.append("id", props.id);
  await axios
    .post("/api/auth/2FA", bodyFormData)
    .then((Response: any) => QR_Code.value = (Response.data.qrCodeImageUrl)),
    (error: any) => console.log(error);
  
}
onMounted(async function () {
  twoFactorAuthentication();
});
</script>

<style>
.twoFA-QR{
  width: 100%;
  margin: 0 auto;
  background-color: #142d49;
}
.twoFA{
  width: 50%;
  margin: 0 auto;
  margin-top: 50% !important;
  padding: 30px;
  background-color: #142d49;
  border-radius: 5px;
}
.qr-img{
  margin: auto;
  display: block;

}
button{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-align: center;
  border: 1px solid;
  color: white;
  background-color: #FF5858;
  border: 1px solid #142d49;
  box-sizing: border-box;
  border-radius: 5px;
}
h5{
  color: white;
  font-size: 0.8em;
  margin: 0;
  margin-bottom: 10px;
}
</style>
