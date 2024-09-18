<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="tabs">
        <ion-tab-button tab="home" href="puttIQ/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home" href="puttIQ/home">
          <ion-icon :icon="logOutOutline"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<style scoped>
.tabs {
  height: 10%;
}
</style>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import { homeOutline } from "ionicons/icons";
import { logOutOutline } from "ionicons/icons";
</script>
