import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import axios from 'axios';

const LoginPage = () => {
    const [form, setform] = useState({
        uid: '',
        password: ''
    })

    const {uid, password} = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onClickLogin= ()=>{
        const res= axios.get('/member/login',{uid,password})
        console.log(res.data)
    }
    return (
        <Row className='justify-content-center my-5 userLogin'>
            <Col xs={8} md={6} lg={4} className='justify-content-end'>
                {/* <img src="/images/sideLogin02.png" width={"100%"} /> */}
            </Col>
            <Col xs={8} md={6} lg={4} className='inputGroup'>
                <div>
                    <form className='mt-5'>
                        <InputGroup className='h-25'>
                            <InputGroup.Text className=' justify-content-center '>ID</InputGroup.Text>
                            <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup>
                            <InputGroup.Text className='justify-content-center ' >PW</InputGroup.Text>
                            <Form.Control name="upass" value={password} type='password' onChange={onChangeForm} />
                        </InputGroup>
                        <Button className='w-100 mt-2 btn-warning' onClick={onClickLogin} >Sign in</Button>
                        <div className='text-center mt-2 hreflink'>
                            <span>
                                <a href='/user/join'>회원가입</a>
                            </span>
                            <span className='mx-3'>
                                <a href='/user/searchpage'>이메일 찾기</a>
                            </span>
                            <span>
                                <a href='/user/join'>비밀번호 찾기</a>
                            </span>
                        </div>
                    </form>
                </div>
            </Col>
        </Row>
    )
}

export default LoginPage