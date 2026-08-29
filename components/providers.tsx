'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { MenuItem, Restaurant } from '@/lib/data'

export type CartLine = MenuItem & { quantity: number; restaurant: Restaurant }
export type Order = { id: string; createdAt: string; status: number; lines: CartLine[]; total: number; customer: { name: string; email: string; address: string } }

type CartContextValue = { lines: CartLine[]; total: number; add: (item: MenuItem, restaurant: Restaurant) => boolean; change: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void }
type OrderContextValue = { orders: Order[]; placeOrder: (customer: Order['customer']) => Order | null; latest: Order | null }
const CartContext = createContext<CartContextValue | null>(null)
const OrderContext = createContext<OrderContextValue | null>(null)

export function Providers({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => { try { const raw = sessionStorage.getItem('taste-orders'); if (raw) setOrders(JSON.parse(raw)) } catch {} }, [])
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [lines])
  const add = (item: MenuItem, restaurant: Restaurant) => {
    if (lines[0] && lines[0].restaurant.slug !== restaurant.slug && !window.confirm(`Switch from ${lines[0].restaurant.name} and clear your cart?`)) return false
    setLines(current => {
      const base = current[0] && current[0].restaurant.slug !== restaurant.slug ? [] : current
      const found = base.find(line => line.id === item.id)
      return found ? base.map(line => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...base, { ...item, quantity: 1, restaurant }]
    })
    return true
  }
  const change = (id: string, quantity: number) => setLines(current => current.map(line => line.id === id ? { ...line, quantity } : line).filter(line => line.quantity > 0))
  const remove = (id: string) => setLines(current => current.filter(line => line.id !== id))
  const clear = () => setLines([])
  const placeOrder = (customer: Order['customer']) => {
    if (!lines.length) return null
    const order = { id: `TS-${Math.floor(1000 + Math.random() * 8999)}`, createdAt: new Date().toISOString(), status: 1, lines, total, customer }
    setOrders(current => { const next = [order, ...current]; sessionStorage.setItem('taste-orders', JSON.stringify(next)); return next })
    clear(); return order
  }
  return <CartContext.Provider value={{ lines, total, add, change, remove, clear }}><OrderContext.Provider value={{ orders, placeOrder, latest: orders[0] ?? null }}>{children}</OrderContext.Provider></CartContext.Provider>
}
export const useCart = () => { const context = useContext(CartContext); if (!context) throw new Error('Cart provider missing'); return context }
export const useOrders = () => { const context = useContext(OrderContext); if (!context) throw new Error('Order provider missing'); return context }
