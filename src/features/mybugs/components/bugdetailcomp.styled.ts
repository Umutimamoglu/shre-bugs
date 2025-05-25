import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
   background-color: #F5F5FF;
  padding: 16px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  color: black;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

export const InputField = styled.TextInput`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

interface ToggleButtonProps {
  isFixed: boolean;
}

export const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
  background-color: ${({ isFixed }) => (isFixed ? "green" : "red")};
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ToggleButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;



export const UpdateButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;
