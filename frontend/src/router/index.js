import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
const Login = () => import('../components/Login.vue')
const twoFASetup = () => import('../components/2FAsetup.vue')
const twoFAverify = () => import('../components/Verify2FA.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Login
    },  
    {
        path: '/twoFASetup',
        name: 'twoFA',
        component: twoFASetup
    },
    {
        path: '/twoFAverify',
        name: 'verify',
        component: twoFAverify
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router