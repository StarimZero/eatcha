import React from 'react'
import { Container, Row, Button, Col, Badge } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from './HomePage';
import BottomePage from './BottomePage';
import { CiBellOn } from "react-icons/ci";
import { Link, Route, Routes } from 'react-router-dom';
import RestaurantRouter from './router/RestaurantRouter';
import MemberRouter from './router/MemberRouter';
import FriendsRouter from './router/FriendsRouter';
import BadgeRouter from './router/BadgeRouter';
import MenuRouter from './router/MenuRouter';


const MenuPage = () => {
    const uid = sessionStorage.getItem("uid")
    const onClickLogout = (e) => {
        e.preventDefault();
        if (!window.confirm("로그아웃 하시겠습니까?")) return;
        sessionStorage.clear();
        window.location.href = "/";
    }
    return (
        <>
            <Row>
                <Col style={{ background: "gray" }}>
                    <Navbar expand="lg" >
                        <Container fluid>
                            <Navbar.Brand href="/"><img src={"/image/badge/mainlogo2.jpg" || "http://via.placeholder.com/50x50"} width={"5%"} /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav.Link href="/restaurant/insert"><Badge bg='warning' text='dark' className='me-2'>식당등록하기</Badge></Nav.Link>
                                <Nav.Link href="/restaurant/list"><Badge bg='danger' className='me-2'>전체식당리스트</Badge></Nav.Link>
                                <Nav.Link href="/member/list.json"><Badge className='me-2'>전체회원리스트</Badge></Nav.Link>
                                <Nav.Link href="/friends/admin/list.json"><Badge bg='dark' className='me-2'>전체친구리스트</Badge></Nav.Link>
                                <Nav.Link href="/badge/create"><Badge bg='success' className='me-2'>뱃지만들기</Badge></Nav.Link>
                                <Nav.Link href={"/badge/list.json"}><Badge bg='light' text='dark' className='me-2'>전체뱃지리스트</Badge></Nav.Link>
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                                <Nav.Link href="#action2" style={{ fontSize: "25px" }}><CiBellOn />　</Nav.Link>
                                {uid ?
                                    <>
                                        <Nav.Link href={`/member/rating/${uid}`}>{uid}님 환영합니다</Nav.Link>
                                        <Button size='sm' variant='outline-warning' onClick={onClickLogout}>로그아웃</Button>
                                    </>
                                    :
                                    <>
                                        <Nav.Link href="/member/login">로그인　　</Nav.Link>
                                        <Link to="/member/join"><Button size='sm' variant='outline-warning'>회원가입</Button></Link>
                                    </>
                                }
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col lg={1} style={{ background: "gray" }} className='text-center'>
                    <div>유저메뉴</div>
                    <div><Link to={"/friends/list.json"}><Badge>친구목록</Badge></Link></div>
                    <div><Link to={"/badge/list.json"}><Badge>뱃지목록</Badge></Link></div>
                    <div><Link to={"/restaurant/list/top10page"}><Badge>top10</Badge></Link></div>
                    <div>유저기능4</div>
                    <div>유저기능5</div>
                    <div>유저기능6</div>
                    <div>유저기능7</div>
                    <div>유저기능8</div>
                </Col>
                <Col lg={10}>
                    <Row>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/restaurant/*' element={<RestaurantRouter />} />
                            <Route path='/member/*' element={<MemberRouter />} />
                            <Route path='/friends/*' element={<FriendsRouter />} />
                            <Route path='/badge/*' element={<BadgeRouter />} />
                            <Route path='/menu/*' element={<MenuRouter />} />
                        </Routes>
                    </Row>
                </Col>
            </Row>
            <Row className='pt-0'>
                <BottomePage />
            </Row>
        </>
    )
}

export default MenuPage