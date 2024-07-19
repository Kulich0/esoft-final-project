import axios from 'axios';

const shopId = process.env.YOOKASSA_SHOP_ID as string;
const secretKey = process.env.YOOKASSA_SECRET_KEY as string;


interface PaymentRequest {
  amount: {
    value: string;
    currency: string;
  };
  capture: boolean;
  confirmation: {
    type: string;
    return_url: string;
  };
  description: string;
}

interface PaymentResponse {
  id: string;
  status: string;
  confirmation: {
    confirmation_url: string;
  };
}

// генерим ключ идемпотентности
const generateIdempotenceKey = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createPayment = async (amount: string, description: string, userId: number): Promise<PaymentResponse> => {
  
  const paymentRequest: PaymentRequest = {
    amount: {
      value: amount,
      currency: 'RUB',
    },
    capture: true,
    confirmation: {
      type: 'redirect',
      return_url: `https://esoft-final-project.onrender.com/usabonements/users/${userId}`,
    },
    description,
  };

  
  const idempotenceKey = generateIdempotenceKey();

  try {
    
    const response = await axios.post<PaymentResponse>(
      'https://api.yookassa.ru/v3/payments',
      paymentRequest,
      {
        auth: {
          username: shopId,
          password: secretKey,
        },
        headers: {
          'Idempotence-Key': idempotenceKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
