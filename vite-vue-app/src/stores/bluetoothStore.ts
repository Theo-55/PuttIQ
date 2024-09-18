import { defineStore } from 'pinia';

export interface Device {
    deviceId: string,
    name:string 
}

export const useBluetoothStore = defineStore('bluetooth', {

    state: () => ({
        device: null as Device | null,
        }),
     actions: {
        setDevice(device: Device){
            this.device = device
        },
        clearDevice() {
        this.device = null;
        },
     },
     getters: {
        getDevice: (state) => state.device
     }
});