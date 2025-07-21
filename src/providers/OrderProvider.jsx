import { createContext, useContext, useState } from "react";

const OrderContext = createContext({
  order: {
    type: "dine-in",
    delivery_address: "",
    additional_notes: "",
    total_amount: 0,
    items: [],
  },
  setOrder: () => {},
});

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    type: "dine-in",
    delivery_address: "",
    additional_notes: "",
    total_amount: 0,
    items: [],
  });

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
