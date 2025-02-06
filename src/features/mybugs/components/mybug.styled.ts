import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled(SafeAreaView) <ContainerProps>`
  flex: 1;
  background-color: "#f4f4f4";
  margin-horizontal: 10px;
`;

export const FilterRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius:10px;
  margin-bottom:10px;

`;

interface FilterButtonProps {
  backgroundColor?: string;
  borderRadius?: string;
  paddingHorizontal?: string;
  paddingVertical?: string;
}

export const FilterButton = styled.Pressable<FilterButtonProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "#f4f4f4"};
  border-radius: ${(props) => props.borderRadius || "25px"};
  padding-horizontal: ${(props) => props.paddingHorizontal || "10px"};
  padding-vertical: ${(props) => props.paddingVertical || "5px"};
`;

export const FilterContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 10px;
`;

export const TopContainer = styled.View`
  flex-direction: horizontal;
  align-items: center;
  margin-horizontal: 10px;
 

`;

export const BottomContainer = styled.View`
  flex-direction: horizontal;
  align-items: center;
  margin-horizontal: 1px;
   margin-top: 10px;
 

`;


export const FilterText = styled.Text`
  font-size: 18px;
  margin-right: 5px;
  color: black;
`;

export const CheckboxWrapper = styled.View`
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;

export const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius:16px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 10px;
  margin-left: 10px;
  padding-left: 10px;
`;

export const ListContainer = styled.FlatList`
  padding-horizontal: 10px;
`;

export const ItemSeparator = styled.View`
  height: 14px;
`;

