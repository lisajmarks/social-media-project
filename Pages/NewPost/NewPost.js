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
  const [allPosts, setAllPosts] = useState([]);
  const db = getDatabase();
  const postListRef = ref(db, "posts/");
  const newPostRef = push(postListRef);

  useEffect(() => {
    onValue(postListRef, (snapshot) => {
      setAllPosts(snapshot.val());
    });
  }, []);

  const onPost = () => {
    setAlert(true);
    set(newPostRef, {
      text: newPost,
      posterId: props.userId,
    }).catch((err) => console.log(err));
    setNewPost("");
    const timer = setTimeout(() => {
      setAlert(false);
      clearTimeout(timer);
    }, 2000);
  };

  useEffect(() => {
    console.log("new post thing ====>", props.postId);
  }, [props.postId]);

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
      <FlatList
        data={allPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      {/* <FlatList
          data={allPosts}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} index={index} handleEdit={handleEdit} /> */}
    </View>
  );
};

export default NewPost;
