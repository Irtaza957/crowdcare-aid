import React, { useEffect } from 'react';
import Routes from '../routes';
import { Provider } from 'react-redux';
import { store, persistor } from '@crowdcareaid-frontend/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@crowdcareaid-frontend/native-components';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AutocompleteDropdownContextProvider>
          <Routes />
        </AutocompleteDropdownContextProvider>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default App;
