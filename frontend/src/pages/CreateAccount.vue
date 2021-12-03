<template>
    <div>
    <div class="Home">
        <div class="Home-Page">
            <div class="createAccountForm">
                <h3 class="h3-text">Naam</h3>
                <input
                v-model="Name"
                placeholder="Naam"
                />
                <h3 class="h3-text">E-mail adres</h3>
                <input
                v-model="Email"
                placeholder="Email"
                />
                <h3 class="h3-text">superUser</h3>
                <select v-model="superUser" class="dropdown">
                  <option value="false" disabled selected hidden></option>
                  <option @click="superUser = 'true'">true</option>
                  <option @click="superUser = 'false'">false</option>
                </select>
                <h3 class="h3-text">Wachtwoord</h3>
                <input
                v-model="password"
                placeholder="Wachtwoord"
                type="password"
                />
                <h3 class="h3-text">Herhaal wachtwoord</h3>
                <input
                v-model="Password_check"
                placeholder="Wachtwoord"
                type="password"
                /><br><br>
                <button @click="sendToServer">Create account</button>
                <br><h5>{{Error_message}}</h5>
            </div>
        </div>
    </div>
    </div>


</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

// Jamey
import {defineEmits, onMounted} from "vue";
import router from "../router";
const emit = defineEmits(["switchPage"]);
onMounted(() => emit("switchPage", "settings"))
//
const id = ref('');
const Name = ref('');
const Email = ref('');
const superUser = ref('');
const password = ref('');
const Password_check = ref('');
const Error_message = ref('');
const Created = ref(false);

function passwordCheck(){
    if(password.value != Password_check.value){
        Error_message.value = "De ingevoerde wachtwoorden komen niet overeen"
        return false
    }
    else{
      return true
    }
}
function nameCheck(){
  if(Name.value != ''){
    return true
  }
  else{
    Error_message.value = "U heeft geen naam ingevuld"
    return false
  }
}
function isSuperUser(){
  if (superUser.value == ''){
    superUser.value = 'false'
    return true
  }
  return true
}

function validateEmail() {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(!re.test(String(Email.value).toLowerCase())){
       Error_message.value = "Het ingevoerde email adress is niet geldig"
       return false
   }
   else{
     return true
   }
}

async function sendToServer(){
    if(nameCheck() && passwordCheck() && validateEmail() && isSuperUser()){
      var bodyFormData = new FormData();
      bodyFormData.append("Name", Name.value);
      bodyFormData.append("Email", Email.value);
      bodyFormData.append("Superuser",superUser.value);
      bodyFormData.append("Password", password.value);
      await axios.post('/api/auth/createNewUser', bodyFormData)
          .then((Response: any) => (Created.value = Response.data.userCreated) &&  (id.value = Response.data.id))
      if(Created.value){
          router.push({
          name: "twoFA", params: {email: Email.value, id: id.value}
        })
      }
    }
}


</script>

<style scoped>
.createAccountForm h3{
  color: #ffffff;
  font-size: 0.8em;
  margin: 0;
}
.createAccountForm h5{
  margin-top: 10px;
  color: var(--light-red);
}
.Home{
  width: 50%;
  margin: 0 auto;
  margin-top: 30% !important;
  padding: 30px;
  background-color: var(--dark-blue);
  border-radius: 5px;
}
.Home-page{
  width: 100%;
  margin: 0 auto;
  background-color: var(--dark-blue)v;
}
.createAccountForm input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
}
.dropdown{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
}
.createAccountForm button{
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


</style>