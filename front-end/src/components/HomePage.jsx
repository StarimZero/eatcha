import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Top10Slider from './main/Top10Slider';
import RecomandSlider from './main/RecomandSlider';
import New10Slider from './main/New10Slider';

const HomePage = () => {
    const uid= sessionStorage.getItem("uid")
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
           
            <div className='my-4 justify-content-center'>
                <h5>Best Eatcha</h5>
                <Top10Slider />
            </div>
            <div className='my-4 justify-content-center'>
                <h5>추천 맛집 TOP 10</h5>
                <RecomandSlider />
            </div>
            <div className='my-4 justify-content-center'>
                <h5>새로 등록된 Eatcha 10</h5>
                <New10Slider />
            </div>
        </Container>
    )
}

export default HomePage