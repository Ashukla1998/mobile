import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const emojis = ['🔥', '❤️', '😂', '😎', '🥳', '🌟'];

const EmojiModal = ({ isVisible, onClose, onEmojiSelected }) => (
  <Modal visible={isVisible} transparent animationType="slide">
    <View style={styles.modal}>
      <Text style={styles.title}>Select an Emoji</Text>
      <View style={styles.emojiList}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => onEmojiSelected(emoji)}>
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default EmojiModal;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#333',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  title: { color: 'white', fontSize: 18, marginBottom: 10 },
  emojiList: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  emoji: { fontSize: 30 },
  close: { color: 'lightgray', textAlign: 'center', paddingTop: 10 },
});
