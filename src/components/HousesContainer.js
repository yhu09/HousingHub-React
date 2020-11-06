import React from 'react'
import HousesFilter from '../components/HousesFilter'
import HousesList from '../components/HousesList'
import { withHouseConsumer } from '../context'
import Loading from './Loading'

function HousesContainer({ context }) {
    const { loading, sorterHouses, houses } = context;
    if (loading) {
        return <Loading />;
    }
    return (
    <>
        <HousesFilter houses={houses} />
        <HousesList houses={sorterHouses}/>
    </>);
}

export default withHouseConsumer(HousesContainer)


// export default function HousesContainer() {
//     return (
//         <HouseConsumer>
//             { value => {
//                 const { loading, sortedHouses, houses } = value
//                 if (loading) {
//                     return  <Loading/>;
//                 }
//                 return (<div>
//                     Hello from HousesContainer
//                     <HousesFilter houses={houses} />
//                     <HousesList />
//                 </div>);
//             }}
//         </HouseConsumer>

//     );
// }


