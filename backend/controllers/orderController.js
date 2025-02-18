import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// 🛒 COD (Оплата при отриманні)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Всі поля обов'язкові" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed", // ✅ Додаємо початковий статус
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ Очищення кошика після замовлення (переконайтеся, що cartData — масив!)
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Помилка при оформленні замовлення:", error);
    res
      .status(500)
      .json({ success: false, message: "Внутрішня помилка сервера" });
  }
};

// 💳 Платіж через Stripe (структура)
const placeOrderStripe = async (req, res) => {
  try {
    // Тут буде логіка оплати через Stripe
    res.json({ success: true, message: "Stripe Payment Placeholder" });
  } catch (error) {
    console.error("Stripe помилка:", error);
    res.status(500).json({ success: false, message: "Помилка Stripe" });
  }
};

// 📦 Всі замовлення (тільки для адмінів)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("userId", "name email");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Помилка при отриманні всіх замовлень:", error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

// 👤 Замовлення конкретного користувача
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId обов'язковий" });
    }

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Помилка при отриманні замовлень користувача:", error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

// 🔄 Оновлення статусу замовлення
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "orderId та status обов'язкові" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Замовлення не знайдено" });
    }

    res.json({ success: true, message: "Status Updated", updatedOrder });
  } catch (error) {
    console.error("Помилка при оновленні статусу:", error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
