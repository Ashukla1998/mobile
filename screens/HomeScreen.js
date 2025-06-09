import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import posts from '../data/posts';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
const stories = [
  {
    id: '1',
    name: 'Your Story',
    image: require('../assets/images/witcher.jpg'),
  },
  {
    id: '2',
    name: 'John',
    image: require('../assets/images/banner.jpg'),
  },
  {
    id: '3',
    name: 'Jane',
    image: require('../assets/images/Eiffel_Tower_Vertical.jpg'),
  },
  {
    id: '4',
    name: 'Anna',
    image: require('../assets/images/Eiffel_Tower_Vertical.jpg'),
  },
  {
    id: '5',
    name: 'Mike',
    image: require('../assets/images/witcher.jpg'),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="instagram" size={40} color="#0000FF" />
        <View style={styles.headerIcons}>
          <Icon name="heart-outline" size={24} color="#000" style={styles.icon} />
          <Icon name="paper-plane-outline" size={24} color="#000" />
        </View>
      </View>

      {/* Stories */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story) => (
            <View key={story.id} style={styles.story}>
              <Image source={story.image} style={styles.storyImage} />
              <Text style={styles.storyName}>{story.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 0,       // removed left padding
    paddingRight: 15,     // keep right padding
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 35,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    marginRight: 10,
  },

  storiesContainer: {
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  story: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#c13584',
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
});
