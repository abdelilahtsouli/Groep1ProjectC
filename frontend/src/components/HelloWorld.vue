<template>
  <div class="Log-in">
    <div class="login-box">
      <input @keyup.enter="userLogin" v-model="message_email" placeholder="Email">
      <input @keyup.enter="userLogin" v-model="message_password"  type="password" placeholder="Password">
      <button type="submit" @click="userLogin()">Log in</button>
      <h3 v-if="response.data == ''">{{errormessage}}</h3>
      <h3>{{response.data}}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import axios from 'axios';

const URL_base = '/api/auth/login'
const message_email = ref('');
const message_password = ref('');
const errormessage = ref('');
let response = ref('');

function userLogin(){
  errormessage.value = ''
  if(!validateEmail() ){
    errormessage.value = "You must enter a valid Email";
    return
  }

  if(message_password.value == ""){
    errormessage.value = "You must enter a valid password"
    return
  }
  
  var bodyFormData = new FormData();
  bodyFormData.append('email', message_email.value);
  bodyFormData.append('password', message_password.value);
  axios.post(URL_base, bodyFormData).then((Response: any) => response.value = Response, (error: any) => {console.log(error)});
  console.log(response.value);
}


function validateEmail() {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(message_email.value).toLowerCase());
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
