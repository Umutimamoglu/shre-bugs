import { View, Text } from "react-native";


export const Header = ({ title, subtitle }) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={{ color: "black", fontFamily: "PP_Light", fontSize: 24 }}>
        {title}
      </Text>
      <Text
        style={{ color: "gray", fontFamily: "PP_Regular", fontSize: 13 }}
      >
        {subtitle}
      </Text>
    </View>
  );
};
