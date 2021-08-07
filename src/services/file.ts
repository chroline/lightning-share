import { FileInfo } from "../util/file-info";

namespace FileService {
  /**
   * Upload file.
   *
   * @param {File} file - file to be uploaded
   * @returns {string} generated word code for file
   */
  export async function upload(file: File): Promise<string> {
    // TODO
    throw new Error("unimplemented");
  }

  /**
   * Download file.
   *
   * @param {string} wordCode - word code of the file
   * @param {string} filename - name of file to be downloaded
   */
  export async function download(wordCode: string, filename: string) {
    // TODO
    throw new Error("unimplemented");
  }

  /**
   * Check if file exists.
   *
   * @param {string} wordCode - word code of the file
   */
  export async function doesExist(wordCode: string): Promise<boolean> {
    // TODO
    throw new Error("unimplemented");
  }

  /**
   * Get info of file.
   *
   * @param {string} wordCode - word code of the file
   * @returns {FileInfo} file information data
   */
  export async function getInfo(wordCode: string): Promise<FileInfo> {
    // TODO
    throw new Error("unimplemented");
  }

  /**
   * Remove file.
   *
   * @param {string} wordCode - word code of the file
   * @param {string} filename - name of file to be downloaded
   */
  export async function remove(wordCode: string, filename: string) {
    // TODO
    throw new Error("unimplemented");
  }
}

export default FileService;
