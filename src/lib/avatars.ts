export const AVATARS = [
    // Males
    { id: 'm1', gender: 'male', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 'm2', gender: 'male', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
    { id: 'm3', gender: 'male', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 'm4', gender: 'male', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' },
    { id: 'm5', gender: 'male', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },

    // Females
    { id: 'f1', gender: 'female', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    { id: 'f2', gender: 'female', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { id: 'f3', gender: 'female', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha' },
    { id: 'f4', gender: 'female', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy' },
    { id: 'f5', gender: 'female', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
];

export type Avatar = typeof AVATARS[0];
