import React from 'react'
import HousesFilter from '../components/HousesFilter'
import HousesList from '../components/HousesList'
import { withHouseConsumer } from '../context'
import Loading from './Loading'

function HousesContainer({ context }) {
    const { loading, sortedHouses, houses } = context;
    if (loading) {
        return <Loading />;
    }
    console.log(sortedHouses);
    return (
    <>
        <HousesFilter houses={houses} />
        <HousesList houses={sortedHouses}/>
    </>);
}

export default withHouseConsumer(HousesContainer)



