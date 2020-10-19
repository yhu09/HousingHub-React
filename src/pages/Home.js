import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Services from '../components/Services'

export const Home = () => {
    return (  
        //React Fragment
        <>
            <Hero hero="defaultHero">
                <Banner title="Nice House!" subtitle="It will cost you $1000 a month">
                    <Link to="/houses" className="btn-primary">Checkout our reviews</Link>
                </Banner>
            </Hero>
            <Services />
        </>
    )
}
