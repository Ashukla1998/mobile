import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import posts from '../data/posts';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import ActivityScreen from './ActivityScreen';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Search Bar with Notification Icon */}
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={width * 0.05}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="notifications-outline"
            size={scale(24)}
            color="#007AFF"
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Trending Topics */}
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>Trending Topics</Text>
        <FlatList
          data={['#ReactNative', '#Expo', '#UIUX', '#JavaScript', '#MobileDev', '#Frontend', '#TechNews']}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{ marginTop: 10 }}
          data={['#ReactNative', '#Expo', '#UIUX', '#JavaScript', '#MobileDev', '#Frontend', '#TechNews']}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </View>
          )}
        />
      </View>

      {/* Post List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postList}
      />

      {/* Modal for ActivityScreen */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ fontSize: scale(18), color: '#007AFF' }}>Close</Text>
          </TouchableOpacity>
          <ActivityScreen />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    borderRadius: 25,
    height: height * 0.06,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    justifyContent: 'space-between',
  },

  searchIcon: {
    marginRight: width * 0.02,
  },

  searchInput: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#333',
    marginRight: 10,
  },

  notificationIcon: {
    marginLeft: 10,
  },

  trendingContainer: {
    marginTop: 10,
    marginHorizontal: width * 0.04,
  },

  trendingTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  trendingItem: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },

  trendingText: {
    color: '#007AFF',
    fontWeight: '500',
  },

  postList: {
    paddingBottom: 100,
    paddingHorizontal: width * 0.025,
  },

  closeButton: {
    padding: scale(16),
    alignItems: 'flex-end',
  },
});
