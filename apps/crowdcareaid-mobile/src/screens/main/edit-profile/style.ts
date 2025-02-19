import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  infoView: {
    width: '100%',
    flex: 0.7,
  },
  CameraView: {
    width: normalizeSize(37),
    height: normalizeSize(37),
    borderRadius: normalizeSize(10),
    backgroundColor: Colors.SecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  renderMain: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  ImagePosition: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    width: '85%',
  },
  BackCross: { position: 'absolute', bottom: 120 },
  PersonalData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Date: {
    height: normalizeSize(52),
    width: normalizeSize(150),
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.PrimaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  MainDate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: normalizeSize(15),
  },
  Achievement: {
    width: '100%',
    backgroundColor: Colors.SecondaryColor,
    height: normalizeSize(180),
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeSize(10),
  },
  crossIcon: {
    position: 'absolute',
    top: normalizeSize(25),
    left: normalizeSize(25),
    zIndex: 10,
  },
  PositionView: { position: 'relative' },
  CameraPosition: {
    alignItems: 'flex-end',
    width: normalizeSize(320),
  },
  ImageModal: { paddingHorizontal: normalizeSize(20) },
  GenderWidth: { width: '45%' },
  FlashListStyle: {
    justifyContent: 'space-between',
    marginBottom: normalizeSize(30),
  },
  AchievementData: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '33%',
    borderRightColor: Colors.white,
  },
  opacityMainView: {
    flex: 0.35,
    marginBottom: 10,
    backgroundColor: Colors.PrimaryColor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
