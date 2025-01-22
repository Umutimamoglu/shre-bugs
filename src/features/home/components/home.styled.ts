import styled from "styled-components/native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


interface HomeMainContainerProps {
    color?: string;
    padding?: string;
    alignItems?: string;
    marginTop?: string;
}

export const HomeMainContainer = styled.View<HomeMainContainerProps>`
    flex: 1;
    padding: ${(props) => props.padding || "16px"};
    background-color: ${(props) =>
        props.color || props.theme.colors.bg.primary || "#f8f8f8"};
    align-items: ${(props) => props.alignItems || "center"};
    margin-top: ${(props) => props.marginTop || "0px"};
`;


interface CardContainerProps {
    width?: string;
    height?: string;
    backgroundColor?: string;
    marginTop?: string;
    borderRadius?: string;
    padding?: string;
    shadowColor?: string;
    shadowOffsetWidth?: number;
    shadowOffsetHeight?: number;
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
}

export const CardContainer = styled.View<CardContainerProps>`
 align-items: center;
    justify-content: center;
    gap: 12px;
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "100%"};
    background-color: ${(props) => props.backgroundColor || "#fff"};
    margin-top: ${(props) => props.marginTop || "0px"};
    border-radius: ${(props) => props.borderRadius || "10px"};
    padding: ${(props) => props.padding || "16px"};
    shadow-color: ${(props) => props.shadowColor || "#000"};
    shadow-offset: ${(props) =>
        `${props.shadowOffsetWidth || 0}px ${props.shadowOffsetHeight || 2}px`};
    shadow-opacity: ${(props) => props.shadowOpacity || 0.2};
    shadow-radius: ${(props) => props.shadowRadius || 4}px;
    elevation: ${(props) => props.elevation || 5};
`;

export const TitleText = styled.Text`
  shadow-opacity: 0.1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const ImagePickerContainer = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

export const ImagePickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #d3d3d3;
  border-radius: 5px;
`;


// Dropdown kapsayıcı (View)
export const DropdownContainer = styled.View`
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 8px;
  margin-top:15;
`;
// Dropdown Picker
export const StyledDropDownPicker = styled(DropDownPicker).attrs({
    placeholderStyle: {
        color: "#999",
    },
    labelStyle: {
        fontSize: 16,
        color: "#000",
    },
})`
    border-width: 1px;
    border-color: #d3d3d3;
    border-radius: 8px;
    padding-horizontal: 10px;
    height: 40px;
    background-color: #faf7f6;
    width: 100%; /* Tüm genişlik */
    
  `;

// Dropdown Öğesi
export const DropdownItem = styled.View`
    padding: 10px;
    background-color: #faf9f8;
    border-color: gray;
    border-width: 1px;
    width: 100%; /* Tüm genişlik */
    
  `;

// Placeholder Metni
export const PlaceholderText = styled.Text`
    color: #999;
  `;

// Etiket Metni
export const LabelText = styled.Text`
    font-size: 16px;
    color: #000;
  `;

// Giriş Kutusu (Input)
export const TextInputStyled = styled.TextInput`
    font-size: 16px; /* Dropdown'daki font boyutuyla aynı */
    padding: 12px; /* Dropdown'daki padding ile aynı */
    background-color: #faf7f6; /* Dropdown'un arka plan rengi */
    border-color: #d3d3d3; /* Dropdown'un border rengi */
    border-width: 1px; /* Border genişliği */
    border-radius: 8px; /* Dropdown'daki köşe yuvarlama */
    width: 100%; /* Genişlik tam ekran boyunca */
    height: 40px; /* Dropdown'la uyumlu yükseklik */
    color: #000; /* Yazı rengi */
    margin-top: 15px; /* Yukarıdaki dropdown'la uyumlu aralık */
`;

// Renk Konteyneri
export const ColorPickerContainer = styled.View`
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 16px;
    width: 100%; /* Konteyner genişliği */
      margin-top:20;
     height: 20%;

  `;

// Buton
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: #e57373;
    width: 80%; /* Buton genişliği yüzde bazında */
    height: 6%; /* Buton yüksekliği yüzde bazında */
    border-radius: 20px;
    align-items: center;
    justify-content: center;
  `;

// Buton Yazısı
export const ButtonText = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  `;



// Seçilen renk etiketi
export const ColorLabel = styled.View<{ backgroundColor: string }>`
border-radius: 5px;
padding: 4px 8px;
align-self: flex-start;
background-color: ${(props) => props.backgroundColor};

`;

export const ColorLabelText = styled.Text`
color: #fff;
font-weight: bold;
font-size:16;
`;

// Renk dairelerinin kapsayıcısı
export const ColorsContainer = styled.View`
flex-direction: row;
justify-content: space-evenly;
margin-top: 14px;
`;

// Renk daireleri
export const ColorCircle = styled.View<{ backgroundColor: string; isSelected: boolean }>`
width: 24px;
height: 24px;
border-radius: 12px;
background-color: ${(props) => props.backgroundColor};
border-width: ${(props) => (props.isSelected ? "2px" : "0px")};
border-color: #000;
`;



interface StyledButtonProps {
    backgroundColor?: string;
    pressedBackgroundColor?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
}

interface ButtonTextProps {
    color?: string;
    fontSize?: string;
}

export const ButtonContainer = styled.View`
    align-items: center;
    margin-top: 16px;
  `;

export const StyledPressableButton = styled.Pressable<StyledButtonProps>`
    background-color: ${(props) => props.backgroundColor || "#C8848E"};
    width: ${(props) => props.width || "80%"};
    height: ${(props) => props.height || "50px"};
    border-radius: ${(props) => props.borderRadius || "20px"};
    justify-content: center;
    align-items: center;
  `;


interface StyledButtonProps {
    backgroundColor?: string;
    pressedBackgroundColor?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
}

interface ButtonTextProps {
    color?: string;
    fontSize?: string;
}


