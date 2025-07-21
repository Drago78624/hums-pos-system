import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import ItemsPane from "@/components/ItemsPane";
import OrderPane from "@/components/OrderPane";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useAuth();
  const [orderItems, setOrderItems] = useState([]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAddToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (orderItem) => orderItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content - Two Pane Layout */}
      <main className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-6 h-[calc(100vh-140px)]">
          {/* Left Pane - Items (60%) */}
          <div className="flex-1 w-[60%]">
            <ItemsPane onAddToOrder={handleAddToOrder} />
          </div>

          {/* Right Pane - Order (40%) */}
          <div className="w-[40%]">
            <OrderPane
              orderItems={orderItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearOrder={handleClearOrder}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
