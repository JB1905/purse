import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { useEffect } from 'react';

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'Your-Web-Client-ID.apps.googleusercontent.com', // TODO
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return { request, promptAsync };
};
