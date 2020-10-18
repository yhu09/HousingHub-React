import Link from 'next/link'
import Head from 'next/head'

export default function Forum() {
    return (
        <>
            <Head><title>Forum: Tufts Housing Hub</title></Head>
            <h1>Forum</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </>
    )
}
