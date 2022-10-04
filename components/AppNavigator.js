import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Search from "../screens/Search";
import Cards from "../screens/Cards";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import Home from "../screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="HOME" />
      <BottomNavigationTab title="BUSCAR" />
      <BottomNavigationTab title="CARTÕES" />
    </BottomNavigation>
  );
};

const TabNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={Home} />
      <Screen name="Buscar Estabelecimentos" component={Search} />
      <Screen name="Cartões" component={Cards} />
    </Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
