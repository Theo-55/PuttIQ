<template>
  <ion-page class="container">
    <ion-content>
      <ion-card>
        <ion-card-header class="lgnHeader">
          <ion-card-title class="font-bold lgnTitle">Register</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput v-model="email" type="email" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput v-model="first_name" type="text" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="stacked">Last Name</IonLabel>
            <IonInput v-model="last_name" type="text" required></IonInput>
          </ion-item>
          <ion-item>
            <IonLabel position="stacked">Password</IonLabel>
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

const email = ref("");
const password = ref("");
const first_name = ref("");
const last_name = ref("");

const userStore = useUserStore();

const api = new apiService("http://api.test/");
const router = useRouter();

const register = async () => {
  try {
    const response = await api.post("api/user/register", {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    });

    userStore.setAccessToken(response.token);
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
