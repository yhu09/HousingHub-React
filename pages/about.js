import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'

export default function About() {
    return (
        <Layout>
            <Head><title>About: Tufts Housing Hub</title></Head>
            <h1>About</h1>
            <h2><Link href="/"><a>Back to home</a></Link></h2>
        </Layout>
    )
}
