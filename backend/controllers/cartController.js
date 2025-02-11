//add products

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Якщо cartData немає, ініціалізуємо порожній об'єкт

    // Якщо товар вже є в кошику
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // Якщо товару ще немає в кошику
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update product cart

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body; // Виправлено `userIDd` на `userId`

    // Отримуємо дані користувача
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ініціалізація кошика, якщо його немає
    let cartData = userData.cartData || {};

    // Переконуємося, що існує об'єкт для `itemId`
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Оновлюємо кількість товару
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size]; // Видаляємо товар, якщо кількість = 0

      // Якщо в товарі більше немає розмірів, видаляємо його
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    // Оновлюємо базу даних
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//get products to cart

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
