import React from 'react';
import Hero from '../components/commonHeaders/Hero';
import Banner from '../components/commonHeaders/Banner'
import { Link } from 'react-router-dom'

export const Error = () => {
    return (
        <div>
            <Hero hero="defaultHero">
                <Banner title = "404" subtitle = "Request Not Found">
                    <Link to = "/" className = "btn-primary"> Home </Link>
                </Banner>
            </Hero>
        </div>
    )
}
