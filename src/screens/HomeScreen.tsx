import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Filter } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { useTodoStore } from '../store/todoStore';
import { TaskItem } from '../components/TaskItem';
import { AddTaskModal } from '../components/AddTaskModal';
import { ProfileModal } from '../components/ProfileModal';

const AVATARS = [
    require('../../assets/avatars/avatar1.png'),
    require('../../assets/avatars/avatar2.png'),
    require('../../assets/avatars/avatar3.png'),
    require('../../assets/avatars/avatar4.png'),
];

export const HomeScreen = () => {
    const { tasks, toggleTask, deleteTask, addTask, userProfile, updateProfile } = useTodoStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const completedCount = tasks.filter(t => t.isCompleted).length;

    const isPredefinedAvatar = (avatar?: string) => {
        if (!avatar) return false;
        const index = parseInt(avatar);
        return !isNaN(index) && index >= 0 && index < AVATARS.length && !avatar.startsWith('file://') && !avatar.startsWith('content://');
    };

    const renderProfileAvatar = () => {
        if (userProfile.avatar !== undefined) {
            if (isPredefinedAvatar(userProfile.avatar)) {
                return <Image source={AVATARS[parseInt(userProfile.avatar)]} style={styles.profileImage} />;
            }
            return <Image source={{ uri: userProfile.avatar }} style={styles.profileImage} />;
        }
        return <View style={styles.profilePlaceholder} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={{ width: 45, height: 45, borderRadius: 10 }}
                    />
                    <View>
                        <Text style={styles.greeting}>Hello, {userProfile.name.split(' ')[0]}!</Text>
                        <Text style={styles.subtitle}>
                            {completedCount}/{tasks.length} tasks completed
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => setIsProfileModalVisible(true)}
                >
                    {renderProfileAvatar()}
                </TouchableOpacity>
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Search size={20} color={theme.colors.textSecondary} />
                    <TextInput
                        placeholder="Search tasks..."
                        placeholderTextColor={theme.colors.textSecondary}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Filter size={20} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No tasks found</Text>
                        <Text style={styles.emptySubtext}>Tap + to create a new one</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
            >
                <Plus size={32} color="white" />
            </TouchableOpacity>

            <View style={styles.footerBranding}>
                <Text style={styles.rakStudioText}>Developed by Rak Studio</Text>
            </View>

            <AddTaskModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAdd={addTask}
            />

            <ProfileModal
                isVisible={isProfileModalVisible}
                onClose={() => setIsProfileModalVisible(false)}
                profile={userProfile}
                onUpdate={updateProfile}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        color: theme.colors.text,
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginTop: 4,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        padding: 3,
    },
    profilePlaceholder: {
        flex: 1,
        backgroundColor: '#333',
        borderRadius: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    searchSection: {
        paddingHorizontal: theme.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing.md,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        height: 50,
        marginRight: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: theme.colors.text,
        fontSize: 16,
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.primary + '20',
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary + '40',
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '600',
    },
    emptySubtext: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginTop: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    footerBranding: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        opacity: 0.5,
    },
    rakStudioText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
    }
});
