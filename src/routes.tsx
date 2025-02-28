import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home/index";
import Points from "./pages/Points/index";
import Detail from "./pages/Detail/index";
import CreatePoint from "./pages/CreatePoint/index";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="CreatePoint" component={CreatePoint} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
