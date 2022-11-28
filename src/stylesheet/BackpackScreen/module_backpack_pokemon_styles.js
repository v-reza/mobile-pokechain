import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexGrow: 0,
  },
  detailPokemonContainer: {
    backgroundColor: 'rgb(55 65 81)',
    width: '100%',
  },
  linearGradient: {
    height: 300,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1D2226',
  },
  btnNavigation: {
    padding: 10,
    borderRadius: 10,
  },
  elementContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  wrapElementContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imgElement: {
    height: 20,
    width: 20,
  },
  pokemonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 50,
  },
  imgPokemon: {
    width: 100,
    height: 100,
  },
  detailNameLevelPokemon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 35,
  },
  textPokemonName: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textDarkMode: {
    color: 'white',
  },
  textLightMode: {
    color: 'black',
  },
});

export default styles;
