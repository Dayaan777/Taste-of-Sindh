'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
function Confirmation() { const params = useSearchParams(); const id = params.get('order') || 'TS-DEMO'; return <main className="success-page shell"><span className="success-mark">✓</span><span className="eyebrow">Order received</span><h1>Shukriya.</h1><p className="lede">Your order <strong>{id}</strong> is in the kitchen. We’ll keep you posted as it makes its way to you.</p><div className="success-actions"><Link href={`/track-order?order=${id}`} className="primary-button">Track your order</Link><Link href="/restaurants" className="secondary-button">Order something else</Link></div></main> }
export default function SuccessPage() { return <><SiteHeader /><Suspense fallback={<main className="success-page shell"><p>Loading confirmation…</p></main>}><Confirmation /></Suspense></> }
