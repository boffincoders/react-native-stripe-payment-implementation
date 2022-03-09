import React, {useState} from 'react';
import {StyleSheet, Button, View, ActivityIndicator, Alert} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {CreatePaymentIntent} from '../services/payment.intent.service';
const PaymentScreen = () => {
  const {confirmPayment, loading} = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState();
  const fetchPaymentSheetParams = async () => {
    const object = {
      email: 'boffincoders@gmail.com',
      name: 'Boffin Coders',
      phone: '+919501887900',
      address: {
        line1: 'C-201,201 Industrial Area',
        line2: 'Phase 8B, Mohali',
        postal_code: '160071',
        city: 'Mohali',
        state: 'Punjab',
        country: 'India',
      },
    };
    let response = await CreatePaymentIntent(object);
    const {clientSecret} = response;
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: object,
    });
    if (error) {
      console.log(error, 'error');
      Alert.alert(error.code, error.message);
    } else if (paymentIntent) {
      Alert.alert('Success');
    }
  };

  return (
    <View style={styles.container}>
      {/* {loader && <ActivityIndicator color={'#635BFF'} size={30} />} */}
      <>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log(cardDetails, 'details');
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        <Button
          style={styles.button}
          disabled={loading}
          title="Pay"
          color="#841584"
          onPress={fetchPaymentSheetParams}
        />
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
});
export default PaymentScreen;
