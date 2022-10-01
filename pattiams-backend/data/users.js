import bcrypt from 'bcrypt';
const users = [
    {
        name: 'admin user',
        email: 'admin@example.com',
        number: 1234,
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'user1',
        email: 'user1@example.com',
        number: 4567,
        password: bcrypt.hashSync('user123', 10),
    },
    {
        name: 'user2',
        email: 'user2@example.com',
        number: 7890,
        password: bcrypt.hashSync('user234', 10),
    }
]

export default users;