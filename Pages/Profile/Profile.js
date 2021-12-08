import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import styles from "./styles";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profiledata, setProfileData] = useState({ bio: "", name: "" });

  const db = getDatabase();
  const profileRef = ref(db, "profiles/" + props.userId);

  useEffect(() => {
    onValue(profileRef, (snapshot) => {
      if (snapshot.val() !== null) {
        // const displayname = snapshot.val().name;
        setProfileData(snapshot.val());
        // setName(displayname);
      } else {
        setProfileData({ bio: "", name: "" });
      }
    });
  }, []);

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    } else {
      console.log("profiles/" + props.userId);
    }
  }, [props.userId]);

  const onSubmit = () => {
    set(profileRef, { name: name, bio: bio }).catch((err) => console.log(err));
    setName("");
    setBio("");
  };

  return (
    <View style={styles.container}>
      {profiledata.name === "" ? (
        <>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Bio"
            style={styles.input}
            onChangeText={setBio}
            value={bio}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>{profiledata.name}</Text>
          <Text>{profiledata.bio}</Text>
        </>
      )}
    </View>
  );
};

export default Profile;
