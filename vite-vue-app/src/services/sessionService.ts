import { useSessionStore } from '../stores/sessionStore'; // Adjust the path to your store

class SessionService {
  private sessionStore = useSessionStore();

  handleIncomingData(data: any) {
    this.sessionStore.addData(data);
  }

}

const sessionService = new SessionService();
export default sessionService;