import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    runOnJS
} from 'react-native-reanimated';
import { theme } from '../constants/theme';

const { width } = Dimensions.get('window');

interface LoadingScreenProps {
    onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
    const categories = ['Wealth', 'Health', 'Work', 'Family'];
    const opacityValues = categories.map(() => useSharedValue(0));
    const scaleValues = categories.map(() => useSharedValue(0.8));
    const rakOpacity = useSharedValue(0);
    const logoOpacity = useSharedValue(0);

    useEffect(() => {
        // Logo and Categories appearance
        logoOpacity.value = withTiming(1, { duration: 1000 });

        categories.forEach((_, index) => {
            opacityValues[index].value = withDelay(
                index * 800 + 400,
                withSequence(
                    withTiming(1, { duration: 600 }),
                    withDelay(400, withTiming(0.3, { duration: 600 }))
                )
            );
            scaleValues[index].value = withDelay(
                index * 800 + 400,
                withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) })
            );
        });

        // Rak Studio branding appearance
        rakOpacity.value = withDelay(
            categories.length * 800 + 500,
            withSequence(
                withTiming(1, { duration: 1000 }),
                withDelay(1000, withTiming(0, { duration: 800 }, (finished) => {
                    if (finished) {
                        runOnJS(onFinish)();
                    }
                }))
            )
        );
    }, []);

    const logoAnimatedStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: withTiming(logoOpacity.value === 1 ? 1 : 0.8, { duration: 1000 }) }],
        marginBottom: 40,
    }));

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/icon.png')}
                style={[styles.logo, logoAnimatedStyle]}
            />
            <View style={styles.content}>
                {categories.map((cat, index) => {
                    const animatedStyle = useAnimatedStyle(() => ({
                        opacity: opacityValues[index].value,
                        transform: [{ scale: scaleValues[index].value }],
                        position: 'absolute',
                    }));

                    return (
                        <Animated.Text key={cat} style={[styles.text, animatedStyle]}>
                            {cat}
                        </Animated.Text>
                    );
                })}
            </View>

            <Animated.View style={[styles.footer, useAnimatedStyle(() => ({ opacity: rakOpacity.value }))]}>
                <Text style={styles.devBy}>Developed by</Text>
                <Text style={styles.studioName}>Rak Studio</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    content: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.primary,
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
    devBy: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 4,
    },
    studioName: {
        color: theme.colors.text,
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
