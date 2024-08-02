<template>
  <ion-page class="container">
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header class="lgnHeader">
          <ion-card-title class="font-bold lgnTitle">Register</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput v-model="email" type="email" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="floating">First Name</IonLabel>
            <IonInput v-model="first_name" type="text" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="floating">Last Name</IonLabel>
            <IonInput v-model="last_name" type="text" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput v-model="password" type="password" required></IonInput>
          </ion-item>
          <ion-button expand="block" @click="register">Register</ion-button>
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
  IonInput,
} from "@ionic/vue";
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import apiService from "../services/apiService";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const first_name = ref("");
const last_name = ref("");

const userStore = useUserStore();
const useApiService = new apiService("http://api.test/");
const router = useRouter();

const register = async () => {
  try {
    console.log(email, first_name, last_name, password);
    const response = await useApiService.post("api/user/register", {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    });

    userStore.setAccessToken(response.access_token);
    router.push("/puttIQ/home");
    // Redirect or perform other actions after successful registration
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
</script>

<style scoped>
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

.input {
  margin-top: 2px;
  padding: 2px;
}
</style>
