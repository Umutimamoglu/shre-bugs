import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../utils/theme';
import { Message } from '../../types';



interface MessageItemProps {
    item: Message;
    isMyMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ item, isMyMessage }) => {
    const messageTime = new Date(item.createdAt).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <View
            style={[
                styles.messageContainer,
                isMyMessage ? styles.myMessage : styles.theirMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageDate}>{messageTime}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: '70%',
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    messageDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
});

export default MessageItem;
