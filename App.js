import React, { useState, useEffect } from "react";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import NewPost from "./Pages/NewPost/NewPost";
import Posts from "./Pages/Posts/Posts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const userAuth = getAuth();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(userAuth, (user) => {
      if (user !== null) setUserId(user.uid);
      else setUserId("");
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: { backgroundColor: "#630000" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Auth">
          {(props) => (
            <Auth userId={userId} userAuth={userAuth} {...props}>
              Auth
            </Auth>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: true,
          }}
        >
          {(props) => (
            <Home userId={userId} userAuth={userAuth} {...props}>
              Home
            </Home>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: true,
          }}
        >
          {(props) => (
            <Profile userId={userId} userAuth={userAuth} {...props}>
              Home
            </Profile>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NewPost"
          options={{
            headerShown: true,
          }}
        >
          {(props) => (
            <NewPost userId={userId} userAuth={userAuth} {...props}>
              Home
            </NewPost>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Posts"
          options={{
            headerShown: true,
          }}
        >
          {(props) => (
            <Posts userId={userId} userAuth={userAuth} {...props}>
              Home
            </Posts>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
