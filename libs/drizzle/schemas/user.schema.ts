export type User = {
    id?: string;
    otp: string | null;
    fullname: string;
    email: string;
    address: string;
    password: string;
    image: string;
    emailVerified: Date;
    roleId?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
};