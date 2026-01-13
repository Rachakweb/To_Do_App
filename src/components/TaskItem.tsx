import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, CheckCircle, Circle, Briefcase, User, Heart, Layers } from 'lucide-react-native';
import { Task } from '../store/types';
import { theme } from '../constants/theme';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const CategoryIcon = ({ category, color }: { category: Task['category'], color: string }) => {
    switch (category) {
        case 'work': return <Briefcase size={16} color={color} />;
        case 'personal': return <User size={16} color={color} />;
        case 'wellness': return <Heart size={16} color={color} />;
        default: return <Layers size={16} color={color} />;
    }
};

const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
    const colors = {
        high: '#EF4444',
        medium: '#F59E0B',
        low: '#10B981',
    };
    return (
        <View style={[styles.priorityBadge, { backgroundColor: colors[priority] + '20' }]}>
            <View style={[styles.priorityDot, { backgroundColor: colors[priority] }]} />
            <Text style={[styles.priorityText, { color: colors[priority] }]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
        </View>
    );
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.checkButton}
                onPress={() => onToggle(task.id)}
            >
                {task.isCompleted ? (
                    <CheckCircle size={24} color={theme.colors.primary} />
                ) : (
                    <Circle size={24} color={theme.colors.textSecondary} />
                )}
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={[
                    styles.title,
                    task.isCompleted && styles.completedText
                ]}>
                    {task.title}
                </Text>
                <View style={styles.footer}>
                    <PriorityBadge priority={task.priority} />
                    <View style={styles.categoryContainer}>
                        <CategoryIcon category={task.category} color={theme.colors.textSecondary} />
                        <Text style={styles.categoryText}>{task.category}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(task.id)}
            >
                <Trash2 size={20} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    checkButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
    },
    title: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: theme.colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 12,
    },
    priorityDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        marginLeft: 4,
        textTransform: 'capitalize',
    },
    deleteButton: {
        marginLeft: theme.spacing.md,
        padding: 8,
    },
});
