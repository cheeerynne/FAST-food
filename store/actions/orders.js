import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://fast-food-cdff5.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].mealItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (mealItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    try {
      const response = await fetch(
        `https://fast-food-cdff5.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mealItems,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: mealItems,
          amount: totalAmount,
          date: date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

// import Order from "../../models/Order";

// export const ADD_ORDER = "ADD_ORDER";
// export const SET_ORDERS = "SET_ORDERS";

// export const fetchOrders = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         "https://fast-food-cdff5.firebaseio.com/orders/s1.json"
//       );

//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }

//       const resData = await response.json();
//       const loadedOrders = [];

//       for (const key in resData) {
//         loadedOrders.push(
//           new Order(
//             key,
//             resData[key].mealItems,
//             resData[key].totalAmount,
//             new Date(resData[key].date)
//           )
//         );
//       }
//       dispatch({ type: SET_ORDERS, orders: loadedOrders });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const addOrder = (mealItems, totalAmount) => {
//   return async (dispatch) => {
//     const date = new Date();
//     const response = await fetch(
//       "https://fast-food-cdff5.firebaseio.com/orders/s1.json",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           mealItems,
//           totalAmount,
//           date: date.toISOString(),
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }

//     const resData = await response.json();

//     dispatch({
//       type: ADD_ORDER,
//       orderData: {
//         id: resData.name,
//         items: mealItems,
//         amount: totalAmount,
//         date: date,
//       },
//     });
//   };
// };
