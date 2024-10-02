import { BleClient } from '@capacitor-community/bluetooth-le';
import eventBus from './eventBus'; // Import the event bus
class BluetoothService {
  private keepAliveInterval: any;
  private puttMadeUUID: string = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
  private speedUUID: string = 'ec01d9ec-7335-4a42-9f54-6f648d4aaf1e';
  private serviceUUID: string = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

  async initializeBluetooth(): Promise<void> {
    await BleClient.initialize();
  }

  async scanForDevices(): Promise<any> {
    const timeout = 3 * 60 * 1000; 

    const devicePromise = BleClient.requestDevice({
      services: [], 
      optionalServices: [this.serviceUUID, this.puttMadeUUID, this.speedUUID], 
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request device timeout')), timeout)
    );

    try {
      const device = await Promise.race([devicePromise, timeoutPromise]);
      console.log('Device found:', device);
      return device;
    } catch (error) {
      console.error('Failed to find device:', error);
      throw error;
    }
  }

  async connectToDevice(deviceId: string): Promise<void> {
    try { 
      console.log('Attempting to connect to device:', deviceId);

      await BleClient.connect(deviceId, async (deviceId) => {
        console.log('Device disconnected:', deviceId);
        await this.handleDisconnection(deviceId);
      });

      console.log('Connected to device:', deviceId);

      //await this.startNotifications(deviceId, this.serviceUUID, this.puttMadeUUID);
      //await this.startNotifications(deviceId, this.serviceUUID, this.speedUUID);

      // await this.startKeepAlive(deviceId, 'your-characteristic-uuid');
    } catch (error) {
      console.error('Failed to connect to device:', error);
    }
  }

  async discoverServicesAndCharacteristics(deviceId: string): Promise<void> {
    try {
      // Discover services
      const services = await BleClient.getServices(deviceId);
      console.log('Discovered services:', services);

      for (const service of services) {
        console.log(`Service UUID: ${service.uuid}`);

        // Inspect characteristics for each service
        for (const characteristic of service.characteristics) {
          console.log(`Characteristic UUID: ${characteristic.uuid}`);
          console.log(`Characteristic properties: ${JSON.stringify(characteristic.properties)}`);
        }
      }
    } catch (error) {
      console.error('Failed to discover services and characteristics:', error);
    }
  }
  
  async readData(deviceId: string, service: string, characteristic: string): Promise<DataView> {
    const result = await BleClient.read(deviceId, service, characteristic);
    console.log('Data read from characteristic:', result);
    return result;
  }

  async startNotifications(deviceId: string, service: string, characteristic: string): Promise<void> {
    try {
      console.log(`Attempting to start notifications for device: ${deviceId}, service: ${service}, characteristic: ${characteristic}`);
      await BleClient.startNotifications(deviceId, service, characteristic, (value) => {
        console.log('Notification received:', value);
        eventBus.emit('dataReceived', value);
      });
      console.log('Started notifications on characteristic:', characteristic);
    } catch (error) {
      console.error(`Failed to start notifications for device: ${deviceId}, service: ${service}, characteristic: ${characteristic}. Error:`, error);
    }
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