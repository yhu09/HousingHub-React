import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Forum() {
    return (
        <Layout>
            <Head><title>Forum: Tufts Housing Hub</title></Head>
            <h1>Forum</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </Layout>
    )
}
