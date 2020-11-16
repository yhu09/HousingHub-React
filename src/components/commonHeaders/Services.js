import React, { Component } from 'react'
import Title from './Title'
import { FaTired, FaComment, FaEyeSlash, FaTemperatureHigh } from 'react-icons/fa'


export default class Services extends Component {
    state = {
        services: [{
            icon: <FaTired />,
            title: "Excruciating process",
            info: "Stressful Process Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu"
        },
        {
            icon: <FaComment />,
            title: "No Community",
            info: "talk with other students Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }, {
            icon: <FaEyeSlash />,
            title: "Hidden fees and small traps ",
            info: "'laundry machine takes quaters' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }, {
            icon: <FaTemperatureHigh />,
            title: "Furnace breaks",
            info: "condition of your furnace Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }]
    }
    render() {
        return (
            <section className="services">
                <Title title="Why?" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return (<article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>);
                    })}
                </div>
            </section>
        )
    }
}
