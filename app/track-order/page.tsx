'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useOrders } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
const stages = ['Order received', 'Kitchen preparing', 'Rider on the way', 'Delivered']
function Tracker() { const params = useSearchParams(); const { orders } = useOrders(); const [id, setId] = useState(params.get('order') || ''); const [found, setFound] = useState(orders.find(order => order.id === id) || null); return <main className="section shell"><span className="eyebrow">Stay in the loop</span><h1>Track your order.</h1><p className="lede">Enter the order number from your confirmation.</p><form className="actions" onSubmit={event => { event.preventDefault(); setFound(orders.find(order => order.id.toLowerCase() === id.toLowerCase()) || null) }}><input className="input" required value={id} onChange={event => setId(event.target.value)} placeholder="e.g. TS-2048" /><button className="primary-button">Track order</button></form>{found ? <div className="card" style={{ maxWidth: 650, marginTop: '2rem' }}><span className="tag">Order {found.id}</span><h2>{stages[found.status]}</h2><p className="muted">{found.lines[0]?.restaurant.name} · Rs. {found.total.toLocaleString()}</p><div className="filters">{stages.map((stage, index) => <span className={index <= found.status ? 'tag' : 'muted'} key={stage}>{index <= found.status ? '✓ ' : ''}{stage}</span>)}</div></div> : id && <p className="form-note" role="status">We couldn&apos;t find that order in this browser session. Try the number from your confirmation.</p>}</main> }
export default function TrackOrder() { return <><SiteHeader /><Suspense fallback={<main className="section shell"><p>Loading tracker…</p></main>}><Tracker /></Suspense></> }
