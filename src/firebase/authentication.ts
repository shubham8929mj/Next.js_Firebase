import firebase_app from "./config";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

export async function signedFunction(
  type: string,
  email: string,
  password: string
) {
  let result = null,
    error = null;
  try {
    if (type === "sign-in") {
      result = await signInWithEmailAndPassword(auth, email, password);
    } else {
      result = await createUserWithEmailAndPassword(auth, email, password);
    }
  } catch (err) {
    error = err;
  }

  return { result, error };
}

export async function googleSignIn() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, googleProvider);
  } catch (err) {
    error = err;
  }

  return { result, error };
}

export async function logOut() {
  let result = null,
  error = null;
  try {
    result = await signOut(auth);
  } catch (err) {
    error = err;
  }

  return { result, error };
}
