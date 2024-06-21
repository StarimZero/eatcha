import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BsFillPinMapFill } from "react-icons/bs";


const ReadPage = () => {


    const [info, setInfo] = useState("");
    const {restaurant_name, restaurant_phone, restaurant_type, restaurant_url, restaurant_x, restaurant_y, restaurant_time, restaurant_etcinfo, restaurant_address1, restaurant_address2, restaurant_avgprice, regDate} =info

    const {restaurant_id} = useParams();
    const callAPI = async () => {
        const res = await axios.get(`/restaurant/read/${restaurant_id}`);
        console.log(res.data);
        setInfo(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onClickDelete = async () => {
        if(!window.confirm(`${restaurant_id}를 삭제하시겠습니까?`)) return;
        const res = await axios.post(`/restaurant/delete/${restaurant_id}`)
        console.log(res.data.result)
        if(res.data.result===1){
            alert("식당정보를 삭제하였습니다.")
            callAPI();
        }else{
            alert("무엇인가 문제가있습니다.")
        }
    }

  return (
    <Container>
        <Row className='justify-content-center my-5'>
            <Col lg={5}>
                <Card>
                    <Card.Header>
                        <h1>{restaurant_name} </h1>
                    </Card.Header>
                    <Card.Body>
                        <Row >
                            <Col className='text-center'>
                                <img src={"/image/GOJO.jpg" || "http://via.placeholder.com/300x300"} style={{width:"70%"}}/>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col lg={2}>
                                <Table>
                                    <tr>
                                        <td>주소</td>
                                    </tr>
                                    <tr>
                                        <td>영업시간</td>
                                    </tr>
                                    <tr>
                                        <td>평균가격</td>
                                    </tr>
                                    <tr>
                                        <td>기타정보</td>
                                    </tr>
                                    <tr>
                                        <td>네이버</td>
                                    </tr>
                                </Table>
                            </Col>
                            <Col>
                            <Table>
                                    <tr>
                                        <td>{restaurant_address1} {restaurant_address2} </td>
                                    </tr>
                                    <tr>
                                        <td>{restaurant_time || "?"} </td>
                                    </tr>
                                    <tr>
                                        <td>{restaurant_avgprice || "-"}원</td>
                                    </tr>
                                    <tr>
                                        <td>{restaurant_etcinfo || "-"} </td>
                                    </tr>
                                    <tr>
                                        <td>{restaurant_url || "-"} </td>
                                    </tr>
                                </Table>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <h5>메뉴</h5>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <h5>매장위치</h5>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <h5>리뷰</h5>
                                <Button onClick={onClickDelete}>식당삭제하기</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage