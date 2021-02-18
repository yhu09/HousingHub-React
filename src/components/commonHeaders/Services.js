import React, { Component } from 'react'
import Title from './Title'
import { FaTired, FaComment, FaEyeSlash, FaTemperatureHigh } from 'react-icons/fa'


export default class Services extends Component {
    state = {
        services: [{
            icon: <FaTired />,
            title: "No more headaches!",
            info: "Tufts Housing Hub makes it easy to connect students who are looking for a lease with students who are looking to pass theirs down."
        },
        {
            icon: <FaComment />,
            title: "Community of students",
            info: "Designed by Tufts students, for Tufts students! Users can ask questions about apartments, read reviews, and connect with current tenants to learn more."
        }, {
            icon: <FaEyeSlash />,
            title: "No more going in blind!",
            info: "Current tenants can write reviews of their apartment so that potential new tenants or sublettors know everything they need to know about their new home."
        // }, {
        //     icon: <FaTemperatureHigh />,
        //     title: "Furnace breaks",
        //     info: "condition of your furnace Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        // }]
      }]
    }
    render() {
        return (
            <section className="services">
                <Title title="Why Tufts Housing Hub?" />
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
