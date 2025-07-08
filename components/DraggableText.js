import React, { useRef } from 'react';
import { Animated, PanResponder, Text } from 'react-native';

const DraggableText = ({ text, startX, startY, bounds }) => {
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

          // Clamp to image bounds
          newX = Math.max(0, Math.min(newX, bounds.width - 100)); // 100 = estimated text width
          newY = Math.max(0, Math.min(newY, bounds.height - 40)); // 40 = estimated text height

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
      <Text style={{ fontSize: 24, color: 'green', fontWeight: 'bold' }}>{text}</Text>
    </Animated.View>
  );
};

export default DraggableText;
