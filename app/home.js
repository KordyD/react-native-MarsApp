import { Select } from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Dosis_400Regular, Dosis_600SemiBold } from '@expo-google-fonts/dosis';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchPhotos } from '../store/photosSlice';

SplashScreen.preventAutoHideAsync();

const Home = () => {
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [camera, setCamera] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    try {
      setError('');
      if (!camera) {
        throw new Error('Please, select a camera');
      }
      dispatch(fetchPhotos({ camera: camera, date: date })).then(
        router.push({ pathname: '/photos', params: { camera: camera } })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Screen
          options={{
            headerTitleStyle: { fontFamily: 'Dosis_600SemiBold' },
            title: 'Select Camera and Date',
          }}
        />
        <ImageBackground
          source={require('../assets/background.png')}
          resizeMode='cover'
          style={styles.imgBgd}
        >
          <View style={styles.formWrapper} isInvalid={error}>
            <View>
              <Text style={styles.label}>Rover Camera</Text>
              <Select
                bgColor={'#eee7df'}
                selectedValue={camera}
                placeholder='Choose camera'
                onValueChange={(value) => setCamera(value)}
                variant='filled'
                borderWidth={0}
                padding={15}
                borderRadius={5}
              >
                {cameras.map((item) => (
                  <Select.Item
                    key={item.abbr}
                    label={item.label}
                    value={item.abbr}
                  />
                ))}
              </Select>
              <Text style={styles.error}>{error}</Text>
            </View>
            <Pressable onPress={() => setDatePickerVisibility(true)}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.calendar}>
                <View>
                  <Text style={styles.placeholder}>
                    {date.toLocaleDateString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
                <Image
                  source={require('../assets/calendar.png')}
                  alt='Calendar Icon'
                />
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={(date) => {
                setDate(date);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
              textColor='black'
              maximumDate={new Date()}
              date={date}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <StatusBar style='auto' />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBgd: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    paddingTop: 0,
    gap: 20,
  },
  calendar: {
    backgroundColor: '#eee7df',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
  },
  label: { fontFamily: 'Dosis_400Regular', fontSize: 18, marginBottom: 5 },
  error: {
    fontFamily: 'Dosis_400Regular',
    fontSize: 14,
    marginTop: 5,
    color: '#BF2E0E',
  },
  placeholder: { fontFamily: 'Dosis_400Regular', fontSize: 18 },
  button: {
    backgroundColor: '#BF2E0E',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Dosis_400Regular',
    fontSize: 18,
  },
});
