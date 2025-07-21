import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, CheckCircle, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/format-currency";

export default function OrderConfirmationModal({
  open,
  onOpenChange,
  onOrderSuccess,
  orderItems,
  totalAmount,
}) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    type: "dine-in",
    delivery_address: "",
    additional_notes: "",
    total_amount: totalAmount,
  });

  // Close modal if not authenticated or no items
  useEffect(() => {
    if (!user || !orderItems || orderItems.length === 0) {
      onOpenChange(false);
    }
  }, [user, orderItems, onOpenChange]);

  // Reset order details when modal opens
  useEffect(() => {
    if (open) {
      setOrderDetails({
        type: "dine-in",
        delivery_address: "",
        additional_notes: "",
        total_amount: totalAmount,
      });
    }
  }, [open]);

  const handleInputChange = (field, value) => {
    setOrderDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      console.log(orderDetails);
      console.log(orderItems);
      // Here you would typically submit the order to your backend
      // For now, we'll just simulate a successful order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Order placed successfully!", {
        description: "Your order has been confirmed and is being prepared.",
      });

      // Call success callback to clear local order items and close modal
      if (onOrderSuccess) {
        onOrderSuccess();
      } else {
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to place order", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems =
    orderItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">Order Confirmation</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="flex flex-col gap-6">
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
                  {orderItems?.map((item) => (
                    <div
                      key={item.id}
                      className="border border-border flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Items ({totalItems})</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
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
              <CardContent className="space-y-6">
                {/* Order Type */}
                <div className="space-y-2">
                  <Label htmlFor="order-type">Order Type</Label>
                  <Select
                    id="order-type"
                    value={orderDetails.type}
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
                {orderDetails.type === "takeaway" && (
                  <div className="space-y-2">
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Input
                      id="delivery-address"
                      placeholder="Enter your delivery address"
                      value={orderDetails.delivery_address}
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
                    value={orderDetails.additional_notes}
                    onChange={(e) =>
                      handleInputChange("additional_notes", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={
                      isSubmitting ||
                      (orderDetails.type === "takeaway" &&
                        !orderDetails.delivery_address?.trim())
                    }
                  >
                    {isSubmitting
                      ? "Placing Order..."
                      : `Place Order - ${formatCurrency(totalAmount)}`}
                  </Button>

                  {orderDetails.type === "takeaway" &&
                    !orderDetails.delivery_address?.trim() && (
                      <p className="text-sm text-muted-foreground text-center">
                        Please provide a delivery address for takeaway orders
                      </p>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
