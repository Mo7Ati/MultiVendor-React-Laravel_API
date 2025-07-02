import { Flex, Spin } from 'antd'
import React from 'react'

export const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // zIndex: 9999,
        }}>
            <Spin size="large" />
        </div>
    )
}
