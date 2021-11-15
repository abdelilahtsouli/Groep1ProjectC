<template>
    <div class="Home">
        <div class="Home-Page">
            <div class="createAccountForm">
                <input
                v-model="Name"
                placeholder="Naam"
                />
                <input
                v-model="Email"
                placeholder="Email"
                />
                <input
                v-model="password"
                placeholder="Wachtwoord"
                type="password"
                />
                <input
                v-model="Password_check"
                placeholder="Wachtwoord"
                type="password"
                />
                <button @click="validateEmail(); passwordCheck(); sendToServer();">Create account</button>
                <h5>{{Error_message}}</h5>
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



</style>