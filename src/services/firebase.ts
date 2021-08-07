import { BehaviorSubject } from "rxjs";

namespace FirebaseService {
  let _app: import("@firebase/app").FirebaseApp;

  export const userId$ = new BehaviorSubject<string | undefined>(undefined);

  /**
   * Initialize Firebase.
   */
  export async function init() {
    // TODO
    throw new Error("unimplemented");
  }

  /**
   * Anonymously authenticate with Firebase Authentication.
   */
  export async function anonymousAuth() {
    // TODO
    throw new Error("unimplemented");
  }
}

export default FirebaseService;
