import * as Google from 'expo-google-app-auth';

export const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    }

    return { cancelled: true };
  } catch (e) {
    return { error: true };
  }
};
