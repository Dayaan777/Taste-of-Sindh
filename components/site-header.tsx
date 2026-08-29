'use client'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/providers'
export function SiteHeader() { const { lines } = useCart(); const [open, setOpen] = useState(false); const count = lines.reduce((sum, line) => sum + line.quantity, 0)
 return <header className="site-header"><div className="shell header-inner"><Link href="/" className="brand"><span className="brand-mark">T</span><span>Taste of Sindh</span></Link><button className="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'nav-links open' : 'nav-links'}><Link href="/restaurants" onClick={() => setOpen(false)}>Discover</Link><Link href="/top-picks" onClick={() => setOpen(false)}>Top picks</Link><Link href="/track-order" onClick={() => setOpen(false)}>Track order</Link><Link href="/auth" onClick={() => setOpen(false)}>Sign in</Link></nav><Link href="/cart" className="cart-button"><ShoppingBag aria-hidden="true" /> Cart <span>{count}</span></Link></div></header> }
