import type {Metadata} from 'next';import {Petrona,Work_Sans,IBM_Plex_Mono} from 'next/font/google';import './globals.css';import {Providers} from '@/components/providers';
const petrona=Petrona({subsets:['latin'],variable:'--font-display'});const work=Work_Sans({subsets:['latin'],variable:'--font-sans'});const mono=IBM_Plex_Mono({subsets:['latin'],weight:['400','600'],variable:'--font-mono'});
export const metadata:Metadata={title:'Taste of Sindh | Hyderabad food, delivered',description:'Discover the best of Sindh, one plate at a time.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="bg-background"><body className={`${petrona.variable} ${work.variable} ${mono.variable}`}><Providers>{children}</Providers></body></html>}
