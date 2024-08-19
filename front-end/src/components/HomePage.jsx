import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Top10Slider from './main/Top10Slider';
import RecomandSlider from './main/RecomandSlider';
import New10Slider from './main/New10Slider';

const HomePage = () => {
    const uid = sessionStorage.getItem("uid")
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState([]);

    const toInsert = () => {
        navigate(`/restaurant/insert`);
    }

    const callAPI = async () => {
        const res = await axios.get("/restaurant/list")
        console.log("sssssssssssssssssssssssssss", res.data)
        setRestaurant(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    return (
        <Container className='justify-content-center'>
            <div className='ms-5 mt-4 justify-content-center'>
                <div className='ms-5'><img src='/image/banner/001.png' style={{ width: "15rem" }} /></div>
                <Top10Slider />
            </div>
            <div className='ms-5 mb-4 justify-content-center'>
                <div className='ms-5'><img src='/image/banner/002.png' style={{ width: "15rem" }} /></div>
                <RecomandSlider />
            </div>
            <div className='ms-5 my-4 justify-content-center'>
                <div className='ms-5'><img src='/image/banner/003.png' style={{ width: "15rem" }} /></div>
                <New10Slider />
            </div>
        </Container>
    )
}

export default HomePage