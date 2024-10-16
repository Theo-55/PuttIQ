import { useSessionStore } from '../stores/sessionStore'; 

class SessionService {
  private sessionStore = useSessionStore();

  handleIncomingData(data: any) {
    this.sessionStore.addData(data);
  }
  updateCount() {
    this.sessionStore.incrementPuttsMade();
  }

}

const sessionService = new SessionService();
export default sessionService;