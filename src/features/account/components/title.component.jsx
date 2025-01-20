import { View, Text } from "react-native";
import { RowContainer } from "@src/components/main.style";


export const Title = () => {
  return (
    <View>
      <RowContainer justifyContent="center" alignItems="center">
        <Text
          variant="title"
          color="gray"
          style={{
            fontSize: 26,
          }}
        >
          Sahare
        </Text>
        <Text
          variant="title"
          color="#00d1d1"
          style={{
            marginLeft: 10,
            fontSize: 26,
          }}
        >
          & Fix Bug
        </Text>
      </RowContainer>
      <Text
        variant="subheader"
        color="gray"
        style={{
          fontSize: 13,
          fontFamily: "PP_ExtraLight",
          marginTop: -10,
        }}
      >
        Bug Tracker & Collaboration
      </Text>
    </View>
  );
};
