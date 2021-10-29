<template>
    <div class="2FA">
        <div style="display: flex; flex-direction: row;" class="2FA-Verify">
            <v-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
                />
        </div>
    </div>
</template>



<script lang="ts" setup>



</script>

<style scoped>

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: "center";
}
.error {
  border: 1px solid red !important;
}
</style>
