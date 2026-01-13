import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, UserProfile } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoState {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    userProfile: UserProfile;
    updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (taskData) => set((state) => ({
                tasks: [
                    ...state.tasks,
                    {
                        ...taskData,
                        id: Math.random().toString(36).substring(7),
                        createdAt: new Date().toISOString(),
                        isCompleted: false,
                    },
                ],
            })),
            toggleTask: (id) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
                ),
            })),
            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })),
            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updates } : task
                ),
            })),
            userProfile: { name: 'Aura User' },
            updateProfile: (updates) => set((state) => ({
                userProfile: { ...state.userProfile, ...updates }
            })),
        }),
        {
            name: 'todo-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
