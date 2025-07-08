// import React, { useRef } from 'react';
// import { Animated, PanResponder, Text } from 'react-native';

// const DraggableEmoji = ({ emoji, startX, startY }) => {
//   const pan = useRef(new Animated.ValueXY({ x: startX, y: startY })).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x.__getValue(),
//           y: pan.y.__getValue(),
//         });
//         pan.setValue({ x: 0, y: 0 });
//       },
//       onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
//         useNativeDriver: false,
//       }),
//       onPanResponderRelease: () => {
//         pan.flattenOffset();
//       },
//     })
//   ).current;

//   return (
//     <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), { position: 'absolute' }]}>
//       <Text style={{ fontSize: 40 }}>{emoji}</Text>
//     </Animated.View>
//   );
// };

// export default DraggableEmoji;


import React, { useRef } from 'react';
import { Animated, PanResponder, Text } from 'react-native';

const DraggableEmoji = ({ emoji, startX, startY, bounds }) => {
  const pan = useRef(new Animated.ValueXY({ x: startX, y: startY })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gesture) => {
        if (bounds) {
          let newX = pan.x._offset + gesture.dx;
          let newY = pan.y._offset + gesture.dy;

          // Clamp within image bounds
          newX = Math.max(0, Math.min(newX, bounds.width - 40)); // Approx emoji width
          newY = Math.max(0, Math.min(newY, bounds.height - 40)); // Approx emoji height

          pan.setValue({ x: newX - pan.x._offset, y: newY - pan.y._offset });
        } else {
          pan.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), { position: 'absolute' }]}>
      <Text style={{ fontSize: 30 }}>{emoji}</Text>
    </Animated.View>
  );
};

export default DraggableEmoji;
