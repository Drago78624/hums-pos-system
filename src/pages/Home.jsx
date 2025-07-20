import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { LogOut, Loader2, ShoppingCart, Sun, Moon } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { signOut } from "@/services/auth.services";
import ItemsPane from "@/components/ItemsPane";
import OrderPane from "@/components/OrderPane";
import { useTheme } from "@/providers/ThemeProvider";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSignout = async () => {
    setSigningOut(true);
    await signOut();
    navigate("/login");
    setSigningOut(false);
  };

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
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">HUMS POS System</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSignout}
                disabled={signingOut}
                className="cursor-pointer"
              >
                {signingOut ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                {signingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </header>

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
