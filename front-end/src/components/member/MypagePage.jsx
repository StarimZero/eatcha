import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card, } from 'react-bootstrap';
import PassModal from './PassModal';

const MypagePage = () => {
    const [form, setform] = useState({
        uid: sessionStorage.getItem("uid"),
        name: '',
        password: '',
        phone: '',
        gender: '',
        birth: '',
        regDate: '',
        fmtdate: '',
        fmtbirth: '',
        exp: ''
    })
    const { uid, name, phone, gender, exp, birth, regDate, fmtbirth, fmtdate } = form;
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const callAPI = async () => {
        const res = await axios.get(`/member//user?uid=${uid}`)
        const user = res.data;
        console.log(user)
        const gender = user.member_user_gender === 1 ? '남자' : '여자';
        const updatedForm = {
            ...form,
            name: user.member_user_name,
            phone: user.member_user_phone,
            regDate: user.member_user_regDate,
            gender: gender,
            birth: user.member_user_birth,
            fmtbirth: user.fmtbirth,
            fmtdate: user.fmtdate,
            exp: user.member_user_exp
        };
        console.log(updatedForm)
        setform(updatedForm);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const onClickUpdate = async () => {
        if (!window.confirm("정보를 수정하시겠습니까?")) return;
        await axios.post('/member/update',form)
        alert("정보수정완료!")
    }
    return (
        <div>
            <Row className='justify-content-center my-5 mypage userLogin'>
                <Col xs={12} md={10} lg={8}>
                    <Card>
                        <Card.Header className='bg-dark'>
                            <h3 className='text-center mt-2' style={{ color: "white" }}>마이페이지</h3>
                        </Card.Header>
                        <Card.Body>
                            <form >
                                <Row className='justify-content-center text-center'>
                                    <Col className='mt-2'>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >아이디</InputGroup.Text>
                                            <Form.Control name="uid" value={uid} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >이름</InputGroup.Text>
                                            <Form.Control name="name" value={name} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >비밀번호</InputGroup.Text>
                                            <PassModal />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >전화번호</InputGroup.Text>
                                            <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >생년월일</InputGroup.Text>
                                            <Form.Control name="birth" value={form.fmtbirth} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >성별</InputGroup.Text>
                                            <Form.Control name="gender" value={gender} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >경험치</InputGroup.Text>
                                            <Form.Control name="exp" value={exp} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text >가입일</InputGroup.Text>
                                            <Form.Control name="member_user_regDate" value={form.fmtdate} readOnly />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <div className='text-center mt-3'>
                                    <Button className='me-1' variant='warning' onClick={onClickUpdate}>정보수정</Button>
                                    <Button variant='secondary' onClick={callAPI}>수정취소</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MypagePage