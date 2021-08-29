import { BehaviorSubject } from "rxjs";

namespace FirebaseService {
  /**
   * Firebase application reference
   */
  let _app: import("@firebase/app").FirebaseApp;

  /**
   * Id of user
   */
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
