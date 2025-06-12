import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have vector icons installed

const notifications = [
  { id: '1', type: 'like', message: 'John liked your post', time: '2h ago' },
  { id: '2', type: 'comment', message: 'Anna commented: Nice photo!', time: '3h ago' },
  { id: '3', type: 'follow', message: 'Mike started following you', time: '5h ago' },
  { id: '4', type: 'mention', message: 'Sara mentioned you in a comment', time: '1d ago' },
];

const ActivityScreen = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Ionicons name="heart" size={24} color="#e0245e" />;
      case 'comment':
        return <Ionicons name="chatbubble" size={24} color="#1da1f2" />;
      case 'follow':
        return <Ionicons name="person-add" size={24} color="#17bf63" />;
      case 'mention':
        return <Ionicons name="at" size={24} color="#ffad1f" />;
      default:
        return <Ionicons name="notifications" size={24} color="#666" />;
    }
  };

  const NotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>{getIcon(item.type)}</View>
      <View style={styles.textContainer}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', paddingHorizontal: 20, paddingTop: 40 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});

export default ActivityScreen;
