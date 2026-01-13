import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { X, Check, Camera, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../constants/theme';
import { UserProfile } from '../store/types';

interface ProfileModalProps {
    isVisible: boolean;
    onClose: () => void;
    profile: UserProfile;
    onUpdate: (profile: Partial<UserProfile>) => void;
}

const AVATARS = [
    require('../../assets/avatars/avatar1.png'),
    require('../../assets/avatars/avatar2.png'),
    require('../../assets/avatars/avatar3.png'),
    require('../../assets/avatars/avatar4.png'),
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
    isVisible,
    onClose,
    profile,
    onUpdate,
}) => {
    const [name, setName] = useState(profile.name);
    const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);

    const handleSave = () => {
        onUpdate({ name, avatar: selectedAvatar });
        onClose();
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedAvatar(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedAvatar(result.assets[0].uri);
        }
    };

    const isPredefinedAvatar = (avatar?: string) => {
        if (!avatar) return false;
        const index = parseInt(avatar);
        return !isNaN(index) && index >= 0 && index < AVATARS.length && !avatar.startsWith('file://') && !avatar.startsWith('content://');
    };

    const renderMainAvatar = () => {
        if (!selectedAvatar) {
            return (
                <View style={[styles.mainAvatar, styles.avatarPlaceholder]}>
                    <Camera color={theme.colors.textSecondary} size={40} />
                </View>
            );
        }

        if (isPredefinedAvatar(selectedAvatar)) {
            return <Image source={AVATARS[parseInt(selectedAvatar)]} style={styles.mainAvatar} />;
        }

        return <Image source={{ uri: selectedAvatar }} style={styles.mainAvatar} />;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Edit Profile</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X color={theme.colors.text} size={24} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.avatarSection}>
                            <View style={styles.mainAvatarContainer}>
                                {renderMainAvatar()}
                            </View>

                            <View style={styles.actionButtonsContainer}>
                                <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                                    <Camera color="white" size={20} />
                                    <Text style={styles.actionButtonText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.card }]} onPress={pickImage}>
                                    <ImageIcon color={theme.colors.text} size={20} />
                                    <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Gallery</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.label}>Or Select Avatar</Text>
                            <View style={styles.avatarGrid}>
                                {AVATARS.map((avatar, index) => {
                                    const indexStr = index.toString();
                                    const isSelected = selectedAvatar === indexStr;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.avatarOption,
                                                isSelected && styles.selectedAvatarOption,
                                            ]}
                                            onPress={() => setSelectedAvatar(indexStr)}
                                        >
                                            <Image source={avatar} style={styles.avatarImage} />
                                            {isSelected && (
                                                <View style={styles.checkBadge}>
                                                    <Check color="white" size={12} />
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.inputSection}>
                            <Text style={styles.label}>Display Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={theme.colors.textSecondary}
                            />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: theme.spacing.xl,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
        fontWeight: '700',
    },
    closeButton: {
        padding: 4,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    mainAvatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        padding: 4,
        marginBottom: theme.spacing.lg,
    },
    mainAvatar: {
        width: '100%',
        height: '100%',
        borderRadius: 56,
    },
    avatarPlaceholder: {
        backgroundColor: theme.colors.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: theme.spacing.xl,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    label: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: theme.spacing.md,
        alignSelf: 'flex-start',
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },
    avatarOption: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'transparent',
        padding: 2,
    },
    selectedAvatarOption: {
        borderColor: theme.colors.primary,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 33,
    },
    checkBadge: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        backgroundColor: theme.colors.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.background,
    },
    inputSection: {
        marginBottom: theme.spacing.xl,
    },
    input: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        color: theme.colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});
