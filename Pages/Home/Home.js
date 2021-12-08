import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import styles from "./styles";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signout = () => {
    props.userAuth.signOut();
  };

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    }
  }, [props.userId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Profile")}
        style={styles.button}
      >
        <Text style={styles.text}>Profile</Text>{" "}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("NewPost")}
        style={styles.button}
      >
        <Text style={styles.text}>New Post</Text>{" "}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Posts")}
        style={styles.button}
      >
        <Text style={styles.text}>Posts</Text>{" "}
      </TouchableOpacity>

      <TouchableOpacity onPress={signout} style={styles.button}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
