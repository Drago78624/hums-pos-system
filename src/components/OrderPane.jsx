import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function OrderPane({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) {
  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    return formattedPrice;
  };

  const totalItems = orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Card className="h-full flex flex-col gap-3 py-5 pb-0">
      <CardHeader className="py-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Current Order</span>
          </div>
          {orderItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearOrder}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 overflow-y-auto pt-0">
        {orderItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No items in order</p>
              <p className="text-sm">Add items to get started</p>
            </div>
          </div>
        ) : (
          <>
            {/* Order Items */}
            <div className="flex-1 overflow-auto space-y-3 mb-4">
              {orderItems.map((item) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-2 space-y-0">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total ({totalItems})</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>

              <Button className="w-full mt-4" size="lg">
                Process Order
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function OrderItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground">{item.price} each</p>
      </div>

      <div className="flex items-center space-x-2 ml-3">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
          }
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onRemoveItem(item.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
