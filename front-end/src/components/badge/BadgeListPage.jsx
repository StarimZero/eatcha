import axios from 'axios'
import React, { useEffect } from 'react'
import { Card, Badge, Row, Col, Button } from 'react-bootstrap'

const BadgeListPage = () => {
    const uid= sessionStorage.getItem("uid");
    const callAPI= async ()=>{
        const res = await axios.get(`/badge/list?uid=${uid}`)
        console.log(res.data);
    }

    useEffect(()=>{callAPI()},[])
    return (
        <div>
            <h3>뱃지보관함</h3>
            <Row className='jutify-content-center'>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/start.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>오늘부터 1일</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/china.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>메이드인차이나</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/donkkas.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>돈까스킬러</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/burgerking.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>버거대왕</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/goonae.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>구내식당청소기</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/sushi.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>미스터초밥왕</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/kookbab.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>든든국밥</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/hansik.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>한식마니아</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/vietnam.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>쌀국수여행</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/beef.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>소고기없이못살아</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/bread.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>밥보단빵</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/great.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>참잘먹었어요</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/1day1ck.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>1일1닭</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/likepig.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>사람보다돼지</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8} md={6} lg={2} className='mx-0'>
                    <Card style={{ width: "10rem" }}>
                        <Card.Img variant="top" src='/image/lunchlee.png' />
                        <Card.Body className='text-center px-0 py-2'>
                            <Card.Title style={{fontSize:"1rem"}}>점심시간이동진</Card.Title>
                            <Button variant="primary" size='sm'>자세히보기(숨김예정)</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BadgeListPage