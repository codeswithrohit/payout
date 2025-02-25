import axios from "axios";

const getHeaders = (token) => {
     return {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
               "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${token}`,
     };
};

const formatRequestBody = (data) => {
     return {
          beneName: data.beneName,
          accountNo: data.accountNo,
          ifsc: data.ifsc,
          bank: data.bank,
          amount: data.amount,
          mode: data.mode,
          RefId: data.RefId,
     };
};

const handleError = (error) => {
     console.error(
          "Error:",
          error.response ? error.response.data : error.message
     );
     throw error;
};

export const initiatePayout = async (data, token) => {
     const url = `/api/v1/service/payout/ordersInitiate`;
     const headers = getHeaders(token);
     const body = formatRequestBody(data);

     try {
          let response = await axios.post(url, body, { headers });

          response = await response.json();
          return response;
     } catch (error) {
          return handleError(error);
     }
};
