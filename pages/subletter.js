import Link from 'next/link'
import Head from 'next/head'

export default function Subletters() {
    return (
        <>
            <Head><title>Subletters: Tufts Housing Hub</title></Head>
            <h1>Subletters</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </>
    )
}
