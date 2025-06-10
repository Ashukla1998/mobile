import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';

const windowWidth = Dimensions.get('window').width;

export default function UploadMedia() {
  const [media, setMedia] = useState(null);

  const isVideo =
    media &&
    (media.type === 'video' || media.uri.match(/\.(mp4|mov|avi|webm)$/i));

  const player = useVideoPlayer(
    isVideo
      ? {
          source: { uri: media.uri },
          isLooping: true,
          useNativeControls: true,
        }
      : null
  );

  // Permissions
  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to use camera is required!');
      return false;
    }
    return true;
  };

  // Pick media from gallery
  const pickMedia = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:'All',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setMedia(result.assets[0]);
    }
  };

  // Capture image from camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setMedia(result.assets[0]);
    }
  };

  // Record video from camera
  const recordVideo = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Videos',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setMedia(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image or Video</Text>

      <View style={styles.buttonContainer}>
        <Button title="Pick from Gallery" onPress={pickMedia} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Record Video" onPress={recordVideo} />
      </View>

      {media && (
        <View style={styles.preview}>
          {media.type === 'image' || media.uri.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <Image
              source={{ uri: media.uri }}
              style={styles.media}
              resizeMode="contain"
            />
          ) : player ? (
            <VideoView
              style={styles.media}
              player={player}
              resizeMode="contain"
            />
          ) : (
            <Text>Unable to load video</Text>
          )}
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  preview: {
    marginTop: 30,
    alignItems: 'center',
  },
  media: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    borderRadius: 12,
    backgroundColor: '#000',
  },
});
