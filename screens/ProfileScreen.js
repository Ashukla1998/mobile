import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.avatar}
        />
      </View>

      {/* Name and Username */}
      <Text style={styles.name}>Jane Doe</Text>
      <Text style={styles.username}>@janedoe</Text>

      {/* Bio */}
      <Text style={styles.bio}>
        Designer, traveler, and coffee enthusiast. Exploring the world one pixel at a time.
      </Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3.4K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>180</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.followButton]}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingTop: 60,
    alignItems: 'center',
  },
  avatarContainer: {
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 75,
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  username: {
    fontSize: 16,
    color: '#777',
    marginVertical: 6,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#fff',
  },
  followButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
});

export default ProfileScreen;
