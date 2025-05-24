import styled from "styled-components/native";
import { Pressable, Text } from "react-native";
import { theme } from "@src/theme";

// CustomButton için props tanımı
interface CustomButtonProps {
  color?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  borderWidth?: string;
  borderColor?: string;
  textColor?: string;
  onPress: () => void;
}

export const InputsContainer = styled.View`
  margin-top: 1px;
  width: 100%;
  
  align-items: center;
  margin-left: 5px;
  margin-horizontal: 10px;
  margin-right: 5px;
  background-color: #F1F1FF;
  gap: 12px;
`;

export const BottomContainer = styled.View`
  height: 10%;
  width: 70%;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { theme: typeof theme }) => props.theme.colors.brand.primary};
`;

export const CustomButton = styled(Pressable) <CustomButtonProps>`
  background-color: ${({ color }: CustomButtonProps) => color || "#6200EE"};
  padding: ${({ padding }: CustomButtonProps) => padding || "15px"};
  border-radius: ${({ borderRadius }: CustomButtonProps) => borderRadius || "20px"};
  width: ${({ width }: CustomButtonProps) => width || "95%"};
   height: ${({ height }: CustomButtonProps) => height || "50px"}; 
  border-width: ${({ borderWidth }: CustomButtonProps) => borderWidth || "0px"};
  border-color: ${({ borderColor }: CustomButtonProps) => borderColor || "transparent"};
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const ButtonText = styled(Text) <{ textColor?: string }>`
  color: ${(props: { textColor?: string }) => props.textColor || "#FFF"};
  font-size: 16px;
  font-family: "PP_Regular";
    justify-content: center;
  align-self: center;
`;

interface TopContainerProps {
  backgroundColor?: string;
  theme: typeof theme;
}

export const TopContainer = styled.View<TopContainerProps>`
  height: 70%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props: TopContainerProps) => props.backgroundColor || props.theme.colors.brand.primary};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-left: -10px;
  margin-right: -10px;
`;
