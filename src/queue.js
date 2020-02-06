import 'dotenv/config';

import Queue from './lib/Queue';

// Starting queue in separated service
Queue.processQueue();
