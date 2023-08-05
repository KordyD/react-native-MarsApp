import { useFonts } from 'expo-font';
import { Dosis_400Regular, Dosis_600SemiBold } from '@expo-google-fonts/dosis';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Button, NativeBaseProvider, Select, FormControl } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Dosis_400Regular, Dosis_600SemiBold });

  const cameras = [
    { abbr: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { abbr: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { abbr: 'MAST', label: 'Mast Camera' },
    { abbr: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
    { abbr: 'MAHLI', label: 'Mars Hand Lens Imager' },
    { abbr: 'MARDI', label: 'Mars Descent Imager' },
    { abbr: 'NAVCAM', label: 'Navigation Camera' },
    { abbr: 'PANCAM', label: 'Panoramic Camera' },
    {
      abbr: 'MINITES',
      label: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    },
  ];

  const URL = '';

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [camera, setCamera] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    try {
      setError('');
      if (!camera) {
        throw new Error('Please, select a camera');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <Text style={styles.header}>Select Camera and Date</Text>
        <FormControl isInvalid={error}>
          <Select
            selectedValue={camera}
            placeholder='Choose camera'
            onValueChange={(value) => setCamera(value)}
          >
            {cameras.map((item) => (
              <Select.Item
                key={item.abbr}
                label={item.label}
                value={item.abbr}
              />
            ))}
          </Select>
          <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          <DateTimePicker
            value={date}
            mode='date'
            maximumDate={new Date()}
            onChange={(event, date) => setDate(date)}
          />
          <Button variant='solid' onPress={handleSubmit}>
            Explore
          </Button>
        </FormControl>
        <StatusBar style='auto' />
      </SafeAreaView>
    </NativeBaseProvider>
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
