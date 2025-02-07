import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { StyledButton } from "@src/components/main.style";

// ✅ Props tanımla
interface UpdateButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ onPress, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyledButton
            isHovered={isHovered} // ✅ Bu satır eksikti, ekledik!
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            onPress={onPress}
        >
            {children}
        </StyledButton>
    );
};

export default UpdateButton;
