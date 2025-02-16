import { ActivityIndicator } from "react-native"

import { Box } from "../../utils/theme"
import SafeAreaWraper from "./safe-area-wrapper"
import React from "react"


const Loader = () => {
    return (
        <SafeAreaWraper>
            <Box flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator />
            </Box>
        </SafeAreaWraper>
    )
}

export default Loader