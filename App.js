import { useFonts } from 'expo-font';
import { Dosis_400Regular, Dosis_600SemiBold } from '@expo-google-fonts/dosis';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Dosis_400Regular, Dosis_600SemiBold });

  const [language, setLanguage] = useState('');

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.header}>Select Camera and Date</Text>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCCEBE',
  },
  header: {
    fontFamily: 'Dosis_600SemiBold',
    fontSize: 18,
    alignSelf: 'center',
  },
});
