import BackpackBundlesScreen from '../../pages/BackpackBundlesScreen';
import BackpackCombineScreen from '../../pages/BackpackCombineScreen';
import BackpackItemsScreen from '../../pages/BackpackItemsScreen';
import BackpackPokemonScreen from '../../pages/BackpackPokemonScreen';
import Colors from './Colors';
import {Icons} from './Icons';

export const TabNavigation = [
  {
    route: 'Pokemon',
    label: 'Pokemon',
    color: Colors.accenBlue,
    alphaClr: Colors.accenAlpha,
    destination: Icons.find(item => item.name === 'pokemon').destination,
    component: BackpackPokemonScreen,
  },
  {
    route: 'Items',
    label: 'Items',
    color: Colors.green,
    alphaClr: Colors.greenAlpha,
    destination: Icons.find(item => item.name === 'items').destination,
    component: BackpackItemsScreen,
  },
  {
    route: 'Bundles',
    label: 'Bundles',
    color: Colors.red,
    alphaClr: Colors.redAlpha,
    destination: Icons.find(item => item.name === 'bundles').destination,
    component: BackpackBundlesScreen,
  },
  {
    route: 'Combine',
    label: 'Combine',
    color: Colors.purple,
    alphaClr: Colors.purpleAlpha,
    destination: Icons.find(item => item.name === 'combine').destination,
    component: BackpackCombineScreen,
  },
];
