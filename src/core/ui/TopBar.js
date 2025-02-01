// src/core/components/TopBar.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../common/theme';

const TopBar = ({ title, leftIcon, onBackPress }) => {
    return (
        <SafeAreaView style={styles.topBarContainer}>
            <View style={styles.topBar}>
                {leftIcon && (
                    <Image source={require('../../../assets/icons/favicon.png')} style={styles.icon} />
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topBarContainer: {
        width: '100%',
        paddingTop: 0,
        backgroundColor: COLORS.primary,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: COLORS.primary,
        height: 60,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: FONTS.regular,
        fontWeight: 'bold',
        color: COLORS.onPrimary,
    },
});

export default TopBar;
