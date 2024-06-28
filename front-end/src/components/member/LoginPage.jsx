import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navi = useNavigate();
    const [form, setform] = useState({
        uid: 'seop',
        password: 'pass'
    })

    const { uid, password } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/member/login', { uid, password })
        console.log(res.data.result);
        if (res.data.result === 0) {
            alert("아이디가 없습니다")
        } else if (res.data.result === 1) {
            alert("비밀번호가 일치하지 않습니다")
        } else if (res.data.result === 2) {
            sessionStorage.setItem("uid", uid);
            alert("로그인 성공")
            if (sessionStorage.getItem('target')) {
                window.location.href = sessionStorage.getItem('target')
            } else {
                window.location.href="/"
            }
        }

    }
    return (
        <Row className='justify-content-center' >
            <Col xs={6} className='justify-cotent-center'>
                <Card style={{width:"50rem"}} className='text-center mt-5 o-hidden border-0 shadow-lg '>
                    <Row className='justify-content-center' >
                        <Col xs={12} md={5} lg={6} className='d-flex justify-content-center align-items-center'>
                            <img src='/image/badge/mainlogo2.jpg' style={{width:"20rem"}} />
                        </Col>
                        <Col xs={12} md={5} lg={6} className='d-flex justify-content-center align-items-center'>
                            <div className='loginbox px-0'>
                                <form onSubmit={onSubmit}>
                                    <InputGroup className='h-25'>
                                        <InputGroup.Text className=' justify-content-center bg-dark text-white w-25'><b>ID</b></InputGroup.Text>
                                        <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                                    </InputGroup >
                                    <InputGroup>
                                        <InputGroup.Text className='justify-content-center bg-dark text-white w-25'><b>PW</b></InputGroup.Text>
                                        <Form.Control name="password" value={password} onChange={onChangeForm} />
                                    </InputGroup>
                                    <Button className='w-100 mt-2 btn-warning' type='submit' ><b>LOGIN</b></Button>
                                    <div className='text-center mt-2'>
                                        <span>
                                            <a href='/member/join'>회원가입</a>
                                        </span>
                                        <span className='mx-3'>
                                            <a href='/member/searchId'>아이디 찾기</a>
                                        </span>
                                        <span>
                                            <a href='/member/searchPass'>비밀번호 찾기</a>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

    )
}

export default LoginPage