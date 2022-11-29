import BackpackScreen from '../../pages/BackpackScreen';
import EventScreen from '../../pages/EventScreen';
import FavoriteScreen from '../../pages/FavoriteScreen';
import HistoryScreen from '../../pages/HistoryScreen';
import HomeScreen from '../../pages/HomeScreen';
import SettingsScreen from '../../pages/SettingsScreen';
import StatisticScreen from '../../pages/StatisticScreen';
import {Icons} from './Icons';

export const ScreenNavigation = [
  {
    route: 'Home',
    label: 'Home',
    destination: Icons.find(item => item.name === 'home').destination,
    component: HomeScreen,
  },
  {
    route: 'Event',
    label: 'Event',
    destination: Icons.find(item => item.name === 'event').destination,
    component: EventScreen,
  },
  {
    route: 'Backpack',
    label: 'Backpack',
    destination: Icons.find(item => item.name === 'backpack').destination,
    component: BackpackScreen,
  },
  {
    route: 'Settings',
    label: 'Settings',
    destination: Icons.find(item => item.name === 'settings').destination,
    component: SettingsScreen,
  },
];

export const ProfileScreen = [
  {
    route: 'History',
    label: 'History Match',
    destination: Icons.find(item => item.name === 'history').destination,
    component: HistoryScreen,
  },
  {
    route: 'Statistic',
    label: 'Statistic',
    destination: Icons.find(item => item.name === 'statistic').destination,
    component: StatisticScreen,
  },
  {
    route: 'Favorite',
    label: 'Favorite',
    destination: Icons.find(item => item.name === 'favorite').destination,
    component: FavoriteScreen,
  },
];
