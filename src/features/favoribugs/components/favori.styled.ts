import { Pressable } from "react-native";
import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #d8d0d0;
`;

export const FilterRow = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 25px;
    margin: 10px;
`;

export const FilterButton = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
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
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 16px;
    margin: 10px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    height: 40px;
    border-color: gray;
    border-width: 1px;
    border-radius: 10px;
    margin-left: 10px;
    padding-left: 10px;
    background-color: #f0f0f0;
`;

export const ListContainer = styled.View`
    flex: 1;
    margin: 0 10px;
`;

export const ItemSeparator = styled.View`
    height: 14px;
`;
