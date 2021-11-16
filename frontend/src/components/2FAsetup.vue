<template>
  <div class="2FA">
    <div class="2FA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5>
      <img :src="QR_Code" />
      <div>
        <button type="submit" @click="router.push
        ({name: 'verify2FA', params: {id: props.id}})">Verify</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";
import router from "../router";

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

</style>
