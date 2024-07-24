import React, { useState } from 'react';
import { List, Input, Button, Space, Card } from 'antd';
import styles from './style.module.css';

const { TextArea } = Input;

const TaskItem = ({ task, removeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleEdit = () => {
    editTask(task.id, { ...task, title: newTitle, description: newDescription });
    setIsEditing(false);
  };

  return (
    <List.Item className={styles.taskItem}>
      {isEditing ? (
        <div className={styles.taskItemEdit}>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task Title"
          />
          <TextArea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
          />
          <Space>
            <Button type="primary" onClick={handleEdit}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Space>
        </div>
      ) : (
        <Card className={styles.taskItemCard}>
          <Card.Meta
            title={task.title}
            description={task.description || 'No description'}
          />
          <div className={styles.taskItemActions}>
            <Button type="link" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button type="link" danger onClick={() => removeTask(task.id)}>Delete</Button>
          </div>
        </Card>
      )}
    </List.Item>
  );
}

export default TaskItem;
