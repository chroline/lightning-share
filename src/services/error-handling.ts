import toast from "../util/toast";

namespace ErrorHandlingService {
  /**
   * Notify the user of an unexpected error that occurred.
   *
   * @param {string} title - title of error that occurred
   * @param {Error} error - error that occurred
   */
  export function notifyUserOfError(title: string, error: Error) {
    console.error(title, error);
    toast({
      title,
      description: error.message || error.name,
      status: "error",
      duration: undefined,
      isClosable: true,
    });
  }
}

export default ErrorHandlingService;
