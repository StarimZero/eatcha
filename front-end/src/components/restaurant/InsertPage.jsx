import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Container, InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import AddressModal from '../common/AddressModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const InsertPage = () => {
    const storage = getStorage(app)
    const [files, setFiles] = useState([]);
    const navi = useNavigate();
    const [form, setForm] = useState({
        restaurant_name: "",
        restaurant_type: "",
        restaurant_category:'',
        restaurant_time: "",
        restaurant_avgprice: "",
        restaurant_etcinfo: "",
        restaurant_address1: "",
        restaurant_address2: "",
        restaurant_phone: "",
        restaurant_url: "",
        restaurant_x: "",
        restaurant_y: "",
        restaurant_thumb: ""
    })

    const onChangeFile = (e) => {
        let selFiles = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = {
                name: URL.createObjectURL(e.target.files[i]),
                byte: e.target.files[i],
                sequence: i
            };
            selFiles.push(file);
        }
        setFiles(selFiles);
    };

    // 파일을 Firebase Storage에 업로드하는 함수
    const uploadFiles = async () => {
        const filePromises = files.map(async (file) => {
            const uuid = uuidv4().split('-')[0]
            const fileRef = ref(storage, `images/${form.restaurant_name}/${uuid}`);
            const snapshot = await uploadBytes(fileRef, file.byte); // 파일 업로드
            const url = await getDownloadURL(snapshot.ref); // 업로드 완료 후 다운로드 URL 가져오기
            return url; // 다운로드 URL 반환
        });
        return Promise.all(filePromises); // 모든 파일의 다운로드 URL을 배열로 반환
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (form.restaurant_name == "" || form.restaurant_type == 0) {
            alert("필수사항을 적어주세요")
        } else {
            if (!window.confirm("식당정보를 등록하시겠습니까?")) return;
            const urls = await uploadFiles();
            let thumbUrl = ""; // 기본값

            // URL 배열이 비어있지 않은 경우 첫 번째 URL을 thumbUrl에 저장
            if (urls.length > 0) {
                thumbUrl = urls[0];
            }

            // 상태를 업데이트 하지 않고 직접 데이터를 준비하여 전송
            const formData = {
                ...form,
                restaurant_thumb: thumbUrl
            };

            // 식당 정보 등록하기
            const res = await axios.post(`/restaurant/insert`, formData);

            console.log(res.data);
            if (res.data.result === 1) {
                await axios.post('/restaurant/insert/photo', { urls: urls })
                alert("등록이 완료되었습니다.")
                navi("/");
            } else {
                alert("무엇인가 문제가 있습니다.")
            }
        }
    }

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col lg={6}>
                    <Card>
                        <CardHeader>
                            <div className='text-center'>
                                <h1>식당 정보 추가하기</h1>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Row>
                                {files.map((f) => (
                                    <img src={f.name} alt="Preview" style={{ width: "100%", height: "auto", maxHeight: "150px", objectFit: "cover" }} />
                                ))}
                                </Row>
                                <InputGroup className='my-2'>
                                    <Form.Control type="file" onChange={onChangeFile} multiple />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>식당이름</InputGroup.Text>
                                    <Form.Control name='restaurant_name' value={form.restaurant_name} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>식당분류</InputGroup.Text>
                                    <Form.Select name='restaurant_type' value={form.restaurant_type} onChange={onChangeForm} >
                                        <option value="0">분류를 선택하세요</option>
                                        <option value="1">한식</option>
                                        <option value="2">중식</option>
                                        <option value="3">일식</option>
                                        <option value="4">양식</option>
                                        <option value="5">기타</option>
                                        <option value="6">베이커리</option>
                                        <option value="7">카페</option>
                                        <option value="8">패스트푸드</option>
                                        <option value="9">구내식당</option>
                                    </Form.Select>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>식당분류</InputGroup.Text>
                                    <Form.Select name='restaurant_category' value={form.restaurant_category} onChange={onChangeForm} >
                                        <option value="0">분류를 선택하세요</option>
                                        <option value="1">고기</option>
                                        <option value="2">해산물</option>
                                        <option value="3">채식</option>
                                        <option value="4">국밥</option>
                                        <option value="5">면</option>
                                        <option value="6">디저트</option>
                                        <option value="7">음료</option>
                                        <option value="8">밥</option>
                                        <option value="9">초밥</option>
                                        <option value="10">돈까스</option>
                                    </Form.Select>
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>운영시간</InputGroup.Text>
                                    <Form.Control name='restaurant_time' value={form.restaurant_time} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>평균비용</InputGroup.Text>
                                    <Form.Control name='restaurant_avgprice' value={form.restaurant_avgprice} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>기타정보</InputGroup.Text>
                                    <Form.Control name='restaurant_etcinfo' value={form.restaurant_etcinfo} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>식당주소</InputGroup.Text>
                                    <Form.Control name='restaurant_address1' value={form.restaurant_address1} onChange={onChangeForm} />
                                    <AddressModal setForm={setForm} form={form} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>상세주소</InputGroup.Text>
                                    <Form.Control name='restaurant_address2' value={form.restaurant_address2} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>식장전화</InputGroup.Text>
                                    <Form.Control name='restaurant_phone' value={form.restaurant_phone} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>지도링크</InputGroup.Text>
                                    <Form.Control name='restaurant_url' value={form.restaurant_url} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup hidden className='mb-2' >
                                    <InputGroup.Text>엑스좌표</InputGroup.Text>
                                    <Form.Control name='restaurant_x' value={form.restaurant_x} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup hidden className='mb-2' >
                                    <InputGroup.Text>와이좌표</InputGroup.Text>
                                    <Form.Control name='restaurant_y' value={form.restaurant_y} onChange={onChangeForm} />
                                </InputGroup>
                                <div className='text-end'>
                                    <Button className='me-2'>다시쓰기</Button>
                                    <Button type="submit">등록하기</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default InsertPage