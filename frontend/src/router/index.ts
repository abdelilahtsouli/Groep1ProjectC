import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Bloedprikken from '../pages/Bloedprikken.vue'
import Login from '../pages/Login.vue'
import twoFASetup from '../pages/2FAsetup.vue'
import twoFAverify from '../pages/Verify2FA.vue'
import createNewUser from '../pages/CreateAccount.vue'
import Location from '../pages/Location.vue'
import Contact from '../pages/Contact.vue'
import Veelgesteldevragen from '../pages/FAQ.vue'
import Kids from "../pages/Kids.vue"

// These pages still need to be created.
// For now these placeholders are used!
import Urineonderzoek from '../pages/Urineonderzoek.vue'
import Openingstijden from '../pages/Location.vue'
import Routeplanner from '../pages/Location.vue'

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
        path: '/Kinderen',
        name: 'Kids',
        component: Kids
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
        path: '/Urineonderzoek',
        name: 'Urineonderzoek',
        component: Urineonderzoek
    },
    {
        path: '/Openingstijden',
        name: 'Openingstijden',
        component: Openingstijden
    },
    {
        path: '/Routeplanner',
        name: 'Routeplanner',
        component: Routeplanner
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
        path: '/Location',
        name: 'location',
        props: true,
        component: Location
    }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
