export default {
  expo: {
    name: 'Purse',
    description: 'React Native expenses assistant',
    slug: 'purse',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    experiments: {
      turboModules: true,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      buildNumber: '1.0.0',
      userInterfaceStyle: 'automatic',
      bundleIdentifier: 'com.jbiesiada.purse',
      supportsTablet: true,
      config: {
        googleSignIn: {
          reservedClientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID,
        },
      },
    },
    android: {
      versionCode: 1,
      package: 'com.jbiesiada.purse',
      permissions: ['CAMERA'], // TODO
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'jbiesiada',
            project: 'Purse',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  },
};
