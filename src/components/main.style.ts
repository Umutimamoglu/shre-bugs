import styled from "styled-components/native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { theme } from "@src/theme";




interface SafeAreaProps extends SafeAreaViewProps {
  color?: string;
}

export const KeyboardCloserView = styled.View`
  flex: 1;
`;





export const SafeArea = styled(SafeAreaView).attrs<SafeAreaProps>((props) => ({
  edges: props.edges || ["right", "top", "left"],
}))`
  flex: 1;
  background-color: ${(props) => props.color || theme.colors.bg.primary || "#f2f2f2"};
`;

interface CenteredContainerProps {
  absolute?: boolean;
}

interface RowContainerProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
}

interface MainContainerProps {
  color?: string;
  padding?: string;
}

export const MainContainer = styled.View<MainContainerProps>`
  flex: 1;
  padding: ${(props) => props.padding || "0px 0px"};
  background-color: ${(props) =>
    props.color || theme.colors.brand || "transparent"};
    align-items: center;
    justify-content: center;
`;

export const RowContainer = styled.View<RowContainerProps>`
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: ${(props) => props.alignItems || "center"};
  padding: ${(props) => props.padding || "0px"};
  margin: ${(props) => props.margin || "0px"};
`;

export const CenteredContainer = styled.View<CenteredContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: ${({ absolute }) => (absolute ? "absolute" : "relative")};
  ${({ absolute }) =>
    absolute &&
    `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`;

interface CustomIconProps {
  iconName: string;
  iconLbr: string;
  size?: number;
  color?: string;
  focused?: boolean;
}

export const StyledButton = styled(TouchableOpacity) <{ isHovered?: boolean }>`
  background-color: ${(props) => (props.isHovered ? "#D8DaFF" : "#F5F5FF")};
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-width: 2px;
  border-color: ${(props) => (props.isHovered ? "black" : "#DDD")};
  align-items: center;
  justify-content: center;
`;


