import {
  initializeApp
} from 'firebase/app';
import {
  getMessaging
} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAPdIg4xodg61mEwwo1NMrOgMFoBpDl-74',
  authDomain: 'garbi-2b6c2.firebaseapp.com',
  projectId: 'garbi-2b6c2',
  storageBucket: 'garbi-2b6c2.appspot.com',
  messagingSenderId: '916237553430',
  appId: '1:916237553430:web:51dda03555042ddf42ca37',
  measurementId: 'G-3P1PRK2PR9',
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);