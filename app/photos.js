import { useSelector } from 'react-redux';
import {
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { Dosis_600SemiBold, Dosis_400Regular } from '@expo-google-fonts/dosis';

const Photos = () => {
  const [fontsLoaded] = useFonts({ Dosis_600SemiBold, Dosis_400Regular });

  const photos = useSelector((state) => state.photos.photos);
  const { camera } = useLocalSearchParams();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#dccebe',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack.Screen
        options={{
          headerTitleStyle: { fontFamily: 'Dosis_600SemiBold' },

          title: `${camera}`,
        }}
      />
      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
        }}
        numColumns={3}
        data={photos}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({
                pathname: '/openedPhoto',
                params: { url: item.img_src, id: item.id },
              })
            }
          >
            <Image
              style={styles.img}
              key={item.id}
              alt='image of Mars'
              source={{ uri: item.img_src }}
              width={100}
              height={100}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  img: {
    margin: 5,
    borderRadius: 5,
  },
});
