import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";

import AuthService from "./auth";

class UserDataService {
  private static _I = new UserDataService();
  public static get I() {
    return this._I;
  }

  /**
   * Seed user document with files field.
   */
  async seed() {
    const firestore = getFirestore();
    await setDoc(doc(collection(firestore, "users"), AuthService.I.userId$.value!), { files: [] }, { merge: true });
  }

  /**
   * Get list of hosted files uploaded by current user.
   *
   * @returns {Promise<string[]>} list of word codes of hosted files
   */
  async getHostedFiles(): Promise<string[]> {
    const firestore = getFirestore();
    const userDocRef = doc(collection(firestore, "users"), AuthService.I.userId$.value!);
    return (await getDoc(userDocRef)).get("files") as string[];
  }
}

export default UserDataService;
