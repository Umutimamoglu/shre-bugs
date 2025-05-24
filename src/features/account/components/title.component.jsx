import { View, Text } from "react-native";
import { RowContainer } from "@src/components/main.style";
import { FontAwesome6 } from '@expo/vector-icons';
import { Line } from "react-native-svg";
import { border, color } from "@shopify/restyle";

export const Title = () => {
  return (
    <View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome6 name="bug-slash" size={50} color="black" style={{ marginBottom: 2 }} />
        <View
          style={{
            marginTop: 4,
            height: 2,
            backgroundColor: '#ccc',
            width: '100%',
            paddingLeft: 0,
            paddingRight: 0,

          }}
        />

      </View>
    </View>
  );
};
