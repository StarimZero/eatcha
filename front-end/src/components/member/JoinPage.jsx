import React from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'

const JoinPage = () => {
    return (
        <div className='text-center'>
            <h1>회원가입페이지</h1>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>ID</InputGroup.Text>
                        <Form.Control name="uid"/>
                    </InputGroup >
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>PW</InputGroup.Text>
                        <Form.Control name="password"/>
                    </InputGroup >
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>이름</InputGroup.Text>
                        <Form.Control name="uname" />
                    </InputGroup >
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>전화번호</InputGroup.Text>
                        <Form.Control name="phone" />
                    </InputGroup >
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>성별</InputGroup.Text>
                        <Form.Control name="gender" />
                    </InputGroup >
                    <InputGroup className='h-25'>
                        <InputGroup.Text className='justify-content-center'>생년월일</InputGroup.Text>
                        <Form.Control name="birth" />
                    </InputGroup >
                    <div>
                        <Button>회원가입하기</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage