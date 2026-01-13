export interface UserProfile {
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'wellness' | 'others';
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
}
