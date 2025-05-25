import styled from "styled-components/native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { theme } from "@src/theme";

// ✳️ Prop arayüzleri
interface SafeAreaProps extends SafeAreaViewProps {
  color?: string;
}

interface MainContainerProps {
  color?: string;
  padding?: string;
}

interface RowContainerProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
}

interface CenteredContainerProps {
  absolute?: boolean;
}

interface StyledButtonProps {
  isHovered?: boolean;
}

interface StyledInputProps {
  width?: string;
  height?: string;
}

// ✳️ styled bileşenleri
export const KeyboardCloserView = styled.View`
  flex: 1;
`;

export const SafeArea = styled(SafeAreaView).attrs((props: SafeAreaProps) => ({
  edges: props.edges || ["right", "top", "left"],
})) <SafeAreaProps>`
  flex: 1;
  background-color: ${(props: SafeAreaProps) =>
    props.color || theme.colors.bg.primary || "#f2f2f2"};
`;

export const MainContainer = styled.View<MainContainerProps>`
  flex: 1;
  padding: ${(props: MainContainerProps) => props.padding || "80px 0px"};
  background-color: ${(props: MainContainerProps) =>
    props.color || theme.colors.brand || "transparent"};
  align-items: center;
  justify-content: center;
`;

export const RowContainer = styled.View<RowContainerProps>`
  flex-direction: row;
  justify-content: ${(props: RowContainerProps) =>
    props.justifyContent || "space-between"};
  align-items: ${(props: RowContainerProps) => props.alignItems || "center"};
  padding: ${(props: RowContainerProps) => props.padding || "0px"};
  margin: ${(props: RowContainerProps) => props.margin || "0px"};
`;

export const CenteredContainer = styled.View<CenteredContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: ${({ absolute }: CenteredContainerProps) =>
    absolute ? "absolute" : "relative"};
  ${({ absolute }: CenteredContainerProps) =>
    absolute &&
    `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`;

export const StyledButton = styled(TouchableOpacity) <StyledButtonProps>`
  background-color: ${(props: StyledButtonProps) =>
    props.isHovered ? "#D8DaFF" : "#F5F5FF"};
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-width: 2px;
  border-color: ${(props: StyledButtonProps) =>
    props.isHovered ? "black" : "#DDD"};
  align-items: center;
  justify-content: center;
`;


export const StyledInput = styled.TextInput<StyledInputProps>`
  width: ${({ width }) => width || "300px"};
  height: ${({ height }) => height || "44px"};
  background-color: #fafafa;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-horizontal: 10px;
  border-width: 2px;
  border-color: #ccc;
`;
