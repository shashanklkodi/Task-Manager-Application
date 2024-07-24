import React, { useState } from 'react';
import { List, Typography, Empty } from 'antd';
import TaskForm from '../TaskForm/TaskForm';
import TaskItem from '../TaskItem/TaskItem';
import styles from './style.module.css';

const { Title } = Typography;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: nextId }]);
    setNextId(nextId + 1);
  };

  const removeTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  return (
    <div className={styles.taskListContainer}>
      <Title level={2} className={styles.taskListTitle}>My Tasks</Title>
      <TaskForm addTask={addTask} />
      <List
        className={styles.taskList}
        dataSource={tasks}
        renderItem={task => (
          <TaskItem key={task.id} task={task} removeTask={removeTask} editTask={editTask} />
        )}
        locale={{ emptyText: <Empty description="No tasks available. Add a task to get started!" /> }}
      />
    </div>
  );
}

export default TaskList;
