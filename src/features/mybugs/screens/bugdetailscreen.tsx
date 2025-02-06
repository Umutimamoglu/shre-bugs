import React, { useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { BugsStackParamList } from "@src/infrastracture/navigation/types";
import { SafeArea } from "@src/components/main.style";
import { theme } from "@src/theme";


import { axiosInstance } from "@src/services/account/account.service";
import {
    Container,
    Title,
    ImageContainer,
    StyledImage,
    InputField,
    ToggleButton,
    ToggleButtonText,
    UpdateButton,
    UpdateButtonText
} from "../components/bugdetailcomp.styled";
import { useBug } from "@src/services/bugs/bugs.context";

type BugDetailRouteProp = RouteProp<BugsStackParamList, "BugDetail">;

const BugDetailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const { updateBug } = useBug();

    const [name, setName] = useState(bug.name);
    const [howDidIFix, setHowDidIFix] = useState(bug.howDidIFix);
    const [isFixed, setIsFixed] = useState(bug.isFixed);

    const handleUpdate = async () => {
        await updateBug(bug._id, {
            name,
            howDidIFix,
            isFixed
        });
    };

    return (
        <SafeArea edges={["top"]} color={theme.colors.brand.secondary}>
            <Container>
                <Title>Hata Detayları</Title>

                <InputField value={name} onChangeText={setName} placeholder="Hata Adı" />
                <InputField value={howDidIFix} onChangeText={setHowDidIFix} multiline placeholder="Nasıl çözüldü?" />

                <ToggleButton onPress={() => setIsFixed(!isFixed)} isFixed={isFixed}>
                    <ToggleButtonText>{isFixed ? "Evet" : "Hayır"}</ToggleButtonText>
                </ToggleButton>

                <UpdateButton onPress={handleUpdate}>
                    <UpdateButtonText>Güncelle</UpdateButtonText>
                </UpdateButton>
            </Container>
        </SafeArea>
    );
};

export default BugDetailScreen;