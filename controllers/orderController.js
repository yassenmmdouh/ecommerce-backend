const Order = require('../models/Order');
const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');

exports.createOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({}).populate('items.product');
    if (!cart || cart.items.length === 0) { res.status(400); throw new Error('Cart is empty'); }

    let totalPrice = 0;
    const orderItems = cart.items.map(item => {
        const price = item.product.price;
        totalPrice += price * item.quantity;
        return { product: item.product._id, quantity: item.quantity, price };
    });

    const order = await Order.create({ items: orderItems, totalPrice });
    

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
});
exports.getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('items.product');
    res.json(orders);
});

exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) { res.status(404); throw new Error('Order not found'); }
    res.json(order);
});
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
});