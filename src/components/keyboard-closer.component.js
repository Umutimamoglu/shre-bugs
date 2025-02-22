// KeyboardCloser.component.tsx
import React from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const KeyboardCloser = ({ children, isEnabled = false }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined} // iOS için padding
          style={{ flex: 1 }}
          enabled={isEnabled} // enabled ayarını doğru verdiğinizden emin olun
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
