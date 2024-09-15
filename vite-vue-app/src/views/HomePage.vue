<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
  padding: 10px;
}

.quadrant {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.quadrant h2 {
  margin: 0;
  font-size: 1.2em;
}

.quadrant p {
  margin: 10px 0 0;
  font-size: 2em;
  font-weight: bold;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="dashboard">
        <div class="quadrant">
          <h2>Total Putts</h2>
          <p>0</p>
        </div>
        <div class="quadrant">
          <h2>Average Speed</h2>
          <p>0</p>
        </div>
        <div class="quadrant">
          <h2>Putts Made</h2>
          <p>0</p>
        </div>
        <div class="quadrant">
          <h2>Putts missed</h2>
          <p>0</p>
        </div>
      </div>
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
</script>
