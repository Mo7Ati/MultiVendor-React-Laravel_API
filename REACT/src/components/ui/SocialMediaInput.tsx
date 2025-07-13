import React from 'react';
import { Button, Col, Form, Input, Row, Space, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface SocialMediaItem {
  platform: string;
  url: string;
}

interface SocialMediaInputProps {
  value?: SocialMediaItem[];
  onChange: (value: SocialMediaItem[]) => void;
  label?: string;
  disabled?: boolean;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({
  value = [],
  onChange,
  label = 'Social Media',
  disabled = false
}) => {
  const { t } = useTranslation();


  const addSocialMedia = () => {
    const newSocialMedia = [...value, { platform: '', url: '' }];
    onChange(newSocialMedia);
  };

  const removeSocialMedia = (index: number) => {
    const newSocialMedia = value.filter((_, i) => i !== index);
    onChange(newSocialMedia);
  };

  const updateSocialMedia = (index: number, field: 'platform' | 'url', fieldValue: string) => {
    const newSocialMedia = value.map((item, i) =>
      i === index ? { ...item, [field]: fieldValue } : item
    );
    onChange(newSocialMedia);
  };
  // console.log(value[0].platform);
  return (
    <Form.List name="social_media">
      {(fields, { add, remove }) => (
        <>
          <div className="mb-4">
            <span className="font-medium mr-2">{label}:</span>
            <Button
              type="link"
              onClick={() => {
                addSocialMedia();
                add();
              }}
              icon={<PlusOutlined />}
              disabled={disabled}
            >
              {t('stores.form.addSocialMedia')}
            </Button>
          </div>

          {fields.map(({ key, name, ...restField }) => (
            <Card
              key={key}
              size="small"
              className="mb-2"
              extra={
                <Button
                  type="text"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    removeSocialMedia(name)
                    remove(key)
                  }}
                  disabled={disabled}
                  size="small"
                />
              }
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    {...restField}
                    name={[name, 'platform']}
                    label={t('stores.form.platform')}
                    rules={[{ required: true, message: t('stores.validation.platformRequired') }]}
                    className="mb-2"
                  >
                    <Input
                      onChange={(e) => { updateSocialMedia(name, 'platform', e.currentTarget.value) }}
                      placeholder={t('stores.form.platformPlaceholder')}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    {...restField}
                    name={[name, 'url']}
                    label={t('stores.form.url')}
                    rules={[{ required: true, type: 'url', message: t('stores.validation.urlRequired') }]}
                    className="mb-2"
                  >
                    <Input
                      onChange={(e) => { updateSocialMedia(name, 'url', e.currentTarget.value) }}
                      placeholder={t('stores.form.urlPlaceholder')}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-5 text-gray-500 border border-dashed border-gray-300 rounded-lg">
              {t('stores.form.noSocialMedia')}
            </div>
          )}
        </>
      )}
    </Form.List>


    // <div>
    //   <div className="mb-4">
    //     <span className="font-medium mr-2">{label}:</span>
    //     <Button
    //       type="link"
    //       onClick={addSocialMedia}
    //       icon={<PlusOutlined />}
    //       disabled={disabled}
    //       size="middle"
    //     >
    //       Add
    //     </Button>
    //   </div>

    //   {value.map((socialMedia, index) => (
    //     <Card
    //       key={index}
    //       size="small"
    //       className="mb-2"
    //       extra={
    //         <Button
    //           type="text"
    //           danger
    //           icon={<MinusCircleOutlined />}
    //           onClick={() => removeSocialMedia(index)}
    //           disabled={disabled}
    //           size="small"
    //         />
    //       }
    //     >
    //       <Row gutter={8}>
    //         <Col span={12}>
    //           <Form.Item
    //             // name={]}
    //             rules={[{ required: true, message: 'Required' }]}
    //             label={t('stores.form.platform')}
    //             className="mb-2"
    //           >
    //             <Input
    //               placeholder={t('stores.form.platformPlaceholder')}
    //               value={socialMedia.platform}
    //               onChange={(e) => updateSocialMedia(index, 'platform', e.target.value)}
    //               disabled={disabled}
    //             />
    //           </Form.Item>
    //         </Col>
    //         <Col span={12}>
    //           <Form.Item
    //             // name={value[index].platform}
    //             label={t('stores.form.url')}
    //             className="mb-2"
    //           >
    //             <Input
    //               placeholder={t('stores.form.urlPlaceholder')}
    //               value={socialMedia.url}
    //               onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
    //               disabled={disabled}
    //             />
    //           </Form.Item>
    //         </Col>
    //       </Row>
    //     </Card>
    //   ))}

    //   {value.length === 0 && (
    //     <div className="text-center py-5 text-gray-500 border border-dashed border-gray-300 rounded-lg">
    //       {t('stores.form.noSocialMedia')}
    //     </div>
    //   )}
    // </div>
  );
};

export default SocialMediaInput; 