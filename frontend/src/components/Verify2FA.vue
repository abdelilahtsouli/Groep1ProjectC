<template>
      <div class="twoFA">
          <div class="twoVerify">
              <h3 class="h3-text">Twee staps verificatie code</h3>
              <input @keyup.enter="Verify" v-model="verify_Token" placeholder="6-cijferige code uit de authenticator app">
              <br><br><button type="submit" @click="Verify()">Verify</button>
              <h3 class="h3-error">{{errormessage}}</h3>
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


</script>

<style scoped>
.h3-error{
  color: var(--light-red);
  font-size: 0.8em;

}

.twoVerify input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
}
.twoVerify{
  width: 100%;
  margin: 0 auto;
  background-color: var(--dark-blue);
}
.twoFA{
  width: 50%;
  margin-top: 50%;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--dark-blue);
  border-radius: 5px;
}
.twoVerify button{
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
  color: white;
  box-sizing: border-box;
  border-radius: 5px;
}

.h3-text{
  color: white;
  font-size: 0.8em;
  margin: 0;
}
</style>
