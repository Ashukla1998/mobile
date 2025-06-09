import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

export default function UploadMedia() {
  const [media, setMedia] = useState(null);

  const pickMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  const takeMedia = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to use camera is required!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image or Video (Responsive)</Text>

      <View style={styles.buttonContainer}>
        <Button title="Pick from Gallery" onPress={pickMedia} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Take Photo or Video" onPress={takeMedia} />
      </View>

      {media && (
        <View style={styles.preview}>
          {media.type === 'image' ? (
            <Image
              source={{ uri: media.uri }}
              style={styles.media}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.videoText}>Video selected: {media.uri.split('/').pop()}</Text>
          )}
        </View>
      )}
    </View>
  );
}

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
    width: windowWidth * 0.8, // 80% of screen width
    height: windowWidth * 0.8, // keep square aspect ratio
    borderRadius: 12,
  },
  videoText: {
    fontSize: 16,
    color: '#444',
  },
});
