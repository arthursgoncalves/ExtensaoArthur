import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "./about";
import ProdutosScreen from "./produtos";
import { MainStackRoutes } from "../interface";

const Tab = createBottomTabNavigator<MainStackRoutes>();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="about"
      screenOptions={{
        headerTitle: "Home",
        tabBarActiveTintColor: "#9FC131",
        headerShadowVisible: false,
        headerTintColor: "#25292e",
        tabBarStyle: {
          backgroundColor: "#042940",
        },
      }}
    >
      <Tab.Screen
        name="about"
        component={AboutScreen}
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="produtos"
        component={ProdutosScreen}
        options={{
          title: "Produtos",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "cart-sharp" : "cart-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
