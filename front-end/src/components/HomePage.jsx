import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState([]);

    const toInsert = () => {
        navigate(`/restaurant/insert`);
    }

    const callAPI = async () => {
      const res = await axios.get("/restaurant/list")
      console.log("sssssssssssssssssssssssssss",res.data)
      setRestaurant(res.data);
    }

    useEffect(()=>{
      callAPI();
    },[])

  return (
    <Container >
        <div>
            <Button onClick={toInsert} className='m-3'>식당정보등록하기</Button>
        </div>
        <Row className='justify-content-center'>
            {restaurant.map((info,index)=> 
            <Col lg={3} key={index}>
                <Card className='mt-4 me-5 ms-5' style={{width:"25rem"}}>
                    <Card.Header>
                        <h5>{info.restaurant_name}</h5>
                    </Card.Header>
                    <Card.Body>
                        <div className='text-center'><Link to={`/restaurant/read/${info.restaurant_id}`}><img src={info.restaurant_thumb||"http://via.placeholder.com/300x150"} style={{width:"300px",height:"150px"}}/></Link></div>
                    </Card.Body>
                </Card>
            </Col>
            )}
        </Row>
    </Container>
  )
}

export default HomePage