import User from '../schemas/user.schema.js';

const checkAccountStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { accountStatus, isActive } = user;

        if (accountStatus !== 'confirm') {
            return res.status(400).json({ message: 'Invalid account status' });
        }

        if (!isActive) {
            return res.status(403).json({ message: 'Account is not active' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default checkAccountStatus;
