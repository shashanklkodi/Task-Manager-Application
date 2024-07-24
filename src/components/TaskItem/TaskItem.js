import React, { useState } from 'react';
import { List, Input, Button, Space, Card, Tag, Select } from 'antd';
import styles from './style.module.css';

const { TextArea } = Input;
const { Option } = Select;

const priorityColors = {
  low: 'green',
  medium: 'orange',
  high: 'red'
};

const TaskItem = ({ task, removeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState(task.priority);

  const handleReset = () => {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewPriority(task.priority);
    setIsEditing(false);
  };

  const handleEdit = () => {
    editTask(task.id, { ...task, title: newTitle, description: newDescription, priority: newPriority });
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
            className={styles.inputField}
          />
          <TextArea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
            rows={4}
            className={styles.inputField}
          />
          <Select
            value={newPriority}
            onChange={(value) => setNewPriority(value)}
            placeholder="Select Priority"
            className={styles.prioritySelect}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
          <Space className={styles.actionButtons}>
            <Button type="primary" onClick={handleEdit}>Save</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Space>
        </div>
      ) : (
        <Card className={styles.taskItemCard} hoverable>
          <Card.Meta
            title={
              <>
                {task.title}
                <Tag color={priorityColors[task.priority]} className={styles.priorityTag}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Tag>
              </>
            }
            description={task.description || 'No description'}
            className={styles.cardMeta}
          />
          <div className={styles.taskItemActions}>
            <Button type="link" onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</Button>
            <Button type="link" danger onClick={() => removeTask(task.id)} className={styles.deleteButton}>Delete</Button>
          </div>
        </Card>
      )}
    </List.Item>
  );
}

export default TaskItem;
