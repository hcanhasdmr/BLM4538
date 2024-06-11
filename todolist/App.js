import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { appStyles as styles } from "./styles";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: null, text: "", date: "", priority: "" });
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("");

  const handleAddTaskPress = () => {
    if (editedText.trim() !== "" && editedDate.trim() !== "" && editedPriority.trim() !== "") {
      if (editedTask.id !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === editedTask.id
            ? { ...task, text: editedText, date: editedDate, priority: editedPriority }
            : task
        );
        setTasks(updatedTasks);
        setEditedTask({ id: null, text: "", date: "", priority: "" });
      } else {
        const newTask = { id: Date.now(), text: editedText, date: editedDate, priority: editedPriority };
        setTasks([newTask, ...tasks]);
      }
      setEditedText("");
      setEditedDate("");
      setEditedPriority("");
    } else {
      Alert.alert("Error", "Please enter task, date, and priority.");
    }
  };

  const handleDeleteTaskPress = (taskId, taskName) => {
    Alert.alert(
      `Confirm Delete ${taskName}`,
      `Are you sure you want to delete ${taskName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const startEditingTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit);
    setEditedText(taskToEdit.text);
    setEditedDate(taskToEdit.date);
    setEditedPriority(taskToEdit.priority);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          Enter your tasks, their dates, and priority below, then press the "Add" button to
          add.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Task Here"
          onChangeText={setEditedText}
          value={editedText}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Task Date (e.g., DD/MM/YYYY)"
          onChangeText={setEditedDate}
          value={editedDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Task Priority (e.g., 1, 2, 3)"
          onChangeText={setEditedPriority}
          value={editedPriority}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleAddTaskPress}
        >
          <Text style={styles.buttonText}>
            {editedTask.id !== null ? "Edit Task" : "Add Task"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => startEditingTask(item.id)}
              onLongPress={() => handleDeleteTaskPress(item.id, item.text)}
            >
              <View style={styles.taskContainer}>
                <Text style={styles.taskText}>{item.text}</Text>
                <Text style={styles.taskDate}>{item.date}</Text>
                <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
                <TouchableOpacity
                  style={styles.taskDelete}
                  onPress={() => handleDeleteTaskPress(item.id, item.text)}
                >
                  <Text style={styles.taskDeleteText}>Delete Task</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
