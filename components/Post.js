import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Post({ post }) {
  return (
    <View style={styles.card}>
      {/* Header: User Info */}
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Icon name="ellipsis-horizontal" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof post.image === 'string' ? { uri: post.image } : post.image}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>


      {/* Action Icons */}
      <View style={styles.actions}>
        <View style={styles.leftIcons}>
          <Icon name="heart-outline" size={24} color="#000" style={styles.icon} />
          <Icon name="chatbubble-outline" size={24} color="#000" style={styles.icon} />
          <Icon name="paper-plane-outline" size={24} color="#000" />
        </View>
        <Icon name="bookmark-outline" size={24} color="#000" />
      </View>

      {/* Likes and Caption */}
      <Text style={styles.likes}>{post.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.captionUsername}>{post.username} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    backgroundColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    fontSize: 14,
    marginTop: -5,
  },
  caption: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    fontSize: 13,
    color: '#333',
  },
  captionUsername: {
    fontWeight: '600',
  },
  imageContainer: {
  width: '100%',
  height: 400, // fixed height - adjust as needed
  backgroundColor: '#ccc',
},

postImage: {
  width: '100%',
  height: '100%',
},


});
