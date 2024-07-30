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
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">First Name</ion-label>
            <ion-input v-model="password" type="text" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label label-placement="stacked">Last Name</ion-label>
            <ion-input v-model="password" type="text" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label label-placement="stacked">Password</ion-label>
            <ion-input v-model="password" type="password" required></ion-input>
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
} from "@ionic/vue";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const register = () => {
  console.log("hitting login");
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
