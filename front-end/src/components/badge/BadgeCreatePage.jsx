import React from 'react'
import { Row,Col,InputGroup,Card,Form,Button } from 'react-bootstrap'

const BadgeCreatePage = () => {
  return (
    <div>
        <h1>뱃지생성페이지</h1>
        <Row className='justify-content-center'>
                <Col xs={6} md={8} lg={10}>
                    <Card>
                        <Card.Header>
                            <div>
                               뱃지만들기
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col className='justify-content-center text-center px-0 py-0'>
                                    <img
                                        style={{ cursor: "pointer", width: "23rem", height: "23rem" }}
                                        src={ '/image/start.png'}>
                                    </img>
                                    <input  type="file"  />
                                    <div className='mt-1'><Button variant="dark" style={{ width: "300px" }}>이미지저장</Button></div>
                                </Col>
                                <Col>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>뱃지이름</InputGroup.Text>
                                        <Form.Control name="title"/>
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>뱃지내용</InputGroup.Text>
                                        <Form.Control name="price" />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>필요조건</InputGroup.Text>
                                        <Form.Control name="maker"  />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>요구경험치</InputGroup.Text>
                                        <Form.Control name="brand"  />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>카테고리</InputGroup.Text>
                                        <Form.Control name="category1" />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>카테고리2</InputGroup.Text>
                                        <Form.Control name="category2"  />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>카테고리3</InputGroup.Text>
                                        <Form.Control name="category3" />
                                    </InputGroup>
                                </Col>
                                <div className='text-center mt-2'>
                                    <Button className='me-2'>뱃지생성하기</Button>
                                    <Button>수정취소</Button>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    </div>
  )
}

export default BadgeCreatePage