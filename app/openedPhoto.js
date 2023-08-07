import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { Dosis_600SemiBold } from '@expo-google-fonts/dosis';

export default function openedPhoto() {
  const [fontsLoaded] = useFonts({ Dosis_600SemiBold });

  const { url, id } = useLocalSearchParams();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          title: `${id}`,
          headerTitleStyle: { fontFamily: 'Dosis_600SemiBold' },

          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerRight: () => (
            <TouchableOpacity>
              <Image source={require('../assets/share.png')} alt='Share Icon' />
            </TouchableOpacity>
          ),
        }}
      />

      <Image
        style={{ borderRadius: 10, width: '80%', height: '80%' }}
        source={{ uri: url }}
        width={100}
        height={100}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
