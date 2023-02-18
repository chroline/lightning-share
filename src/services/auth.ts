import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { BehaviorSubject } from "rxjs";

import toast from "../util/toast";
import UserDataService from "./user-data";

const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  apple: new OAuthProvider("apple.com"),
};

providers.apple.addScope("email");
providers.apple.addScope("name");

class AuthService {
  private static _I = new AuthService();
  public static get I() {
    return this._I;
  }

  /**
   * User data
   */
  private _userInfo$ = new BehaviorSubject<User | null>(null);
  public get userInfo$() {
    return this._userInfo$;
  }

  /**
   * ID of user
   */
  private _userId$ = new BehaviorSubject<string | null>(null);
  public get userId$() {
    return this._userId$;
  }

  /**
   * Anonymously authenticate with Firebase Authentication.
   *
   * - Signs in with anonymous auth provider.
   * - Updates {@link userId$} subject.
   * - Seed user data doc.
   * - Watches for auth changes and re-executes auth process.
   */
  async authenticate() {
    const auth = getAuth();

    onAuthStateChanged(auth, async user => {
      this.userInfo$.next(user);
      let userId = user?.uid || null;
      if (!user || !user.uid) {
        const { user } = await signInAnonymously(auth);
        userId = user.uid;
        this.userId$.next(userId);
        await UserDataService.I.seed();
      } else {
        const prevUserId = this.userId$.value;
        this.userId$.next(userId);

        try {
          const redirectResult = await getRedirectResult(auth);
          if (redirectResult) {
            const addlUserInfo = getAdditionalUserInfo(redirectResult);

            if (addlUserInfo?.isNewUser) {
              await UserDataService.I.seed();
            }

            !prevUserId &&
              toast({
                title: "Successfully signed in!",
                status: "success",
                isClosable: true,
              });
          }
        } catch (e) {
          if (e.code === "auth/account-exists-with-different-credential") {
            toast({
              title: "Whoops! You already have an account.",
              description: "Try signing in with the original method you used to sign up.",
              status: "error",
              isClosable: true,
            });
          } else {
            toast({
              title: "Error signing in",
              description: e.message,
              status: "error",
              isClosable: true,
            });
          }
        }
      }
    });
  }

  /**
   * Sign in using Google with given provider using redirect strategy
   *
   * @param {string} provider - provider used to sign in
   */
  async signInWithProvider(provider: keyof typeof providers) {
    const auth = getAuth();
    signInWithRedirect(auth, providers[provider]);
  }

  /**
   * Signs user out
   */
  async signOut() {
    const auth = getAuth();
    await signOut(auth);
  }
}

export default AuthService;
