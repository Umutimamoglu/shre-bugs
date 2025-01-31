import styled from "styled-components/native";
import { Pressable, Text } from "react-native";
import { theme } from "@src/theme";

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

export const InputsContainer = styled.View`
  margin-top:15;
  width: 100%;
  align-items: center;
  margin-left: 5px;
  margin-horizontal: 10px;
  margin-right: 5px;
   background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const BottomContainer = styled.View`
  height: 10%;
  width: 70%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;
export const CustomButton = styled(Pressable) <CustomButtonProps>`
  background-color: ${(props) => props.color || "#6200EE"};
  padding: ${(props) => props.padding || "15px"};
  border-radius: ${(props) => props.borderRadius || "20px"};
  width: ${(props) => props.width || "100%"};
  border-width: ${(props) => props.borderWidth || "0px"};
  border-color: ${(props) => props.borderColor || "transparent"};
  align-items: center;
  justify-content: center;
  align-self: center; /* Düğmeyi yatayda ortalar */
`;

export const ButtonText = styled(Text) <{ textColor?: string }>`
  color: ${(props) => props.textColor || "#FFF"};
  font-size: 16px;
  font-family: "PP_Regular";
`;
interface TopContainerProps {
  backgroundColor?: string; // Renk için opsiyonel bir prop
}

export const TopContainer = styled.View<TopContainerProps>`
  height: 70%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.backgroundColor || props.theme.colors.brand.primary};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-left: -10px;
  margin-right: -10px;
`;