import { BleClient } from '@capacitor-community/bluetooth-le';
import eventBus from './eventBus'; // Import the event bus
class BluetoothService {
  private keepAliveInterval: any;
  private puttMadeUUID: string = 'your-putt-made-uuid';
  private speedUUID: string = 'your-speed-uuid';
  private serviceUUID: string = 'your-service-uuid';

  async initializeBluetooth(): Promise<void> {
    await BleClient.initialize();
  }

  async scanForDevices(): Promise<any> {
    const device = await BleClient.requestDevice({
        services: [],
        optionalServices: [],
    });
    console.log('Device found:', device);
    return device;
  }

  async connectToDevice(deviceId: string): Promise<void> {
    try {
      console.log('Attempting to connect to device:', deviceId);

      await BleClient.connect(deviceId, async (deviceId) => {
        console.log('Device disconnected:', deviceId);
        await this.handleDisconnection(deviceId);
      });

      console.log('Connected to device:', deviceId);

      await this.startNotifications(deviceId, this.serviceUUID, this.puttMadeUUID);
      await this.startNotifications(deviceId, this.serviceUUID, this.speedUUID);

      // await this.startKeepAlive(deviceId, 'your-characteristic-uuid');
    } catch (error) {
      console.error('Failed to connect to device:', error);
    }
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


  // private async startKeepAlive(deviceId: string, characteristicUuid: string): Promise<void> {
  //   const keepAliveData = new Uint8Array([0x00]); 
  //   const keepAliveDataView = new DataView(keepAliveData.buffer);

  //   this.keepAliveInterval = setInterval(async () => {
  //     try {
  //       await BleClient.write(deviceId, 'your-service-uuid', characteristicUuid, keepAliveDataView);
  //       console.log('Keep-alive data sent');
  //     } catch (error) {
  //       console.error('Failed to send keep-alive data:', error);
  //     }
  //   }, 5000); 
  // }

  // private async stopKeepAlive(): Promise<void> {
  //   if (this.keepAliveInterval) {
  //     clearInterval(this.keepAliveInterval);
  //     this.keepAliveInterval = null;
  //   }
  // }

  private async handleDisconnection(deviceId: string): Promise<void> {
    // await this.stopKeepAlive();
    
    setTimeout(async () => {
      console.log('Reconnecting to device:', deviceId);
      await this.connectToDevice(deviceId);
    }, 5000); 
  }
}

export default new BluetoothService();