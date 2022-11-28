import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listNavigation: {
    padding: 30,
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollNavigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  isActiveNavigation: {
    backgroundColor: '#1D2226',
  },
  btnNavigation: {
    padding: 10,
    borderRadius: 10,
  },

  textDarkMode: {
    color: 'white',
  },
  textLightMode: {
    color: 'black',
  },
});

export default styles;
