import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import styles from './style.module.css';

const { TextArea } = Input;

const TaskForm = ({ addTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    addTask({ title: values.title, description: values.description });
    form.resetFields();
  };

  return (
    <Form 
      form={form}
      onFinish={onFinish}
      className={styles.taskForm}
      layout="vertical"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the task title!' }]}
        label="Task Title"
      >
        <Input placeholder="Task title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Task Description (optional)"
      >
        <TextArea placeholder="Task description (optional)" rows={4} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">Add Task</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default TaskForm;
