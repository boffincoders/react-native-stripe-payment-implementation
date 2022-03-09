import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {Cart} from './src/screens/cart';
import {StatusBar} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './src/screens/paymentScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  const publishableKey =
    'pk_test_51JU81XSDU8gpufkqaOGyKBnJvPHtIFBqWEQ5TNJzu2DHmMvm0osyZAAsQTPSnQtF0v0xarkNWwEX3ocv4jaFuQe6007DQHEkXR';
  return (
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer>
        <StatusBar backgroundColor={'black'} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="paymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
