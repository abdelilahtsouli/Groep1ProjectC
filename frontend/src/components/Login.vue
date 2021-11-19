<template>
  <div>
    <div class="Log-in">
      <div class="login-box">
        <h3 class="h3-text">E-mail adres</h3>
        <input
          @keyup.enter="userLogin"
          v-model="message_email"
          placeholder="Email"
        /><br />
        <h3 class="h3-text">Wachtwoord</h3>
        <input
          @keyup.enter="userLogin"
          v-model="message_password"
          type="password"
          placeholder="Password"
        /><br />
        <br /><button type="submit" @click="userLogin()">Log in</button>
        <h3 class="h3-error">{{ errormessage }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";

// Jamey
import {defineEmits, onMounted} from "vue";
const emit = defineEmits(["switchPage"]);
onMounted(() => emit("switchPage", "admin"))
//

const URL_base = "/api/auth/login";
const message_email = ref("");
const message_password = ref("");
const errormessage = ref("");

function userLogin() {
  if (!validateEmail()) {
    errormessage.value = "Voer een geldig e-mail adres in";
    return;
  }
  if (message_password.value == "") {
    errormessage.value = "Enter a password";
    return;
  }

  var bodyFormData = new FormData();
  bodyFormData.append("email", message_email.value);
  bodyFormData.append("password", message_password.value);
  axios.post(URL_base, bodyFormData).then((Response: any) => {
    errormessage.value = Response.data.message;
    console.log(Response.data);
    if (Response.data.twoFAenabled == false) {
      router.push({
        name: "twoFA",
        params: { id: Response.data.id },
      });
    } else if (Response.data.twoFAenabled == true) {
      router.push({
        name: "verify2FA",
        params: { id: Response.data.id, email: Response.data.email },
      });
    }
  });
}

function validateEmail() {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(message_email.value).toLowerCase());
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h3-error {
  margin-top: 10px;
  color: var(--light-red);
  font-size: 0.8em;
}


.login-box input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
}
.Log-in {

  width: 50%;
  margin: 0 auto;
  margin-top: 50%;
  padding: 30px;
  background-color: var(--dark-blue);
  border-radius: 5px;
}
.login-box {
  width: 100%;
  margin: 0 auto;
  background-color: var(--dark-blue);
}
.login-box button {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-align: center;
  border: 1px solid;
  background-color: var(--light-red);
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
}

.h3-text {
  color: white;
  font-size: 0.8em;
  margin: 0;
}
</style>
