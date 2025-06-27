import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface SocialMediaInputProps {
  name?: string;
  label?: string;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ name = 'social_Media', label = 'Social Media' }) => {
  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'platform']}
                  rules={[{ required: true, message: 'Platform is required' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input placeholder="Platform (e.g. Facebook)" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'url']}
                  rules={[{ required: true, type: 'url', message: 'Valid URL is required' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input placeholder="URL (e.g. https://facebook.com/yourpage)" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Social Media
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default SocialMediaInput; 