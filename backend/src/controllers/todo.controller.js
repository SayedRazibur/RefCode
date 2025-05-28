import Todo from '../Schemas/Todo.schema.js';

// Create
export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json({ success: true, data: todo });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get all with pagination/filter/sort
export const getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt:desc', completed } = req.query;

        const [sortField, sortOrder] = sortBy.split(':');
        const query = completed !== undefined ? { completed: completed === 'true' } : {};

        const todos = await Todo.find(query)
            .sort({ [sortField]: sortOrder === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Todo.countDocuments(query);

        res.json({
            code: 201,
            success: true,
            data: todos,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get single
export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: todo });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: todo });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
