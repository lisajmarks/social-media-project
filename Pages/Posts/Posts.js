import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const db = getDatabase();
  const postListRef = ref(db, "posts/");
  const newPostRef = push(postListRef);

  useEffect(() => {
    onValue(postListRef, (snapshot) => {
      const data = snapshot.val();
      let result = Object.keys(data).map((key) => data[key]);
      setAllPosts(result);
    });
  }, []);
  console.log(allPosts);

  return (
    <View>
      <FlatList
        data={allPosts}
        renderItem={({ item, index }) => (
          <Text key={index}>
            {item.name}'s post:
            {item.text}
          </Text>
        )}
      />
    </View>
  );
};

export default Posts;
