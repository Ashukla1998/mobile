import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  'React Native',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Expo',
  'MongoDB',
  'Firebase',
  'Express.js',
  'Tailwind CSS',
  'GraphQL',
];

const Screen = ({ title }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFiltered([]);
    } else {
      const result = DATA.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(result);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.header}>{title}</Text>

      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      {query.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <Text style={styles.hintText}>Start typing to search...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  item: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
  hintText: { textAlign: 'center', color: '#aaa', marginTop: 20 },
});

export default function ScreenWrapper() {
  return <Screen title="Search" />;
}
