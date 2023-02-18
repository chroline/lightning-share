import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { FileInfo } from "../util/file-info";
import AuthService from "./auth";

class FileService {
  private static _I = new FileService();
  public static get I() {
    return this._I;
  }
  /**
   * Upload file.
   *
   * - Generates word code for file.
   * - Adds file document to "files" collection with file metadata.
   * - Uploads file to Firebase storage.
   * - Adds word code to "files" property in user data.
   * - Returns the generated word code for file.
   *
   * @param {File} file - file to be uploaded
   * @returns {string} generated word code for file
   */
  async upload(file: File): Promise<string> {
    const uploadDate = new Date(),
      uid = AuthService.I.userId$.value!,
      firestore = getFirestore();

    async function generateWordCode(): Promise<string> {
      const { phrase } = await fetch("https://words-aas.vercel.app/api/a $adjective $noun").then(async v => v.json());
      return (await getDoc(doc(collection(firestore, "files"), phrase))).exists() ? await generateWordCode() : phrase;
    }

    const wordCode = await generateWordCode();

    await setDoc(doc(collection(firestore, "files"), wordCode), {
      name: file.name,
      filetype: file.type,
      uploadDate,
      owner: uid,
    } as FileInfo);

    await uploadBytes(ref(getStorage(), `${wordCode}/${file.name}`), file);

    await updateDoc(doc(collection(firestore, "users"), uid), {
      files: arrayUnion(wordCode),
    });

    return wordCode;
  }

  /**
   * Download file.
   *
   * - Gets download URL of file.
   * - Opens download URL in new window.
   *
   * @param {string} wordCode - word code of the file
   * @param {string} filename - name of file to be downloaded
   */
  async download(wordCode: string, filename: string) {
    const url = await getDownloadURL(ref(getStorage(), `${wordCode}/${filename}`));
    const file = await fetch(url).then(f => f.blob());
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(file);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Check if file exists.
   *
   * @param {string} wordCode - word code of the file
   */
  async doesExist(wordCode: string): Promise<boolean> {
    return await getDoc(doc(collection(getFirestore(), "files"), wordCode)).then(v => v.exists());
  }

  /**
   * Get info of file.
   *
   * - Loads file data
   * - Throws an error if the file data doesn't exist.
   * - Transforms Firebase Timestamp datatype into native JavasSript {@link Date}.
   * - Returns file data.
   *
   * @param {string} wordCode - word code of the file
   * @returns {FileInfo} file information data
   */
  async getInfo(wordCode: string): Promise<FileInfo> {
    let fileData = await getDoc(doc(collection(getFirestore(), "files"), wordCode)).then(v => v.data());
    if (!fileData) throw Error("Could not retrieve file metadata");
    fileData.uploadDate = (fileData.uploadDate as import("@firebase/firestore").Timestamp).toDate();
    return fileData as FileInfo;
  }

  /**
   * Remove file.
   *
   * - Deletes file from storage.
   * - Removes word code from files property in user data.
   * - Removes file document from files collection.
   *
   * @param {string} wordCode - word code of the file
   * @param {string} filename - name of file to be downloaded
   */
  async remove(wordCode: string, filename: string) {
    await deleteObject(ref(getStorage(), `${wordCode}/${filename}`));

    await updateDoc(doc(collection(getFirestore(), "users"), AuthService.I.userId$.value!), {
      files: arrayRemove(wordCode),
    });

    await deleteDoc(doc(collection(getFirestore(), "files"), wordCode));
  }
}

export default FileService;
