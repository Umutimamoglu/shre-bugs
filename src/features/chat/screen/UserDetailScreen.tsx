import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { AccountContext } from "@src/services/account/account.context";
import { theme } from "@src/theme";
import { SafeArea } from "@src/components/main.style";

const DUMMY_USERS = [
    { name: "Ali", fixedBugsCount: 10, color: "#FF6384" },
    { name: "Ayşe", fixedBugsCount: 25, color: "#36A2EB" },
    { name: "Umut", fixedBugsCount: 15, color: "#FFCE56" },
    { name: "Semi", fixedBugsCount: 4, color: "#4BC0C0" },
    { name: "Elif", fixedBugsCount: 6, color: "#9966FF" },
];

const UserDetailScreen: React.FC = () => {
    const { user } = useContext(AccountContext);
    const screenWidth = Dimensions.get("window").width;

    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChart(true);
        }, 1000); // 1 saniye gecikmeli

        return () => clearTimeout(timer);
    }, []);

    const chartData = DUMMY_USERS.map((u) => ({
        name: u.name,
        population: u.fixedBugsCount,
        color: u.color,
        legendFontColor: "#444",
        legendFontSize: 14,
    }));

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <ScrollView contentContainerStyle={styles.container}>
                {showChart && (
                    <>
                        <Text style={styles.chartTitle}>Kullanıcı Katkı Oranları</Text>
                        <PieChart
                            data={chartData}
                            width={screenWidth - 32}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                color: () => "#000",
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </>
                )}

                {user ? (
                    <>
                        <Text style={styles.label}>👤 Ad</Text>
                        <Text style={styles.value}>{user.name}</Text>

                        <Text style={styles.label}>📧 Email</Text>
                        <Text style={styles.value}>{user.email}</Text>

                        <Text style={styles.label}>💼 Pozisyon</Text>
                        <Text style={styles.value}>{user.positionTitle}</Text>

                        <Text style={styles.label}>📈 Deneyim</Text>
                        <Text style={styles.value}>{user.experience} yıl</Text>

                        <Text style={styles.label}>🌍 Ülke</Text>
                        <Text style={styles.value}>{user.country}</Text>
                    </>
                ) : (
                    <Text style={styles.value}>Kullanıcı bilgisi bulunamadı.</Text>
                )}
            </ScrollView>
        </SafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        padding: 16,
        backgroundColor: theme.colors.ui.tertiary2,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 16,
        color: "#666",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111",
        backgroundColor: "#f2f2f2",
        padding: 10,
        borderRadius: 8,
        marginTop: 4,
    },
});

export default UserDetailScreen;
