import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Map, MapMarker, CustomOverlayMap  } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

const MapPage = () => {


    const [info, setInfo] = useState("");
    const {restaurant_id} = useParams();
    const callAPI = async() => {

        const res = await axios.get(`/restaurant/read/${restaurant_id}`)
        console.log(res.data);
        setInfo(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])


  return (
    <Container>
        <Row>
            <Col>
                {info && (
                <div>
                    <Map 
                    center={{ lat:`${info.restaurant_y}`, lng: `${info.restaurant_x}` }} 
                    style={{ width: '40rem', height: '40rem' }}
                    level={3} 
                    >
                        <MapMarker // 마커를 생성합니다
                            position={{
                            // 마커가 표시될 위치입니다
                            lat:`${info.restaurant_y}`,
                            lng: `${info.restaurant_x}`,
                            }}
                        />
                    </Map>
                </div>
                 )}
            </Col>
        </Row>
    </Container>
  )
}

export default MapPage