import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PiNotebookDuotone } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap'

const MyBadgePage = () => {
    const { uid } = useParams();
    const [list, setList] = useState([]);
    const [count, setCount] = useState();
    const navi = useNavigate();
    const callAPI = async () => {
        const res = await axios.get(`/badge/list/${uid}`)
        console.log(res.data)
        setList(res.data)
    }

    useEffect(() => {
        callAPI();
    }, [])
    return (
        <Row className='my-5 justify-content-center'>
            <Col xs={8}>
                <Row>
                    <Col xs={3} className='text-center'>
                        <img src={"http://via.placeholder.com/200x200"} style={{ borderRadius: '50%', width: "4rem", height: "4rem" }} />
                    </Col>
                    <Col xs={4}>
                        <Card style={{ cursor: "pointer", padding: "20px" }}>
                            <div className='text-center'>
                                <span className='me-1'>보유한 뱃지</span>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card style={{ cursor: "pointer", padding: "20px" }}>
                            <div className='text-center'>
                                팔로워 15
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row className='my-5'>
                    {list.map(bdg =>
                        <Col xs={8} md={6} lg={2} className='mx-0' key={bdg.badge_key}>
                            <Card style={{ width: "10rem" }}>
                                <Card.Img variant="top" src={bdg.badge_img} />
                                <Card.Body className='text-center px-0 py-2'>
                                    <Card.Title style={{ fontSize: "1rem" }}>{bdg.badge_name}</Card.Title>
                                    <Card.Body>
                                        {bdg.badge_text}
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

export default MyBadgePage