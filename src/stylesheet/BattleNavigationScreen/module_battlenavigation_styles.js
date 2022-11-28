import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnMatch: {
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  textBtn: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
