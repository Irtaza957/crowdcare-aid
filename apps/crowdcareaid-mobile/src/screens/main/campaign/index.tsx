import { StyleSheet, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import {
  AuthWrapper,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import FundraiserDetails from './molecule/FundraiserDetails';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import AmountDetails from './molecule/AmountDetails';
import Review from './molecule/Review';
import { resetCampaignFlowDetails, setAmountDetail, useAppDispatch } from '@crowdcareaid-frontend/store';

const CampaignScreen = ({ navigation }) => {

  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const headerText = useMemo(() => {
    switch (step) {
      case 2:
        return 'Amount Details';
      case 3:
        return 'Review';
      default:
        return 'Fundraiser Details';
    }
  }, [step]);

  const handleContinue = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
    if (step === 1) {
      // setResetFundraiserDetails(false);
    }

  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
      dispatch(resetCampaignFlowDetails())
    }
    else {
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  const handleHeaderPress = () => {
    switch (step) {
      case 1:
        navigation.goBack();
        dispatch(resetCampaignFlowDetails())
        break;
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(2);
        break;
      default:
        console.log('Default action');
        break;
    }
  };

  return (
    <AuthWrapper
      headerText={headerText}
      iconShow={true}
      iconColor={Colors.Black}
      textColor={Colors.white}
      onPress={handleHeaderPress}
      backgroundColor={Colors.SecondaryColor}
      statusBarColor={Colors.SecondaryColor}
    >
      <View style={styles.progressContainer}>
        <View style={[styles.stepContainer]}>
          <View
            style={[styles.stepCircle, step >= 1 && styles.activeStepCircle]}
          >
            {step > 1 ? <SVGS.check /> :
              <Typography
                label="1"
                fontSize={14}
                color={Colors.white}
                fontFamily={Fonts.Medium}
              />
            }
          </View>


          <Typography
            label="Fundraiser Details"
            fontSize={10}
            color={Colors.green}
            fontFamily={Fonts.Medium}
            marginTop={normalizeSize(10)}
            left={32}
          />

        </View>
        <View style={styles.line} />

        <View style={[styles.stepContainer, { marginLeft: -50 }]}>
          <View
            style={[styles.stepCircle, step >= 2 && styles.activeStepCircle]}
          >
            {
              step > 2 ? <SVGS.check /> :
                <Typography
                  label="2"
                  fontSize={14}
                  color={Colors.white}
                  fontFamily={Fonts.Medium}
                />
            }
          </View>
          <Typography
            label="Amount Details"
            fontSize={10}
            color={step > 1 ? Colors.green : Colors.lightGray}
            fontFamily={Fonts.Medium}
            marginTop={normalizeSize(10)}
          // marginLeft={normalizeSize(-30)}
          />
        </View>

        <View
          style={[
            styles.line,
            { backgroundColor: step > 2 ? Colors.green : Colors.lightGray },
          ]}
        />

        <View style={styles.stepContainer}>
          <View
            style={[styles.stepCircle, step >= 3 && styles.activeStepCircle]}
          >
            <Typography
              label="3"
              fontSize={14}
              color={Colors.white}
              fontFamily={Fonts.Medium}
            />
          </View>
          <Typography
            label="Review"
            fontSize={10}
            color={step > 2 ? Colors.green : Colors.lightGray}
            fontFamily={Fonts.Medium}
            marginTop={normalizeSize(10)}
          // marginLeft={normalizeSize(-30)}
          />
        </View>
      </View>

      {step === 1 && (
        <FundraiserDetails onContinue={handleContinue} onBack={handleBack} />
      )}
      {step === 2 && (
        <AmountDetails onContinue={handleContinue} onBack={handleBack} />
      )}
      {step === 3 && <Review onContinue={handleContinue} onBack={handleBack} />}
    </AuthWrapper>
  );
};

export default CampaignScreen;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalizeSize(15),
  },
  stepContainer: {
    alignItems: 'center',
    marginLeft: normalizeSize(-25),
  },
  stepCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalizeSize(20),
  },
  activeStepCircle: {
    backgroundColor: Colors.PrimaryColor,
  },
  line: {
    flex: 1,
    height: 2,
    width: '100%',
    backgroundColor: Colors.PrimaryColor,
    zIndex: -1,
    marginLeft: normalizeSize(-30),
  },
});
