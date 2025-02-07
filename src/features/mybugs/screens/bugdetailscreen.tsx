import React, { useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { BugsStackParamList } from "@src/infrastracture/navigation/types";
import { SafeArea } from "@src/components/main.style";
import { theme } from "@src/theme";
import { useBug } from "@src/services/bugs/bugs.context";

import {
    Container,
    Title,
    InputField,
    ToggleButton,

    UpdateButtonText,
    ToggleButtonText
} from "../components/bugdetailcomp.styled";
import UpdateButton from "@src/features/mybugs/components/buttonscomponent";


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
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <Container>
                <Title>Hata Detayları</Title>

                <InputField value={name} onChangeText={setName} placeholder="Hata Adı" />
                <InputField value={howDidIFix} onChangeText={setHowDidIFix} multiline placeholder="Nasıl çözüldü?" />

                {/* Tik (✔️) ve Çarpı (❌) İşareti Kullanıldı */}
                <ToggleButton onPress={() => setIsFixed(!isFixed)} isFixed={isFixed}>
                    <ToggleButtonText>
                        {isFixed ? "Fixed ✔️" : " Waiting ❌"}
                    </ToggleButtonText>
                </ToggleButton>
                <UpdateButton onPress={handleUpdate}>
                    <UpdateButtonText>Güncelle</UpdateButtonText>
                </UpdateButton>

            </Container>
        </SafeArea>
    );
};

export default BugDetailScreen;
