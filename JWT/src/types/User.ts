import bcrypt from 'bcrypt';

export interface User {
    id: string;
    username: string;
    hashedPassword: string;
};

export const mockUser = async (): Promise<User> => {
    const hashedPassword = await bcrypt.hash('mockUserPassword', 10);

    return {
        id: '1',
        username: 'mockUser',
        hashedPassword: hashedPassword
    };
};

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, user.hashedPassword);
};
