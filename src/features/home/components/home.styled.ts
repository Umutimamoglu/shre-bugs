import styled from "styled-components/native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";


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
    gap: 9px;
    width: ${(props) => props.width || "90%"};
    height: ${(props) => props.height || "76%"};
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