import * as Facebook from 'expo-facebook';

export const signInWithFacebookAsync = async () => {
  try {
    await Facebook.initializeAsync(process.env.FACEBOOK_APP_ID);

    const fb = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (fb.type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${fb.token}`
      );

      // return fb.token;
      return await response.json();
    } else {
      // TODO
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
