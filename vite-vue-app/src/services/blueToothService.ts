// src/services/BluetoothService.ts

import { BleClient } from '@capacitor-community/bluetooth-le';

class BluetoothService {
  async initializeBluetooth(): Promise<void> {
    await BleClient.initialize();
  }

  async scanForDevices(): Promise<any> {
    const device = await BleClient.requestDevice({
        services: [],
        optionalServices: ['0000180F-0000-1000-8000-00805f9b34fb'],
    });
    console.log('Device found:', device);
    return device;
  }

  async connectToDevice(deviceId: string): Promise<void> {
    await BleClient.connect(deviceId, (deviceId) => this.onDisconnect(deviceId));
    console.log('Connected to device:', deviceId);
  }

  async readData(deviceId: string, service: string, characteristic: string): Promise<DataView> {
    const result = await BleClient.read(deviceId, service, characteristic);
    console.log('Data read from characteristic:', result);
    return result;
  }

  async readBatteryLevel(deviceId: string): Promise<number> {
    const batteryService = '0000180F-0000-1000-8000-00805f9b34fb'; // Battery Service UUID
    const batteryLevelCharacteristic = '00002A19-0000-1000-8000-00805f9b34fb'; // Battery Level Characteristic UUID
    console.log('awaiting battery level')
    const result = await this.readData(deviceId, batteryService, batteryLevelCharacteristic);
    const batteryLevel = result.getUint8(0); // Battery level is a single byte
    console.log('Battery level:', batteryLevel);
    return batteryLevel;
  }

  async disconnectDevice(deviceId: string): Promise<void> {
    await BleClient.disconnect(deviceId);
    console.log('Disconnected from device:', deviceId);
  }

  private onDisconnect(deviceId: string): void {
    console.log(`Device ${deviceId} disconnected`);
  }
}

export default new BluetoothService();