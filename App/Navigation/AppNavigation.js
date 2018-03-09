import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

//Screens
import MainScreen from '../../ignite/DevScreens/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  MainScreen: { screen: MainScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
