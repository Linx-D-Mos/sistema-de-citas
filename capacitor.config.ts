import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  // appId: 'com.josh.neobarber',
  appName: 'NeoBarber',
  webDir: 'www',
  
  plugins: {
    // CapacitorHttp: {
    //   enabled: true,
    // },
    // SplashScreen: {
    //   launchShowDuration: 0,
    //   backgroundColor: '#ffffff',
    // },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  // icon: 'src/assets/icon/icon.png',
  //splash: 'src/assets/icon/icon.png',
};

export default config;
