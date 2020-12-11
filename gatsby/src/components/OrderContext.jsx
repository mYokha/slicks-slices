import React from 'react';

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = React.useState([]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
