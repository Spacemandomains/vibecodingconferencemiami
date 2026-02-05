import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface MerchandiseItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string | null;
  sizes: string[] | null;
  colors: string[] | null;
}

export const MerchandiseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: merchandise, isLoading, error } = useQuery<MerchandiseItem[]>({
    queryKey: ["/api/merchandise"],
    retry: 3,
    select: (data): MerchandiseItem[] => data || []
  });

  // Make sure merchandise is an array before filtering
  const filteredMerchandise = selectedCategory === "all" 
    ? merchandise 
    : merchandise?.filter(item => item.category === selectedCategory) || [];

  if (isLoading) {
    return (
      <section id="merchandise" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Conference Merchandise</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="merchandise" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Conference Merchandise</h2>
          <div className="text-center text-red-500">
            Error loading merchandise. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="merchandise" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Conference Merchandise</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Show your support for the Vibe Coding Conference with our exclusive merchandise.
          Pre-order now and pick up your items at the conference!
        </p>

        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
              All Items
            </TabsTrigger>
            <TabsTrigger value="tshirt" onClick={() => setSelectedCategory("tshirt")}>
              T-Shirts
            </TabsTrigger>
            <TabsTrigger value="hat" onClick={() => setSelectedCategory("hat")}>
              Hats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(filteredMerchandise) && filteredMerchandise.length > 0 ? (
                filteredMerchandise.map((item) => (
                  <MerchandiseCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No merchandise available at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tshirt" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(filteredMerchandise) && filteredMerchandise.length > 0 ? (
                filteredMerchandise.map((item) => (
                  <MerchandiseCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No t-shirts available at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="hat" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(filteredMerchandise) && filteredMerchandise.length > 0 ? (
                filteredMerchandise.map((item) => (
                  <MerchandiseCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No hats available at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface MerchandiseCardProps {
  item: MerchandiseItem;
}

const MerchandiseCard = ({ item }: MerchandiseCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 bg-slate-100 flex items-center justify-center">
        {item.name === "Vibe Conference T-Shirt" ? (
          <img
            src="/images/tshirt.png"
            alt={item.name}
            className="max-h-full object-contain"
          />
        ) : item.name === "Vibe Conference Cap" ? (
          <img
            src="/images/cap.png"
            alt={item.name}
            className="max-h-full object-contain"
          />
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="max-h-full object-contain"
          />
        ) : (
          <div className="text-slate-400">No image available</div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Prices with special pricing for BumpSale items */}
        <div className="flex justify-between items-center mb-4">
          {item.name === "Vibe Conference T-Shirt" ? (
            <div className="w-full">
              <p className="text-sm text-green-600 mb-1">Special Price: $5.00</p>
              <p className="text-xs text-gray-500">Price adjusts based on demand</p>
            </div>
          ) : item.name === "Vibe Conference Cap" ? (
            <div className="w-full">
              <p className="text-sm text-green-600 mb-1">Special Price: $1.00</p>
              <p className="text-xs text-gray-500">Price adjusts based on demand</p>
            </div>
          ) : (
            <span className="text-xl font-bold">{formatPrice(item.price)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {item.name === "Vibe Conference T-Shirt" ? (
          // Link to BumpSale HTML page for T-shirt
          <a 
            href="/merchandise/purchase.html?type=tshirt" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 bg-primary text-white rounded-md text-center hover:bg-primary/90 inline-block"
          >
            View Special Pricing
          </a>
        ) : item.name === "Vibe Conference Cap" ? (
          // Link to BumpSale HTML page for Cap
          <a 
            href="/merchandise/purchase.html?type=cap" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 bg-primary text-white rounded-md text-center hover:bg-primary/90 inline-block"
          >
            View Special Pricing
          </a>
        ) : (
          // Regular purchase button for other items
          <Link href={`/merchandise-checkout/${item.id}`} className="w-full">
            <Button className="w-full">
              Purchase Now
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};