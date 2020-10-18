import Link from 'next/link'
import Head from 'next/head'

export default function Housing() {
    return (
        <>
            <Head><title>Housing: Tufts Housing Hub</title></Head>
            <h1>Housing</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </>
    )
}
