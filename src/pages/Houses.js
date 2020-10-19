import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'


export const Houses = () => {
    return (
        <div>
            <Hero hero = "roomsHero">
                <Banner title = "Reviewed Houses" subtitle = "from actual students">
                    <Link to = "/" className = "btn-primary">Home</Link>
                </Banner>
            </Hero>
        </div>
    )
}
