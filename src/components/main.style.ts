import styled from "styled-components/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
    FontAwesome5,
    Entypo,
    AntDesign,
    SimpleLineIcons,
} from "@expo/vector-icons";

import { Keyboard } from "react-native";

export const SafeArea = styled(SafeAreaView).attrs((props) => ({
    edges: props && props.edges ? props.edges : ["right", "top", "left"],
}))`
  flex: 1;
  background-color: ${(props) =>
        props.color || props.theme.colors.bg.secondary || "#f2f2f2"};
`;

export const MainContainer = styled.View`
  flex: 1;
  padding: 0px 10px;
  background-color: ${(props) =>
        props.color || props.theme.colors.bg.primary || "transparent"};
`;

export const CenteredContainer = styled.View`
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

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ align }) => align || "center"};
`;

export const Loading = styled.ActivityIndicator.attrs((props) => ({
    size: props.size || "large",
    color: props.color || props.theme.colors.bg.secondary,
}))``;

export const CustomIcon = styled(
    ({ iconName, iconLbr, size, color, focused }) => {
        const defColor = "#000000";
        return iconLbr == "Ionicons" ? (
            <Ionicons
        name= { iconName }
        size = { size? size: focused ? 20 : 16 }
        color = { color || defColor
    }
      />
) : iconLbr == "MaterialCommunityIcons" ? (
    <MaterialCommunityIcons
        name= { iconName }
        size = { size? size: focused ? 22 : 18 }
color = { color || defColor}
      />
    ) : iconLbr == "MaterialIcons" ? (
    <MaterialIcons
        name= { iconName }
        size = { size? size: ocused ? 22 : 18 }
color = { color || defColor}
      />
    ) : iconLbr == "FontAwesome" ? (
    <FontAwesome
        name= { iconName }
        size = { size? size: focused ? 20 : 16 }
color = { color || defColor}
      />
    ) : iconLbr == "Entypo" ? (
    <Entypo
        name= { iconName }
        size = { size? size: focused ? 20 : 16 }
color = { color || defColor}
      />
    ) : iconLbr == "AntDesign" ? (
    <AntDesign
        name= { iconName }
        size = { size? size: focused ? 20 : 16 }
color = { color || defColor}
      />
    ) : iconLbr == "SimpleLineIcons" ? (
    <SimpleLineIcons
        name= { iconName }
        size = { size? size: focused ? 20 : 16 }
color = { color || defColor}
      />
    ) : (
    <FontAwesome5
        name= { iconName }
size = { size? size: focused ? 20 : 16 }
color = { color || defColor}
      />
    );
  }
)`
  z-index: 9;
`;

export const KeyboardCloserView = styled.TouchableWithoutFeedback.attrs({
    onPress: Keyboard.dismiss,
})`
  flex: 1;
`;
