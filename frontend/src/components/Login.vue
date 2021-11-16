<template>
  <div class="Log-in">
    <div class="login-box">
      <input
        @keyup.enter="userLogin"
        v-model="message_email"
        placeholder="Email"
      />
      <input
        @keyup.enter="userLogin"
        v-model="message_password"
        type="password"
        placeholder="Password"
      />
      <button type="submit" @click="userLogin()">Log in</button>
      <h3>{{ errormessage }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";


const URL_base = "/api/auth/login";
const message_email = ref("");
const message_password = ref("");
const errormessage = ref("");
const salt = ref("");

// function encryptPassword(password){        
//   salt.value = bcrypt.genSaltSync(10)
//   message_password.value = bcrypt.hashSync(password, salt)
// }

function userLogin() {
  if (!validateEmail()) {
    errormessage.value = "You must enter a valid Email";
    return;
  }
  if (message_password.value == "") {
    errormessage.value = "Enter a password";
    return;
  }

  var bodyFormData = new FormData();
  bodyFormData.append("email", message_email.value);
  bodyFormData.append("password", message_password.value);
  axios
    .post(URL_base, bodyFormData)
    .then(
      (Response: any) => {
        if (Response.data.twoFAenabled == false) {
          router.push({
            name: "twoFA", 
            params: { id: Response.data.id } });
        }
        else if (Response.data.twoFAenabled == true) {
          router.push({
            name: "verify2FA",
            params: { id: Response.data.id, email: Response.data.email},
          });
        }
      },
      (error: any) => {
        console.log(error.value);
      }
    )
    .catch((e) => {
      console.log(e);
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

input{
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button{
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  margin-left: 25%;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
