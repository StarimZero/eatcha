import React from 'react'
import { Container, Row, Button, Col, Badge } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from './HomePage';
import BottomePage from './BottomePage';
import { CiBellOn } from "react-icons/ci";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import RestaurantRouter from './router/RestaurantRouter';
import MemberRouter from './router/MemberRouter';
import FriendsRouter from './router/FriendsRouter';
import BadgeRouter from './router/BadgeRouter';
import MenuRouter from './router/MenuRouter';
import SearchIcon from '@mui/icons-material/Search';
import Inventory2Icon from '@mui/icons-material/Inventory2';
const MenuPage = () => {
    const uid = sessionStorage.getItem("uid")
    const navi=useNavigate();
    const onClickLogout = (e) => {
        e.preventDefault();
        if (!window.confirm("로그아웃 하시겠습니까?")) return;
        sessionStorage.clear();
        window.location.href = "/";
    }
    return (
        <>
            <Row>
                <Col style={{ background: "#141517" }}>
                    <Navbar expand="lg">
                        <Container fluid>
                            <Navbar.Brand href="/"><img className='ms-3' src={"/image/eatcha.png" || "http://via.placeholder.com/50x50"} style={{ width: "6rem" }} /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                {uid === 'admin' &&
                                    <>
                                        <Nav.Link href="/restaurant/insert"><Badge bg='warning' text='dark' className='me-2'>식당등록하기</Badge></Nav.Link>
                                        <Nav.Link href="/restaurant/list"><Badge bg='danger' className='me-2'>전체식당리스트</Badge></Nav.Link>
                                        <Nav.Link href="/member/list.json"><Badge className='me-2'>전체회원리스트</Badge></Nav.Link>
                                        <Nav.Link href="/friends/admin/list.json"><Badge bg='dark' className='me-2'>전체친구리스트</Badge></Nav.Link>
                                        <Nav.Link href="/badge/create"><Badge bg='success' className='me-2'>뱃지만들기</Badge></Nav.Link>
                                        <Nav.Link href={"/badge/list.json"}><Badge bg='light' text='dark' className='me-2'>전체뱃지리스트</Badge></Nav.Link>
                                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                                    </>
                                }
                                <Nav.Link href="#action2" style={{ fontSize: "25px" }}><CiBellOn /></Nav.Link>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                                    {uid ?
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Nav.Link href={`/member/rating/${uid}`}><span style={{ fontSize:"1.5rem",color: 'white' }}>{uid}님 환영합니다</span></Nav.Link>
                                            <Button size='sm' variant='warning' onClick={onClickLogout}>로그아웃</Button>
                                        </div>
                                        :
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Nav.Link href="/member/login"><span style={{ fontSize:"1.5rem",color: 'white' }}>로그인</span></Nav.Link>
                                            <Link to="/member/join"><Button size='sm' variant='warning'>회원가입</Button></Link>
                                        </div>
                                    }
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row >
            <Row>
                <Col lg={1} style={{ background: "#141517" }} className='text-center'>
                    <div className='my-2' onClick={()=>navi('/restaurant/total')}><span style={{ color: 'white' , fontSize:"1.2rem", cursor:"pointer" }}>찾기<SearchIcon style={{fontSize:"2rem"}} /></span></div>
                    <div  onClick={()=>navi(`/badge/${uid}`)}><span style={{ color: 'white' , fontSize:"1.2rem", cursor:"pointer" }}>보관함<Inventory2Icon style={{fontSize:"2rem"}} /></span></div>
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