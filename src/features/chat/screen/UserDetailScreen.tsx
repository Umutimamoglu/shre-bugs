import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Eğer kullanıcı verisi bir context ile geliyorsa örnek:
import { AccountContext } from "@src/services/account/account.context";

const UserDetailScreen: React.FC = () => {
    const { user } = useContext(AccountContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kullanıcı Bilgileri</Text>
            {user ? (
                <>
                    <Text>Ad: {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Pozisyon: {user.positionTitle}</Text>
                </>
            ) : (
                <Text>Kullanıcı bilgisi bulunamadı.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
});

export default UserDetailScreen;
