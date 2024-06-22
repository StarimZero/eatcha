import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card, } from 'react-bootstrap';
import PassModal from './PassModal';
import { useParams } from 'react-router-dom';

const UpdatePage = () => {
  const param = useParams();
  const key = param.member_user_key;
  const [form, setform] = useState({
    key: key,
    member_user_uid: '',
    member_user_name: '',
    member_user_password: '',
    member_user_phone: '',
    member_user_gender: '',
    member_user_birth: '',
    member_user_regDate: '',
    member_user_grade: '',
    member_user_exp: '',
    member_user_auth: '',
    fmtdate: '',
    fmtbirth: '',
    member_user_exp: ''
  })

  const { member_user_uid,
    member_user_name,
    member_user_phone,
    member_user_gender,
    member_user_exp,
    member_user_password,
    member_user_auth,
    member_user_grade,
    member_user_birth,
    member_user_regDate,
    fmtbirth,
    fmtdate } = form;

  const onChangeForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const callAPI = async () => {
    const res = await axios.get(`/member/admin/user?key=${key}`)
    setform(res.data)
  }

  useEffect(() => {
    callAPI();
  }, [])

  const onClickUpdate = async () => {
    if (!window.confirm("정보를 수정하시겠습니까?")) return;
    await axios.post('/member/admin/update', { 
      uid:member_user_uid,
      name:member_user_name,
      phone:member_user_phone,
      gender:member_user_gender,
      exp:member_user_exp,
      pass:member_user_password,
      auth:member_user_auth,
      grade:member_user_grade,
      birth:member_user_birth})
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
                      <InputGroup.Text >key</InputGroup.Text>
                      <Form.Control name="key" value={key} readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >아이디</InputGroup.Text>
                      <Form.Control name="member_user_uid" value={member_user_uid} readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >이름</InputGroup.Text>
                      <Form.Control name="member_user_name" value={member_user_name} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >비밀번호</InputGroup.Text>
                      <Form.Control name="member_user_password" value={member_user_password} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >전화번호</InputGroup.Text>
                      <Form.Control name="member_user_phone" value={member_user_phone} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >생년월일</InputGroup.Text>
                      <Form.Control type='datetime' name="fmtbirth" value={fmtbirth} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >성별</InputGroup.Text>
                      <Form.Check
                        type="radio"
                        name="member_user_gender"
                        id="male"
                        label="남자"
                        value={1}
                        checked={member_user_gender === 1}
                        onChange={onChangeForm}
                      />
                      <Form.Check
                        type="radio"
                        name="member_user_gender"
                        id="female"
                        label="여자"
                        value={2}
                        checked={member_user_gender === 2}
                        onChange={onChangeForm}
                      />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >경험치</InputGroup.Text>
                      <Form.Control name="exp" value={member_user_exp} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >등급</InputGroup.Text>
                      <Form.Control name="grade" value={member_user_grade} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >권한</InputGroup.Text>
                      <Form.Control name="auth" value={member_user_auth} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text >가입일</InputGroup.Text>
                      <Form.Control name="member_user_regDate" value={fmtdate} readOnly />
                    </InputGroup>
                  </Col>
                </Row>
                <div className='text-center mt-3'>
                  <Button className='me-1' variant='warning' onClick={onClickUpdate}>정보수정</Button>
                  <Button variant='secondary'>수정취소</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UpdatePage