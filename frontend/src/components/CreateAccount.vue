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
                <button @click="validateEmail(); passwordCheck(); sendToServer();">Create account</button>
                <h5>{{Error_message}}</h5>
            </div>
        </div>
    </div>
    </div>


</template>



<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const Name = ref('');
const Email = ref('');
const password = ref('');
const Password_check = ref('');
const Error_message = ref('');
const Created = ref(false);

function passwordCheck(){
    if(password.value != Password_check.value){
        Error_message.value = "De ingevoerde wachtwoorden komen niet overeen"
    }
}

function validateEmail() {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(!re.test(String(Email.value).toLowerCase())){
       Error_message.value = "Het ingevoerde email adress is niet geldig"
   }
}

async function sendToServer(){
    var bodyFormData = new FormData();
    bodyFormData.append("Name", Name.value);
    bodyFormData.append("Email", Email.value);
    bodyFormData.append("Password", password.value);
    await axios.post('/api/auth/createNewUser', bodyFormData)
        .then((Response: any) => Created.value = Response.data.userCreated)
    console.log(Created.value);
}


</script>

<style scoped>
h3{
  color: #ffffff;
  font-size: 0.8em;
  margin: 0;
}
.Home{
  width: 50%;
  margin: 0 auto;
  margin-top: 50% !important;
  padding: 30px;
  background-color: #142d49;
  border-radius: 5px;
}
.Home-page{
  width: 100%;
  margin: 0 auto;
  background-color: #142d49;
}
input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #142d49;
  box-sizing: border-box;
  border-radius: 5px;
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
  background-color: #FF5858;
  border: 1px solid #142d49;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
}

</style>