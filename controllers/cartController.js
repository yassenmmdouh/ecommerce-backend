const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const getOrCreateCart = async () => {
    let cart = await Cart.findOne({});
    if (!cart) { cart = await Cart.create({ items: [] }); }
    return cart;
};

exports.getCart = asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart();
    await cart.populate('items.product');
    res.json(cart);
});

exports.addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) { res.status(404); throw new Error('Product not found'); }

    const cart = await getOrCreateCart();
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity || 1);
    } else {
        cart.items.push({ product: productId, quantity: Number(quantity || 1) });
    }
    await cart.save();
    res.json(cart);
});

exports.updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await getOrCreateCart();
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity = Number(quantity);
        await cart.save();
        res.json(cart);
    } else {
        res.status(404); throw new Error('Item not found in cart');
    }
});

exports.removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const cart = await getOrCreateCart();
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
await cart.save();
await cart.populate('items.product');
res.json(cart);
});