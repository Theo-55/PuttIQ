<template>
  <ion-page class="container">
    <ion-content>
      <ion-card>
        <ion-card-header class="lgnHeader">
          <ion-card-title class="font-bold lgnTitle">Login</ion-card-title>
        </ion-card-header>
        <ion-card-content class="lgnInput">
          <ion-item>
            <ion-label position="floating" style="font-weight: 700"
              >Email</ion-label
            >
            <ion-input
              v-model="email"
              type="email"
              style="margin-top: 20px"
              required
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating" style="font-weight: 700"
              >Password</ion-label
            >
            <ion-input
              v-model="password"
              style="margin-top: 20px"
              type="password"
              required
            ></ion-input>
          </ion-item>
          <ion-button expand="block" @click="login" style="margin-top: 12px"
            >Login</ion-button
          >
          <div class="register-section">
            <ion-buttons>
              <span>New to the App?</span>
              <ion-button size="medium" @click="goToRegister">
                Register Here
              </ion-button>
            </ion-buttons>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
} from "@ionic/vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
  console.log("hitting login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
}

.container {
  margin: auto;
}
.lgnHeader {
  background-color: gray;
}
.lgnTitle {
  margin-left: auto;
  margin-right: auto;
}

.lgnInput {
  padding: 2px;
}

</style>
