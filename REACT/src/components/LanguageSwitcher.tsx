import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '@/providers/LanguageProvider';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

const LanguageSwitcher: React.FC = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const languageOptions: MenuProps['items'] = [
        {
            key: 'en',
            label: (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">🇺🇸</span>
                    <span>{t('settings.english')}</span>
                </div>
            ),
            onClick: () => changeLanguage('en'),
        },
        {
            key: 'ar',
            label: (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">🇸🇦</span>
                    <span>{t('settings.arabic')}</span>
                </div>
            ),
            onClick: () => changeLanguage('ar'),
        },
    ];

    const getCurrentLanguageLabel = () => {
        return currentLanguage === 'en' ? '🇺🇸 EN' : '🇸🇦 AR';
    };

    return (
        <Dropdown
            menu={{ items: languageOptions }}
            placement="bottomRight"
            trigger={['click']}
        >
            <Button
                type="text"
                icon={<GlobalOutlined />}
                className="flex items-center gap-2"
            >
                <span className="text-sm font-medium">{getCurrentLanguageLabel()}</span>
            </Button>
        </Dropdown>
    );
};

export default LanguageSwitcher; 