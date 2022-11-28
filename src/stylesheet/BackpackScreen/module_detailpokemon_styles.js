import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokemonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 50,
  },
  imgPokemon: {
    width: 300,
    height: 300,
  },
  img20: {
    width: 20,
    height: 20,
  },
  textBold15Size: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textBoldSize: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  informationContainer: {
    padding: 20,
  },
  wrapInformationContainer: {
    borderBottomWidth: 2,
    borderColor: '#1D2226',
    marginBottom: 5,
  },
  statsInformationContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
  },
  img50: {
    width: 50,
    height: 50,
  },
  wrapStats: {
    display: 'flex',
    flexDirection: 'row',
  },
  statsContainer: {
    display: 'flex',
    paddingVertical: 11,
  },
  capitalizeText: {
    textTransform: 'capitalize',
  },
  detailPokemonContainer: {
    backgroundColor: 'rgb(55 65 81)',
    width: '100%',
  },
  linearGradient: {
    height: 'auto',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1D2226',
  },
  elementContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  wrapElementContainer: {
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  pokemonEvolveContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  detailNameLevelPokemon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  imgPokemonEvolve: {
    width: 150,
    height: 150,
  },
  btnEvolve: {
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDarkMode: {
    color: 'white',
  },
  textLightMode: {
    color: 'black',
  },
});

export default styles;
