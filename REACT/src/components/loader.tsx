import { Flex, Spin } from 'antd'
import React from 'react'

export const Loader = () => {
    return (
        <Flex align="center" gap="middle" vertical>
            <Spin size="large" />
        </Flex>
    )
}
