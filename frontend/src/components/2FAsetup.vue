<template>
  <div class="2FA">
    <div class="2FA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5>
      <img :src="QR_Code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { defineProps } from "vue";

let QR_Code = ref("");
const response = ref("");
const props = defineProps<{ id: string }>();

async function twoFactorAuthentication() {
  var secret = speakeasy.generateSecret({
    name: "Star-shl",
  });
  var bodyFormData = new FormData();
  bodyFormData.append("secretKey", secret.ascii);
  bodyFormData.append("id", props.id);
  await axios
    .post("/api/auth/2FA", bodyFormData)
    .then((Response: any) => (response.value = Response)),
    (error: any) => console.log(error);

  qrcode.toDataURL(secret.otpauth_url, function (err: any, data: any) {
    QR_Code.value = data;
  });
}
onMounted(async function () {
  twoFactorAuthentication();
});
</script>

<style>
</style>