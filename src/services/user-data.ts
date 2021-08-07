import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";

import FirebaseService from "./firebase";

namespace UserDataService {
  /**
   * Seed user document with files field.
   */
  export async function seed() {
    const firestore = getFirestore();
    await setDoc(doc(collection(firestore, "users"), FirebaseService.userId$.value), { files: [] }, { merge: true });
  }

  /**
   * Get list of hosted files uploaded by current user.
   *
   * @returns {Promise<string[]>} list of word codes of hosted files
   */
  export async function getHostedFiles(): Promise<string[]> {
    const firestore = getFirestore();
    const userDocRef = doc(collection(firestore, "users"), FirebaseService.userId$.value);
    return (await getDoc(userDocRef)).get("files") as string[];
  }
}

export default UserDataService;
