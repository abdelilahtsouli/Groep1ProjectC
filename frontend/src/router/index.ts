import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Bloedprikken from '../components/Bloedprikken.vue'
import Login from '../components/Login.vue'
import twoFASetup from '../components/2FAsetup.vue'
import twoFAverify from '../components/Verify2FA.vue'
import createNewUser from '../components/CreateAccount.vue'
import logout from '../components/logout.vue'
import Contact from '../components/Contact.vue'
import Veelgesteldevragen from '../components/FAQ.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/', redirect : '/Home'
    },
    {
        path: '/Home',
        name: 'Home',
        props: true,
        component: Home
    },   
    {
        path: '/Bloedprikken',
        name: 'Bloedprikken',
        props: true,
        component: Bloedprikken
    },
    {
        path: '/Veelgesteldevragen',
        name: 'Veelgesteldevragen',
        props: true,
        component: Veelgesteldevragen
    },
    {
        path: '/Contact',
        name: 'Contact',
        props: true,
        component: Contact
    },
    {
        path: '/login',
        name: 'Login',
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
    },
    {
        path: '/createNewUser',
        name: 'createNewUser',
        props: true,
        component: createNewUser
    },
    {
        path: '/logout/:page',
        name: 'logout',
        props: true,
        component: logout
    }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
