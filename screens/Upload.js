// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useVideoPlayer, VideoView } from 'expo-video';

// const windowWidth = Dimensions.get('window').width;

// export default function UploadMedia() {
//   const [media, setMedia] = useState(null);

//   const isVideo =
//     media &&
//     (media.type === 'video' || media.uri.match(/\.(mp4|mov|avi|webm)$/i));

//   const player = useVideoPlayer(
//     isVideo
//       ? {
//           source: { uri: media.uri },
//           isLooping: true,
//           useNativeControls: true,
//         }
//       : null
//   );

//   // Permissions
//   const requestMediaLibraryPermissions = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return false;
//     }
//     return true;
//   };

//   const requestCameraPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to use camera is required!');
//       return false;
//     }
//     return true;
//   };

//   // Pick media from gallery
//   const pickMedia = async () => {
//     const hasPermission = await requestMediaLibraryPermissions();
//     if (!hasPermission) return;

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes:'All',
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets?.length > 0) {
//       setMedia(result.assets[0]);
//     }
//   };

//   // Capture image from camera
//   const takePhoto = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: 'Images',
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets?.length > 0) {
//       setMedia(result.assets[0]);
//     }
//   };

//   // Record video from camera
//   const recordVideo = async () => {
//     const hasPermission = await requestCameraPermissions();
//     if (!hasPermission) return;

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: 'Videos',
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets?.length > 0) {
//       setMedia(result.assets[0]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload Image or Video</Text>

//       <View style={styles.buttonContainer}>
//         <Button title="Pick from Gallery" onPress={pickMedia} />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Take Photo" onPress={takePhoto} />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Record Video" onPress={recordVideo} />
//       </View>

//       {media && (
//         <View style={styles.preview}>
//           {media.type === 'image' || media.uri.match(/\.(jpg|jpeg|png|gif)$/i) ? (
//             <Image
//               source={{ uri: media.uri }}
//               style={styles.media}
//               resizeMode="contain"
//             />
//           ) : player ? (
//             <VideoView
//               style={styles.media}
//               player={player}
//               resizeMode="contain"
//             />
//           ) : (
//             <Text>Unable to load video</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginVertical: 10,
//   },
//   preview: {
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   media: {
//     width: windowWidth * 0.8,
//     height: windowWidth * 0.8,
//     borderRadius: 12,
//     backgroundColor: '#000',
//   },
// });
// app/index.js

import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import EmojiModal from '../components/EmojiModal';
import ImageViewer from '../components/ImageViewer';
import DraggableEmoji from '../components/DraggableEmoji';
import CirculeButton from '../components/CirculeButton';

export default function HomeScreen() {
  const [image, setImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emojiList, setEmojiList] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowOptions(true);
    } else {
      Alert.alert('No image selected.');
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowOptions(true);
    } else {
      Alert.alert('No photo taken.');
    }
  };

  const handleEmojiSelected = (emoji) => {
    const screenWidth = Dimensions.get('window').width;
    const imageWidth = screenWidth * 0.9;
    const imageHeight = imageWidth * (420 / 320);

    setEmojiList(prev => [...prev, {
      emoji,
      x: imageWidth / 2 - 20,
      y: imageHeight / 2 - 20,
    }]);

    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imageSource={require('../assets/images/placeholder.jpg')} selectedImage={image}>
          {emojiList.map((item, index) => (
            <DraggableEmoji key={index} emoji={item.emoji} startX={item.x} startY={item.y} />
          ))}
        </ImageViewer>
      </View>

      <EmojiModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onEmojiSelected={handleEmojiSelected}
      />

      {showOptions ? (
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setEmojiList([])}>
            <MaterialIcons name="refresh" size={40} color="#007AFF" />
            <Text style={styles.iconLabel}>Reset</Text>
          </TouchableOpacity>

          <CirculeButton onPress={() => setIsModalVisible(true)} />

          <TouchableOpacity style={styles.iconButton} onPress={() => alert('Share pressed')}>
            <MaterialIcons name="share" size={28} color="#007AFF" />
            <Text style={styles.iconLabel}>Share</Text>
          </TouchableOpacity>
        </View>

      ) : (
        <View style={styles.optionsColumn}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 50 },
  imageContainer: { marginBottom: 20 },
  optionsColumn: { alignItems: 'center', gap: 15 },
  optionsRow: { flexDirection: 'row', gap: 20 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontSize: 16 },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconLabel: {
    color: '#007AFF',
    fontSize: 14,
  },

});
