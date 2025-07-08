// import { Image, StyleSheet, View, Dimensions } from 'react-native';

// const ImageViewer = ({ selectedImage, children }) => {
//   const screenWidth = Dimensions.get('window').width;
//   const imageWidth = screenWidth * 0.9;
//   const imageHeight = imageWidth * (420 / 320);

//   return (
//     <View style={[styles.container, { width: imageWidth, height: imageHeight }]}>
//       {selectedImage ? (
//         <Image
//           source={{ uri: selectedImage }}
//           style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
//         />
//       ) : (
//         <View style={[styles.placeholder, { width: imageWidth, height: imageHeight }]} />
//       )}
//       <View style={styles.overlay}>{children}</View>
//     </View>
//   );
// };

// export default ImageViewer;

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   placeholder: {
//     backgroundColor: '#464C55',
//     borderRadius: 12,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 10,
//     pointerEvents: 'box-none',
//   },
// });


// ImageViewer.js
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { useState } from 'react';

const ImageViewer = ({ selectedImage, children, onImageLayout }) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9;
  const imageHeight = imageWidth * (420 / 320);

  return (
    <View style={[styles.container, { width: imageWidth, height: imageHeight }]}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
        />
      ) : (
        <View
          style={[styles.placeholder, { width: imageWidth, height: imageHeight }]}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            onImageLayout && onImageLayout(layout); // send dimensions
          }}
        />
      )}
      <View style={styles.overlay}>{children}</View>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: '#464C55',
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    pointerEvents: 'box-none',
  },
});
