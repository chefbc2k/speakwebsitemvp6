'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from 'lucide-react';

const initialCartItems = [
  { id: 1, name: 'Cosmic Voyage', image: 'https://picsum.photos/seed/1/100/100', price: 0.5, quantity: 1 },
  { id: 2, name: 'Digital Dreams', image: 'https://picsum.photos/seed/2/100/100', price: 0.7, quantity: 1 },
];

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center p-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.price} ETH</p>
                </div>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 mx-2 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="ml-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{total.toFixed(2)} ETH</span>
              </p>
              <p className="flex justify-between mb-2">
                <span>Gas Fee:</span>
                <span>0.01 ETH</span>
              </p>
              <p className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{(total + 0.01).toFixed(2)} ETH</span>
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}