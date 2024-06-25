import React from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from './HomePage';
import BottomePage from './BottomePage';
import { CiBellOn } from "react-icons/ci";
import { Link, Route, Routes } from 'react-router-dom';
import RestaurantRouter from './router/RestaurantRouter';
import MemberRouter from './router/MemberRouter';


const MenuPage = () => {
    const uid = sessionStorage.getItem("uid")
    const onClickLogout = (e)=>{
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
                            <Navbar.Brand href="/"><img src="../image/mainlogo2.jpg" width={"5%"}/></Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav.Link href="/restaurant/list">ADMIN메뉴==========</Nav.Link>
                                <Nav.Link href="/restaurant/list">전체식당리스트</Nav.Link>
                                <Nav.Link href="/member/list.json">전체회원리스트</Nav.Link>
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                </Nav>
                                <Nav.Link href="#action2" style={{ fontSize: "25px" }}><CiBellOn />　</Nav.Link>
                                {uid ?
                                    <>
                                        <Nav.Link href={`/member/read/${uid}`}>{uid}님 환영합니다</Nav.Link>
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
                    <div>유저기능1</div>
                    <div>유저기능2</div>
                    <div>유저기능3</div>
                    <div>유저기능4</div>
                    <div>유저기능5</div>
                    <div>유저기능6</div>
                    <div>유저기능7</div>
                    <div>유저기능8</div>
                </Col>
                <Col>
                    <Row>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/restaurant/*' element={<RestaurantRouter />} />
                            <Route path='/member/*' element={<MemberRouter />} />
                        </Routes>
                    </Row>
                    <Row>
                        <BottomePage />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default MenuPage