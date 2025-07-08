import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TextModal({ isVisible, onClose, onTextSubmit }) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim()) {
      onTextSubmit(inputText);
      setInputText('');
      onClose();
    }
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.label}>Enter Text:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#666' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2a2a2c',
    padding: 10,
    borderRadius: 8,
    color: 'white',
  },
  buttons: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
  },
});
