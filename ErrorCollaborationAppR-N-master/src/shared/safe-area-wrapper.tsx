
import React, { Children, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '../../utils/theme'

type SafeAreaWraperProps = {
    children: ReactNode
}

const SafeAreaWraper = ({ children }: SafeAreaWraperProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.zinc400,
            }}
        >
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaWraper