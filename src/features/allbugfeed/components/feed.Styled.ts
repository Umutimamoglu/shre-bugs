import { Pressable, TextInput } from "react-native";
import styled from "styled-components/native";
import { theme } from "@src/theme";

export const Container = styled.View`
  flex: 1;
  background-color: #F5F5FF;
`;

export const HeaderContainer = styled.View`
 flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  padding-horizontal: 10px;
`;

export const BackButton = styled(Pressable)`
  padding: 2px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

export const ActionButton = styled(Pressable)`
  background-color: #FFFFFF;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 56px;
  height: 56px;

  /* iOS için gölge */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;

  /* Android için yükseltilmiş efekt */
  elevation: 6;
`;

export const SearchBarContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.ui.tertiary2};
  padding-horizontal: 16px;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 10px;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  margin-left: 10px;
  padding-left: 10px;
  border-color: gray;
  border-width: 1px;
  background-color: white;
  border-radius: 10px;
`;

export const FlatListContainer = styled.View`
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 16px;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  text-align: center;
  margin-top: 20px;
`;
export const ItemSeparator = styled.View`
  height: 8px;  
`;

