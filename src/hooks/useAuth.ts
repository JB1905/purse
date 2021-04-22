import { useFirebase } from 'react-redux-firebase';

import { signInWithFacebookAsync } from '../config/facebookSignIn';
import { signInWithGoogleAsync } from '../config/googleSignIn';

export const useAuth = () => {
  const firebase = useFirebase();

  const facebookSignIn = async () => {};

  const googleSignIn = async () => {};

  const createAccount = async ({ email, password, name, surname }: any) => {
    return await firebase.createUser(
      { email, password },
      { name, surname, email }
    );
  };

  const login = async ({ email, password }: any) => {
    return await firebase.login({ email, password });
  };

  const logout = async () => {
    await firebase.logout();
  };

  const resetPassword = async (email: string) => {
    return await firebase.resetPassword(email);
  };

  return {
    googleSignIn,
    facebookSignIn,
    createAccount,
    login,
    logout,
    resetPassword,
  };
};
