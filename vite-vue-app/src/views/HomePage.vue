<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <div style="padding: 10px; margin-top: 40px">
      <ion-button shape="round" @click="startSession">+</ion-button>
    </div>
    <ion-content>
      <div class="dashboard">
        <div class="quadrant">
          <h2>Total Putts</h2>
          <p>20</p>
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

const bluetoothStore = useBluetoothStore();
const device = ref<Device | undefined>();

const startSession = async () => {
  scanForDevices();
};

const scanForDevices = async () => {
  try {
    const foundDevice = await BluetoothService.scanForDevices();
    device.value = foundDevice;
    bluetoothStore.setDevice(foundDevice);
    if (bluetoothStore.device) {
      await BluetoothService.connectToDevice(bluetoothStore.device.deviceId);
      console.log("success");
    }
  } catch (error) {
    console.error("Error scanning for devices:", error);
  }
};

const handleDataReceived = (value: DataView) => {
  const receivedValue = new TextDecoder().decode(value.buffer);
  sessionService.handleIncomingData(receivedValue);
};

onMounted(() => {
  BluetoothService.initializeBluetooth();
  eventBus.on("dataReceived", handleDataReceived);
});

onUnmounted(() => {
  if (bluetoothStore.device) {
    BluetoothService.disconnectDevice(bluetoothStore.device.deviceId);
  }
  eventBus.off("dataReceived", handleDataReceived);
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
