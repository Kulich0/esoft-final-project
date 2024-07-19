require('dotenv').config();

if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) {
    throw new Error("Shop ID and Secret Key must be defined in the configuration.");
}

export const yookassaConfig = {
    shopId: process.env.YOOKASSA_SHOP_ID as string,
    secretKey: process.env.YOOKASSA_SECRET_KEY as string
};