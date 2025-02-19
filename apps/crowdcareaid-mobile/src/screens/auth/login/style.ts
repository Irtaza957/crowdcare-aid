import { Colors } from '@crowdcareaid-frontend/assets';
import { StyleSheet } from 'react-native';
import { normalizeSize } from '@crowdcareaid-frontend/utils';

export const LoginStyles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    backgroundColor: Colors.white,
    height: 54,
    paddingHorizontal: normalizeSize(20),
    borderRadius: normalizeSize(7),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeSize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ccc',
  },
  concat: {
    paddingHorizontal: normalizeSize(20),
    alignSelf: 'center',
    marginVertical: normalizeSize(20),
  },
  lineView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: Colors.lightGray,
    height: 0.5,
    width: normalizeSize(155),
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: normalizeSize(25),
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalizeSize(25),
    paddingHorizontal: 2,
  },
});
