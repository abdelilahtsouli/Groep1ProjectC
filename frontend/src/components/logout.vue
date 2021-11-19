<template>
    <div></div>
</template>

<script lang="ts" setup>

import router from '../router'
import { VueCookieNext } from 'vue-cookie-next'
import { defineProps } from "vue";
VueCookieNext.removeCookie("token");
const props = defineProps<{page: any}>();
router.push({path: props.page })





</script>

<style scoped>

</style>