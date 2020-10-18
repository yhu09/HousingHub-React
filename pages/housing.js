import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Housing() {
    return (
        <Layout>
            <Head><title>Housing: Tufts Housing Hub</title></Head>
            <h1>Housing</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </Layout>
    )
}
