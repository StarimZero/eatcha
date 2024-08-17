import axios from 'axios'
import React, { useEffect, Component, useState } from 'react'
import Slider from "react-slick";
import { Card } from 'react-bootstrap';
const Top10Slider = () => {
    const [list, setList] = useState([])
    const callAPI = async () => {
        const res = await axios.get(`/restaurant/list/toplist`)
        console.log(res.data)
        setList(res.data)
    }
    useEffect(() => {
        callAPI();
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    const containerStyle = {
        width: '100%',
        margin: 'auto',
    };

    const cardStyle = {
        position: 'relative',
    };

    const imageWrapperStyle = {
        position: 'relative',
    };

    const imgStyle = {
        display: 'block',
        width: '100%',
        height: 'auto',
    };

    const badgeStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '14px',
    };

    const nameStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '14px',
    };

    return (
        <div style={containerStyle}>
            <Slider {...settings}>
                {list.map((l, index) => (
                    <div key={l.restaurant_id} style={cardStyle}>
                        <Card style={{ position: 'relative' }}>
                            <div style={imageWrapperStyle}>
                                <Card.Img variant="top" src={l.restaurant_thumb} style={imgStyle} />
                                <div style={badgeStyle}>{index + 1}</div>
                                <div style={nameStyle}>{l.restaurant_name}</div>
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
export default Top10Slider
