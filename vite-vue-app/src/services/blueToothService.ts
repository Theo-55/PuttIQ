import { BleClient } from '@capacitor-community/bluetooth-le';
import eventBus from './eventBus'; // Import the event bus
class BluetoothService {
  async initializeBluetooth(): Promise<void> {
    await BleClient.initialize();
  }

  async scanForDevices(): Promise<any> {
    const device = await BleClient.requestDevice({
        services: [],
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

  async startNotifications(deviceId: string, service: string, characteristic: string): Promise<void> {
    await BleClient.startNotifications(deviceId, service, characteristic, (value) => {
      console.log('Notification received:', value);
      eventBus.emit('dataReceived', value);
    });
    console.log('Started notifications on characteristic:', characteristic);
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