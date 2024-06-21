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
      console.log(res.data)
      setRestaurant(res.data);
    }

    useEffect(()=>{
      callAPI();
    },[])

  return (
    <Container >
        <div>
            <Button onClick={toInsert}>식당정보등록하기</Button>
        </div>
        <Row className='justify-content-center'>
            {restaurant.map(info=> 
            <Col lg={4} >
                <Card className='mt-4 me-5'>
                    <Card.Header>
                        <h5>{info.restaurant_name}</h5>
                    </Card.Header>
                    <Card.Body>
                        <div className='text-center'><Link to={`/restaurant/read/${info.restaurant_id}`}><img src="http://via.placeholder.com/300x150"/></Link></div>
                    </Card.Body>
                    <Card.Footer>
                        
                    </Card.Footer>
                </Card>
            </Col>
            )}
        </Row>
    </Container>
  )
}

export default HomePage