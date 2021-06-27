import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import firebase from 'firebase';
import { useEffect } from 'react';

export const useFacebookAuth = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '<YOUR FBID>', // TODO
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;

      const credential =
        firebase.auth.FacebookAuthProvider.credential(access_token);

      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return { request, promptAsync };
};
