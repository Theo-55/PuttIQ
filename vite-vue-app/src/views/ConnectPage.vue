<template>
  <div class="container">
    <button @click="initializeBluetooth" class="bluetooth-button">
      Initialize Bluetooth
    </button>
    <button @click="scanForDevices" class="bluetooth-button">
      Scan for Devices
    </button>
    <button @click="connectToDevice" class="bluetooth-button">
      Connect to Device
    </button>
    <button @click="disconnectDevice" class="bluetooth-button">
      Disconnect Device
    </button>
    <div v-if="device" class="device-info">
      Connected to Device: {{ device.name }}
    </div>
    <div v-if="data" class="data-info">Data: {{ data }}</div>
    <div v-if="batteryLevel !== null" class="battery-info">
      Battery Level: {{ batteryLevel }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BluetoothService from "@/services/BluetoothService";
import { useBluetoothStore } from "../stores/bluetoothStore";
import type { Device } from "../stores/bluetoothStore";

const bluetoothStore = useBluetoothStore();
const device = ref<Device>();
const data = ref<string | null>(null);
const batteryLevel = ref<number | null>(null);

const initializeBluetooth = async () => {
  try {
    await BluetoothService.initializeBluetooth();
    console.log("Bluetooth initialized");
  } catch (error) {
    console.error("Error initializing Bluetooth:", error);
  }
};

const scanForDevices = async () => {
  try {
    device.value = await BluetoothService.scanForDevices();
    bluetoothStore.setDevice(device.value);
    console.log("Device from store", bluetoothStore.getDevice);
    console.log("Device found:", device.value);
  } catch (error) {
    console.error("Error scanning for devices:", error);
  }
};

const connectToDevice = async () => {
  if (bluetoothStore.device) {
    try {
      console.log("device ID from store", bluetoothStore.device.deviceId);
      await BluetoothService.connectToDevice(bluetoothStore.device.deviceId);
      console.log("Connected to device:", bluetoothStore.device);
      batteryLevel.value = await BluetoothService.readBatteryLevel(
        bluetoothStore.device.deviceId
      );
      console.log("Battery level:", batteryLevel.value);
    } catch (error) {
      console.error("Error connecting to device:", error);
    }
  } else {
    console.warn("No device to connect to");
  }
};

const disconnectDevice = async () => {
  if (device.value) {
    try {
      await BluetoothService.disconnectDevice(device.value.deviceId);
      console.log("Disconnected from device:", device.value);
      device.value = null;
    } catch (error) {
      console.error("Error disconnecting from device:", error);
    }
  } else {
    console.warn("No device to disconnect from");
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.bluetooth-button {
  background-color: #add8e6; /* Light blue color */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.bluetooth-button:hover {
  background-color: #87ceeb; /* Slightly darker blue on hover */
}

.device-info {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
