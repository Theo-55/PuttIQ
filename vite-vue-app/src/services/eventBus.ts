
import mitt from 'mitt';

type Events = {
  'bluetooth-notification': any; 
};

const eventBus = mitt<Events>();

export default eventBus;