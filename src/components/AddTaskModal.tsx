import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { X, Calendar, Flag, Tag } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { Task } from '../store/types';

interface AddTaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isVisible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('medium');
    const [category, setCategory] = useState<Task['category']>('personal');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd({
            title,
            description,
            priority,
            category,
        });
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>New Task</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X color={theme.colors.textSecondary} size={24} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TextInput
                            placeholder="What needs to be done?"
                            placeholderTextColor={theme.colors.textSecondary}
                            style={styles.inputTitle}
                            value={title}
                            onChangeText={setTitle}
                            autoFocus
                        />

                        <TextInput
                            placeholder="Add description (optional)"
                            placeholderTextColor={theme.colors.textSecondary}
                            style={styles.inputDescription}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        <Text style={styles.sectionLabel}>Priority</Text>
                        <View style={styles.row}>
                            {(['low', 'medium', 'high'] as const).map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    style={[
                                        styles.chip,
                                        priority === p && styles.chipActive,
                                        { borderColor: priority === p ? theme.colors.primary : theme.colors.border }
                                    ]}
                                    onPress={() => setPriority(p)}
                                >
                                    <Text style={[
                                        styles.chipText,
                                        priority === p && styles.chipTextActive
                                    ]}>
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionLabel}>Category</Text>
                        <View style={styles.row}>
                            {(['work', 'personal', 'wellness', 'others'] as const).map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[
                                        styles.chip,
                                        category === c && styles.chipActive,
                                        { borderColor: category === c ? theme.colors.primary : theme.colors.border }
                                    ]}
                                    onPress={() => setCategory(c)}
                                >
                                    <Text style={[
                                        styles.chipText,
                                        category === c && styles.chipTextActive
                                    ]}>
                                        {c.charAt(0).toUpperCase() + c.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Create Task</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: theme.spacing.lg,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    modalTitle: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: '700',
    },
    inputTitle: {
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '600',
        marginBottom: theme.spacing.md,
    },
    inputDescription: {
        color: theme.colors.textSecondary,
        fontSize: 16,
        marginBottom: theme.spacing.xl,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    sectionLabel: {
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: theme.spacing.sm,
        marginTop: theme.spacing.md,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: theme.spacing.md,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipActive: {
        backgroundColor: theme.colors.primary + '20',
        borderColor: theme.colors.primary,
    },
    chipText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
    chipTextActive: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});
