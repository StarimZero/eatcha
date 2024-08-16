import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Badge, Row, Col, Button, Collapse } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BadgeListPage = () => {
    const [list, setList] = useState([]);
    const [openBadge, setOpenBadge] = useState(null);
    const navi = useNavigate();
    const callAPI = async () => {
        const res = await axios.get(`/badge/list`)
        console.log(res.data);
        setList(res.data)
    }
    const handleToggle = (badgeKey) => {
        setOpenBadge(openBadge === badgeKey ? null : badgeKey);
    }

    useEffect(() => { callAPI() }, [])
    return (
        <div>
            <h3 className='text-center'>전체 뱃지 목록</h3>
            <Row className='justify-content-center'>
                <Col xs={8}>
                    <Row>
                        {list.map(badge =>
                            <Col xs={8} md={6} lg={2} className='mx-0' key={badge.badge_key}>
                                <Card style={{ width: "10rem" }} className='mt-2'>
                                    <Card.Img variant="top" src={badge.badge_img} />
                                    <Card.Body className='text-center px-0 py-2'>
                                        <Card.Title style={{ fontSize: "1rem" }}>{badge.badge_name}</Card.Title>
                                        <div>
                                            <Button
                                                variant="primary"
                                                size='sm'
                                                onClick={() => handleToggle(badge.badge_key)}
                                            >
                                                {openBadge === badge.badge_key ? '숨기기' : '자세히보기'}
                                            </Button>
                                        </div>
                                        <Collapse in={openBadge === badge.badge_key}>
                                            <div>
                                                <Card.Text>{badge.badge_key}</Card.Text>
                                                <Card.Text>{badge.badge_text}</Card.Text>
                                                <Card.Text>{badge.badge_req}</Card.Text>
                                                <div className='mt-2'>
                                                    <Button
                                                        className='me-1'
                                                        variant="success"
                                                        size='sm'
                                                        onClick={() => navi(`/badge/update/${badge.badge_key}`)}
                                                    >수정</Button>
                                                    <Button
                                                        variant="danger"
                                                        size='sm'
                                                    >삭제</Button>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default BadgeListPage