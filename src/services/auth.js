import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

export const getCurrentUser = () => currentUser;

export const getCurrentToken = async () => {
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdToken();
};
