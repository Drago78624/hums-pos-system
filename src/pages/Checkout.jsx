import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingCart, CheckCircle, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useOrder } from "@/providers/OrderProvider";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
  const { user } = useAuth();
  const { order, setOrder } = useOrder();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if no items in order
  if (!order.items || order.items.length === 0) {
    return <Navigate to="/" />;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      // Here you would typically submit the order to your backend
      // For now, we'll just simulate a successful order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Order placed successfully!", {
        description: "Your order has been confirmed and is being prepared.",
      });

      // Clear the order and redirect
      setOrder({
        type: "dine-in",
        delivery_address: "",
        additional_notes: "",
        total_amount: 0,
        items: [],
      });

      navigate("/");
    } catch (error) {
      toast.error("Failed to place order", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Order Confirmation</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Menu</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
              {/* Items List */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Items ({totalItems})</span>
                  <span>{formatPrice(order.total_amount)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Order Information</span>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-8">
              {/* Order Type */}
              <div className="space-y-2">
                <Label htmlFor="order-type">Order Type</Label>
                <Select
                  id="order-type"
                  value={order.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Order Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="dine-in">Dine In</SelectItem>
                      <SelectItem value="takeaway">Takeaway</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Delivery Address - Only show for takeaway */}
              {order.type === "takeaway" && (
                <div className="space-y-2">
                  <Label htmlFor="delivery-address">Delivery Address</Label>
                  <Input
                    id="delivery-address"
                    placeholder="Enter your delivery address"
                    value={order.delivery_address}
                    onChange={(e) =>
                      handleInputChange("delivery_address", e.target.value)
                    }
                  />
                </div>
              )}

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additional-notes">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any special instructions or requests..."
                  value={order.additional_notes}
                  onChange={(e) =>
                    handleInputChange("additional_notes", e.target.value)
                  }
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={
                  isSubmitting ||
                  (order.type === "takeaway" && !order.delivery_address.trim())
                }
              >
                {isSubmitting
                  ? "Placing Order..."
                  : `Place Order - ${formatPrice(order.total_amount)}`}
              </Button>

              {order.type === "takeaway" && !order.delivery_address.trim() && (
                <p className="text-sm text-muted-foreground text-center">
                  Please provide a delivery address for takeaway orders
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
