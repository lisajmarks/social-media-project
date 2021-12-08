import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import styles from "./styles";
import { getDatabase, ref, onValue, set } from "firebase/database";

const Home = (props) => {
  const signout = () => {
    props.userAuth.signOut();
  };

  const db = getDatabase();
  const profileRef = ref(db, "profiles/" + props.userId);

  // useEffect(() => {
  //   if (props.userId === "") {
  //     props.navigation.navigate("Auth");
  //   } else {
  //     console.log("profiles/" + props.userId);
  //   }
  // }, [props.userId]);

  // onSubmit = () => {
  //   set(profileRef, { name: name, bio: bio }).catch((err) => console.log(err));
  // };

  // useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Profile")}
        style={styles.button}
      >
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("NewPost")}
        style={styles.button}
      >
        <Text style={styles.text}>New Post</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Posts")}
        style={styles.button}
      >
        <Text style={styles.text}>Posts</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signout} style={styles.button}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
