import React from "react";
import theme, { Box, Text } from "../../utils/theme";
import { FieldError } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputProps = {
    label: string;
    error?: FieldError;
} & TextInputProps;

const Input = ({ label, error, ...props }: InputProps) => {
    return (
        <Box flexDirection="column">
            <Text variant="textXs" textTransform="uppercase" mb="3.5">
                {label}
            </Text>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                    ,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: error ? "#f5f41f" : "#3C3C43",
                    borderRadius: theme.borderRadii["rounded-7xl"],
                }}
                {...props}
            />
            {error && (
                <Text mt="3.5" color="rose500">
                    {error.message}
                </Text>
            )}
        </Box>
    );
};

export default Input;

const styles = StyleSheet.create({});