import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
  },
  bottomNavbar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  iconBehave: {
    padding: 25,
    borderRadius: 100,
    backgroundColor: '#1D2226',
  },
  battleIcon: {
    height: 50,
    width: 50,
  },
  containerStatsUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  currentUserWelcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentUserWelcome_light: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  statsUser: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapLevelUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStatsLevelUser: {
    height: 40,
    width: 40,
  },
  wrapTokenUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  imgStatsTokenUser: {
    height: 40,
    width: 40,
  },
  textStatsUser: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  textStatsUser_light: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'black',
  },
  arenaContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  arenaBorder: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1D2226',
  },
  wrapArenaContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textArena: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listArenaContainer: {
    height: Dimensions.get('window').height / 2,
    padding: 20,
  },
  detailChallenge: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgChestChallenge: {
    width: 50,
    height: 50,
  },
  pressableClaim: {
    borderRadius: 8,
    padding: 9,
  },
  disabledPressableClaim: {
    backgroundColor: '#1D2226',
  },
  wrappingTextChallenge: {
    display: 'flex',
    flexDirection: 'row',
    width: 150,
    flexWrap: 'wrap',
  },
});

export default styles;
