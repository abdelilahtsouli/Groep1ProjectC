import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Bloedprikken from '../components/Bloedprikken.vue'
import Login from '../components/Login.vue'
import twoFASetup from '../components/2FAsetup.vue'
import twoFAverify from '../components/Verify2FA.vue'
import createNewUser from '../components/CreateAccount.vue'
import Page from '../components/Page.vue'
import PageEditor from '../components/PageEditor.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', redirect : '/page/1'
    },
    {
        path: '/editor/:content',
        name: 'Editor',
        props: true,
        component: PageEditor
    },
    {
        path: '/page/:id',
        name: 'Page',
        props: true,
        component: Page
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
    }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router