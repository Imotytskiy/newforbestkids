import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// placing order using COD method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
  }
};

const placeOrderStripe = async (req, res) => {};

const allOrders = async (req, res) => {};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body; // ✅ Витягуємо правильно
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders }); // ✅ Коректний формат відповіді
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message }); // Додаємо статус-код 500
  }
};

const updateStatus = async (req, res) => {};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
