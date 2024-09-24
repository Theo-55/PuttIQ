import { defineStore } from 'pinia';

export interface SessionData {
  data: any; 
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionStart: null as Date | null,
    sessionData: [] as SessionData[],
  }),
  actions: {
    startSession() {
      this.sessionStart = new Date();
      this.sessionData = [];
    },
    addData(data: any) {
      this.sessionData.push({ data });
    },
    clearSession() {
      this.sessionStart = null;
      this.sessionData = [];
    },
  },
  getters: {
    getSessionStart: (state) => state.sessionStart,
    getSessionData: (state) => state.sessionData,
  },
});