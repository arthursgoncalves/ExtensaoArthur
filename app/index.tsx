import { Text, View, StyleSheet, LogBox, Image, Button } from "react-native";
import { Link } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

LogBox.ignoreAllLogs(true);

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/venda.png")} />
      <Text style={styles.maintext}>Bem-vindo ao Minerva</Text>
      <Text style={styles.submaintext}>Seu aplicativo de gestão</Text>
      <Link href="../about" style={styles.button}>
        Entrar
      </Link>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen name="Home" component={Index} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    padding: 15,
    display: "flex",
    fontSize: 16,
    margin: 4,
    //fontSize: 20,
    //textDecorationLine: "underline",
    color: "#fff",
  },
  maintext: {
    fontSize: 30,
    color: "#fff",
  },
  submaintext: {
    fontSize: 10,
    color: "#fff",
  },
});
