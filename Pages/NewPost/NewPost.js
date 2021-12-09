import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";

const NewPost = (props) => {
  const [newPost, setNewPost] = useState("");
  const [alert, setAlert] = useState(false);
  const [postAlert, setPostAlert] = useState(false);
  const [firstname, setFirstName] = useState("");

  const db = getDatabase();
  const postListRef = ref(db, "posts/");
  const newPostRef = push(postListRef);
  const profileRef = ref(db, "profiles/" + props.userId);

  const onPost = () => {
    if (firstname === "") {
      setPostAlert(true);
    } else {
      setAlert(true);
      set(newPostRef, {
        name: firstname,
        text: newPost,
        posterId: props.userId,
      }).catch((err) => console.log(err));
      setNewPost("");
      const timer = setTimeout(() => {
        setAlert(false);
        clearTimeout(timer);
      }, 2000);
    }
  };

  useEffect(() => {
    onValue(profileRef, (snapshot) => {
      console.log("userId >>> ", props.userId);
      if (snapshot.val() !== null) {
        console.log("Value from database >>> ", snapshot.val());
        setFirstName(snapshot.val().name);
      } else {
        setFirstName("");
      }
    });
  }, [props.userId]);

  return (
    <View>
      <Text>Hello from Create New Post</Text>
      <TextInput
        placeholder="Your Post Here"
        value={newPost}
        onChangeText={setNewPost}
      />
      <TouchableOpacity onPress={onPost}>
        <Text>Post</Text>
      </TouchableOpacity>
      {alert ? <Text>You just made a POST</Text> : null}
      {postAlert ? <Text> Please create a profile </Text> : null}
    </View>
  );
};

export default NewPost;
