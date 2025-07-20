import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { getItems, getCategories } from "@/services/items.services";
import { Input } from "@/components/ui/input";

export default function ItemsPane({ onAddToOrder }) {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filteredItemsData = items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category?.toLowerCase() === activeCategory;

      const matchesSearch =
        !searchTerm ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredItems(filteredItemsData);
  }, [activeCategory, items, searchTerm]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const [itemsData, categoriesData] = await Promise.all([
        getItems(),
        getCategories(),
      ]);
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading items: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border rounded-xl p-4 shadow-md">
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted/30 rounded-lg p-2 border">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "ghost"}
            onClick={() => setActiveCategory(category)}
            className="cursor-pointer capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onAddToOrder={onAddToOrder} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemCard({ item, onAddToOrder }) {
  const formatPrice = (price) => {
    return "Rs. " + price;
  };
  return (
    <Card className="hover:shadow-md transition-shadow py-1">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
          <p className="text-lg font-semibold text-primary">
            {formatPrice(item.price)}
          </p>
          <Button
            size="sm"
            className="cursor-pointer w-full"
            onClick={() => onAddToOrder(item)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
