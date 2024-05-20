import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { collection, addDoc, db, deleteDoc, doc } from './firebaseConfig'
import { getDocs } from 'firebase/firestore';
export default function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(async() => {
    readData();
  }, [])

  const handleAddNote = async () => {
    if (newNote.trim() !== ''){
      try {
        const docRef = await addDoc(collection(db, "notes"), {
          text: newNote,
          created: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        setNewNote('');
        readData();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    else {
      alert('Note cannot be empty');
      return;
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      console.log("Document deleted with ID: ", id);
      readData();
    } catch (error) {
      console.error("Error deleting document: ", e);
    }
  };


  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(notesList)
      setNotes(notesList);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  }

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteItem}>
        <Text style={styles.newNote}>{item.text}</Text>
        <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new note"
        value={newNote}
        onChangeText={setNewNote}
      />
      <TouchableOpacity onPress={handleAddNote} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        style={styles.notesList}
        contentContainerStyle={styles.notesListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  notesList: {
    width: '100%',
  },
  notesListContent: {
    paddingBottom: 20,
  },
  noteCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newNote: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
});
