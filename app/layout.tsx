import type {Metadata} from 'next';import {Poppins} from 'next/font/google';import './globals.css';import {Providers} from '@/components/providers';
const poppins=Poppins({subsets:['latin'],weight:['400','500','600','700','800'],variable:'--font-poppins'});
export const metadata:Metadata={title:'Taste of Sindh | Hyderabad food, delivered',description:'Discover the best of Sindh, one plate at a time.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="bg-background"><body className={poppins.variable}><Providers>{children}</Providers></body></html>}
