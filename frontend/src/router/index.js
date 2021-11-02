import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
const Login = () => import('../components/Login.vue')
const twoFASetup = () => import('../components/2FAsetup.vue')
const twoFAverify = () => import('../components/Verify2FA.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        props: true,
        component: Login

    },  
    {
        path: '/twoFASetup',
        name: 'twoFA',
        props: true,
        component: twoFASetup
    },
    {
        path: '/Verify2FA',
        name: 'verify2FA',
        props: true,
        component: twoFAverify
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router