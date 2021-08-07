import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { BehaviorSubject } from "rxjs";

import firebaseConfig from "../util/firebase-config";
import UserDataService from "./user-data";

namespace FirebaseService {
  let _app: import("@firebase/app").FirebaseApp;

  export const userId$ = new BehaviorSubject<string | undefined>(undefined);

  /**
   * Initialize Firebase.
   *
   * Lazy-imports Firebase packages to shrink initial load size.
   * Initializes Firebase using {@link firebaseConfig}
   */
  export async function init() {
    _app = initializeApp(firebaseConfig);
  }

  /**
   * Anonymously authenticate with Firebase Authentication.
   *
   * - Signs in with anonymous auth provider.
   * - Updates {@link userId$} subject.
   * - Seed user data doc.
   * - Watches for auth changes and re-executes auth process.
   */
  export async function anonymousAuth() {
    const auth = getAuth();

    async function _signIn() {
      const { user } = await signInAnonymously(auth);
      userId$.next(user.uid);
      await UserDataService.seed();
    }

    await _signIn();

    onAuthStateChanged(auth, user => {
      userId$.next(user?.uid);
      if (!user || !user.uid) {
        _signIn();
      }
    });
  }
}

export default FirebaseService;
