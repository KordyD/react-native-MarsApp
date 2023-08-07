import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import store from '../store';
const StackLayout = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Stack></Stack>
      </NativeBaseProvider>
    </Provider>
  );
};

export default StackLayout;
