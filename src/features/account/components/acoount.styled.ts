import styled from "styled-components/native";
import { Pressable, Text } from "react-native";

// CustomButton için props tanımı
interface CustomButtonProps {
  color?: string; // Buton arkaplan rengi
  padding?: string; // İç dolgu
  borderRadius?: string; // Kenar yuvarlaklığı
  width?: string; // Genişlik
  borderWidth?: string; // Kenarlık kalınlığı
  borderColor?: string; // Kenarlık rengi
  textColor?: string; // Metin rengi
  onPress: () => void; // Tıklama işlemi
}

// Styled Pressable
export const CustomButton = styled(Pressable) <CustomButtonProps>`
  background-color: ${(props) => props.color || "#6200EE"};
  padding: ${(props) => props.padding || "15px"};
  border-radius: ${(props) => props.borderRadius || "20px"};
  width: ${(props) => props.width || "100%"};
  border-width: ${(props) => props.borderWidth || "0px"};
  border-color: ${(props) => props.borderColor || "transparent"};
  align-items: center;
  justify-content: center;
`;

// Button Text
export const ButtonText = styled(Text) <{ textColor?: string }>`
  color: ${(props) => props.textColor || "#FFF"};
  font-size: 16px;
  font-family: "PP_Regular";
`;

export const TopContainer = styled.View`
  height: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.text.inverse};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-horizontal: -10px;
`;

export const BottomContainer = styled.View`
  height: 10%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
