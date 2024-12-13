import User from './models/User'; // relative path to the User model


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required.' });
    }

    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    res.status(200).json({ message: 'Token is valid.' });
}
