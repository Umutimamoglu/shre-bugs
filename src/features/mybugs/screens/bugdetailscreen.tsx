import React, { useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { BugsNavigationType, BugsStackParamList } from "@src/infrastracture/navigation/types";
import { SafeArea } from "@src/components/main.style";
import { theme } from "@src/theme";
import { useBug } from "@src/services/bugs/bugs.context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Container,
    Title,
    InputField,
    ToggleButton,

    UpdateButtonText,
    ToggleButtonText
} from "../components/bugdetailcomp.styled";
import UpdateButton from "@src/features/mybugs/components/buttonscomponent";
import { HeaderContainerMyBugs } from "../components/mybug.styled";
import { BackButton, HeaderTitle } from "@src/features/allbugfeed/components/feed.Styled";
import { TouchableOpacity } from "react-native";
import navigation from "@src/infrastracture/navigation";


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
    const navigation = useNavigation<BugsNavigationType>();
    const goToİnfo = () => {
        navigation.navigate("Bugs"); // geçici bir yol yazdım onborading yapıalcak
    };
    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>

            <HeaderContainerMyBugs>
                <BackButton onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={36} color="#000" />
                </BackButton>
                <HeaderTitle>Hata Ekle</HeaderTitle>
                <TouchableOpacity onPress={goToİnfo}>
                    <MaterialCommunityIcons name="information" size={36} color="black" />

                </TouchableOpacity>
            </HeaderContainerMyBugs>




            <Container>


                <InputField value={name} onChangeText={setName} placeholder="Hata Adı" />
                <InputField value={howDidIFix} onChangeText={setHowDidIFix} multiline placeholder="Nasıl çözüldü?" />


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
