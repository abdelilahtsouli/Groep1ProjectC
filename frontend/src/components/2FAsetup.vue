<template>
  <div class="2FA">
    <div class="2FA-QR">
      <h5>Scan de onderstaande code met de google Authenticator</h5>
      <img :src="QR_Code" />
      <div>
        <button type="submit" @click="router.push
        ({name: 'verify2FA', params: {id: props.id, secret: temp_secret}})">Verify</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import speakeasy from "@levminer/speakeasy";
import QRcode from "qrcode";
import { defineProps } from "vue";
import router from "../router";

let QR_Code = ref("");
const response = ref("");
const props = defineProps<{ id: string }>();
var temp_secret = ref('');

async function twoFactorAuthentication() {
  var secret = speakeasy.generateSecret({
    name: "Star-shl",
  });

  temp_secret.value = secret.base32
  var bodyFormData = new FormData();
  bodyFormData.append("secretKey", secret.base32);
  bodyFormData.append("id", props.id);

  await axios
    .post("/api/auth/2FA", bodyFormData)
    .then((Response: any) => (response.value = Response)),
    (error: any) => console.log(error);
  const url = speakeasy.otpauthURL({secret: secret.base32, label: `wouter@star-shl.nl` , encoding: 'base32'});
  QRcode.toDataURL(url, function (err: any, data: any) {
    QR_Code.value = data;
  });
}
onMounted(async function () {
  twoFactorAuthentication();
});
</script>

<style>

</style>
