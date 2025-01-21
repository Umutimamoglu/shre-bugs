import { View, Text } from "react-native";
import { RowContainer } from "@src/components/main.style";
import { FontAwesome6 } from '@expo/vector-icons';
import { Line } from "react-native-svg";
import { border, color } from "@shopify/restyle";

export const Title = () => {
  return (
    <View>
      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome6 name="bug-slash" size={50} color="black" style={{ marginBottom: 20 }} />
        <View
          style={{
            marginTop: 140,
            height: 4,
            backgroundColor: 'red',
            width: '100%',
            paddingLeft: 0,
            marginBottom: 1, // Altına boşluk ekler
          }}
        />

      </View>
    </View>
  );
};
