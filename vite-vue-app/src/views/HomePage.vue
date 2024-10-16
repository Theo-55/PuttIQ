<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <div style="padding: 10px; margin-top: 40px">
      <ion-button shape="round" @click="startSession" v-if="!sessionStarted"
        >+</ion-button
      >
      <ion-button shape="round" @click="endSession" color="danger" v-else
        >Stop</ion-button
      >
    </div>
    <ion-content>
      <div class="dashboard">
        <div class="quadrant">
          <h2>Total Putts</h2>
          <p>{{ sessionStore.puttsMadeCount }}</p>
        </div>
        <div class="quadrant">
          <h2>Average Speed</h2>
          <p>10</p>
        </div>
        <div class="quadrant">
          <h2>Putts Made</h2>
          <p>9</p>
        </div>
        <div class="quadrant">
          <h2>Putts missed</h2>
          <p>4</p>
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
  IonButton,
} from "@ionic/vue";

import { ref, onMounted, onUnmounted } from "vue";
import BluetoothService from "../services/blueToothService";
import { useBluetoothStore } from "../stores/bluetoothStore";
import type { Device } from "../stores/bluetoothStore";
import eventBus from "../services/eventBus";
import sessionService from "../services/sessionService";
import { useSessionStore } from "../stores/sessionStore";

const bluetoothStore = useBluetoothStore();
const sessionStore = useSessionStore();
const device = ref<Device | undefined>();
const sessionStarted = ref(false);

const startSession = async () => {
  sessionStarted.value = true;
  scanForDevices();
};

const endSession = async () => {
  sessionStarted.value = false;
  if (bluetoothStore.device) {
    BluetoothService.disconnectDevice(bluetoothStore.device.deviceId); //TODO: convert device id to a computed value from the store
  }
};

const scanForDevices = async () => {
  try {
    const foundDevice = await BluetoothService.scanForDevices();
    device.value = foundDevice;
    bluetoothStore.setDevice(foundDevice);
    if (bluetoothStore.device) {
      console.log("deviceId", bluetoothStore.device.deviceId);
      await BluetoothService.connectToDevice(bluetoothStore.device.deviceId);
      await BluetoothService.discoverServicesAndCharacteristics(
        bluetoothStore.device.deviceId
      );
    }
  } catch (error) {
    console.error("Error", error);
  }
};

const handleDataReceived = () => {
  console.log("hitting event bus");
  sessionService.updateCount();
};

onMounted(() => {
  BluetoothService.initializeBluetooth();
  eventBus.on("bluetooth-notification", handleDataReceived);
});

onUnmounted(() => {
  if (bluetoothStore.device) {
    BluetoothService.disconnectDevice(bluetoothStore.device.deviceId);
  }
  eventBus.off("bluetooth-notification", handleDataReceived);
});
</script>

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
