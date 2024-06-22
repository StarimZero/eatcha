import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navi=useNavigate();
    const [form, setform] = useState({
        uid: 'seop',
        password: 'pass'
    })

    const {uid, password} = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res= await axios.post('/member/login', {uid,password})
        console.log(res.data.result);
        if(res.data.result===0){
            alert("아이디가 없습니다")
        }else if(res.data.result===1){
            alert("비밀번호가 일치하지 않습니다")
        }else if(res.data.result===2){
            sessionStorage.setItem("uid",uid);
            alert("로그인 성공")
            if (sessionStorage.getItem('target')) {
                window.location.href = sessionStorage.getItem('target')
            } else {
                navi('/')
            }
        }
        
    }
    return (
        <Row className='justify-content-center my-5'>
            <Col xs={8} md={6} lg={4} className='justify-content-end'>
                {/* <img src="/images/sideLogin02.png" width={"100%"} /> */}
            </Col>
            <Col xs={8} md={6} lg={4} >
                <div>
                    <form className='mt-5' onSubmit={onSubmit}>
                        <InputGroup className='h-25'>
                            <InputGroup.Text className=' justify-content-center '>ID</InputGroup.Text>
                            <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup>
                            <InputGroup.Text className='justify-content-center ' >PW</InputGroup.Text>
                            <Form.Control name="password" value={password}  onChange={onChangeForm} />
                        </InputGroup>
                        <Button className='w-100 mt-2 btn-warning' type='submit' >Sign in</Button>
                        <div className='text-center'>
                            <span>
                                <a href='/member/join'>회원가입</a>
                            </span>
                            <span className='mx-3'>
                                <a href='/user/searchpage'>아이디/비밀번호 찾기</a>
                            </span>
                        </div>
                    </form>
                </div>
            </Col>
        </Row>
    )
}

export default LoginPage