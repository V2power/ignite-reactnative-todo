import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const existingTask = tasks.map(task => ({ ...task }));
    const foundExistingTask = existingTask.find(item => item.title === newTaskTitle);
    
    if (foundExistingTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome.',
        [
          {text: 'OK', onPress: () => console.log('OK button clicked')},
        ],
        { 
          cancelable: true 
        }
      )
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'NÃO'},
        {text: 'SIM', onPress: () => {
          setTasks(oldState => oldState.filter(
            task => task.id !== id
          ));
        }},
      ],
      {
        cancelable: false
      }
    )
  }

  function handleEditTask(taskId: number, taskNewTile: string) {

    const updatedTaskName = tasks.map(task => ({ ...task }));
    const foundItem = updatedTaskName.find(item => item.id === taskId);

    if (!foundItem) {
      return;
    }

    foundItem.title = taskNewTile
    setTasks(updatedTaskName);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})