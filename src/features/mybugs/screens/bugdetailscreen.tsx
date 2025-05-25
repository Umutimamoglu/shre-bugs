import React, { useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { BugsNavigationType, BugsStackParamList } from "@src/infrastracture/navigation/types";
import { SafeArea, StyledInput } from "@src/components/main.style";
import { theme } from "@src/theme";
import { useBug } from "@src/services/bugs/bugs.context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Container,
    InputField,
    ToggleButton,
    ToggleButtonText,
    UpdateButtonText,
} from "../components/bugdetailcomp.styled";
import { HeaderContainerMyBugs } from "../components/mybug.styled";
import { BackButton, HeaderTitle } from "@src/features/allbugfeed/components/feed.Styled";
import { TouchableOpacity, Text, Image } from "react-native";
import { CustomButton } from "@src/features/account/components/acoount.styled";

type BugDetailRouteProp = RouteProp<BugsStackParamList, "BugDetail">;

const BugDetailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const { updateBug } = useBug();
    const navigation = useNavigation<BugsNavigationType>();

    const [name, setName] = useState(bug.name);
    const [type, setType] = useState(bug.type);
    const [language, setLanguage] = useState(bug.language);
    const [howDidIFix, setHowDidIFix] = useState(bug.howDidIFix);
    const [isFixed, setIsFixed] = useState(bug.isFixed);

    const handleUpdate = async () => {
        await updateBug(bug._id, {
            name,
            type,
            language,
            howDidIFix,
            isFixed
        });
    };

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <HeaderContainerMyBugs>
                <BackButton onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={36} color="#000" />
                </BackButton>
                <HeaderTitle>Hata Detayı</HeaderTitle>
                <TouchableOpacity onPress={() => navigation.navigate("Bugs")}>
                    <MaterialCommunityIcons name="information" size={36} color={bug.color.code} />
                </TouchableOpacity>
            </HeaderContainerMyBugs>

            <Container>
                {bug.image ? (
                    <Image
                        source={{ uri: `${bug.image.startsWith("http") ? bug.image : `http://localhost:1337/${bug.image}`}` }}
                        style={{ width: "100%", height: 200, borderRadius: 8, marginBottom: 16 }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text style={{ marginBottom: 16 }}>Görsel bulunamadı</Text>
                )}

                <Text style={{ marginLeft: 16, marginTop: 5, marginBottom: 3, alignSelf: "flex-start" }}>📝 Hata Adı</Text>
                <StyledInput width="90%" value={name} onChangeText={setName} placeholder="Hata Adı" />

                <Text style={{ marginLeft: 16, marginTop: 10, marginBottom: 3, alignSelf: "flex-start" }}>⚙️ Tür</Text>
                <StyledInput width="90%" value={type} onChangeText={setType} placeholder="Tür" />

                <Text style={{ marginLeft: 16, marginTop: 10, marginBottom: 3, alignSelf: "flex-start" }}>💻 Dil</Text>
                <StyledInput width="90%" value={language} onChangeText={setLanguage} placeholder="Dil" />

                <Text style={{ marginLeft: 16, marginTop: 10, marginBottom: 3, alignSelf: "flex-start" }}>🛠️ Nasıl Çözüldü?</Text>
                <StyledInput
                    width="90%"
                    value={howDidIFix}
                    onChangeText={setHowDidIFix}
                    multiline
                    placeholder="Nasıl çözüldü?"
                />

                <ToggleButton onPress={() => setIsFixed(!isFixed)} isFixed={isFixed}>
                    <ToggleButtonText>
                        {isFixed ? "✔️ Düzeltildi" : "❌ Bekliyor"}
                    </ToggleButtonText>
                </ToggleButton>

                <CustomButton
                    onPress={handleUpdate}
                    color={bug.color.code}
                    height="44px"
                    width="32%"
                    borderRadius="12px"
                    marginTop="0"
                    style={({ pressed }: { pressed: boolean }) => [
                        {
                            opacity: pressed ? 0.7 : 1,
                            transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
                        },
                    ]}
                >
                    <UpdateButtonText>Güncelle</UpdateButtonText>
                </CustomButton>
            </Container>

        </SafeArea>
    );
};

export default BugDetailScreen;
