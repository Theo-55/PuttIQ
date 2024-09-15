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
              <ion-button size="default" @click="goToRegister">
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
  IonContent,
  IonPage,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiService from "../services/apiService";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const email = ref("");
const password = ref("");

const userStore = useUserStore();
const api = new apiService("http://api.test/");

const login = async () => {
  console.log(email.value);
  try {
    const response = await api.post("api/user/login", {
      email: email.value,
      password: password.value,
    });
    userStore.setAccessToken(response.token);
    console.log("Login successful:", response);
    router.push("/puttIQ/home");
    // Handle successful login, e.g., store tokens, redirect, etc.
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login failure
  }
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
