import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Row, Col, Card, Form, InputGroup, Badge } from 'react-bootstrap'
import AddressModal from '../common/AddressModal'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, getStorage, listAll, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../firebaseInit'

const UpdatePage = () => {
    const navi = useNavigate();
    const [form, setForm] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const { restaurant_id } = useParams();
    const storage = getStorage(app)
    const [file, setFile] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);
    const refFile = useRef();
    const onChangeFile = (e) => {
        setFile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }

    const callAPI = async () => {
        const res = await axios.get(`/restaurant/read/${restaurant_id}`);
        console.log(res.data);
        setForm(res.data);
        setRestaurant(res.data);

        const attach = ref(storage, `images/${res.data.restaurant_name}`)
        const res1 = await listAll(attach)
        const urls = await Promise.all(res1.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
        }));
        setFileUrls(urls);
    }
    console.log(fileUrls[0])
    console.log(form.restaurant_thumb)

    useEffect(() => {
        callAPI();
    }, [])

    const uploadFile = async () => {
        if (!file) return "";
        const uuid = uuidv4().split('-')[0];
        const fileRef = ref(storage, `images/${form.restaurant_name}/${uuid}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onClickUpdate = async () => {
        if (JSON.stringify(restaurant) === JSON.stringify(form)) {
            alert("수정한내용이없습니다.")
            return;
        } else {
            if (!window.confirm("식당정보를 수정하시겠습니까?")) return;
            //수정하기
            const res = await axios.post(`/restaurant/update`, form);
            if (res.data.result === 1) {
                alert("식당정보수정완료")
                navi(`/restaurant/read/${restaurant_id}`);
            } else {
                alert("무엇인가 문제가 있습니다.")
                console.log(res.data.result)
            }
        }
    }

    const onClickDelete = async (photo) => {
        const extractFilePathFromUrl = (photo) => {
            const encodedPath = new URL(photo).pathname.split('/o/')[1];
            return decodeURIComponent(encodedPath);
        };
        const filePath = extractFilePathFromUrl(photo);
        console.log(`Deleting file at path: ${filePath}`); // 경로를 로그로 출력하여 확인
        const fileRef = ref(storage, filePath);
        // 파일 삭제
        await deleteObject(fileRef);
        alert("삭제완료!")
        callAPI();
    };

    const onUpdateMainPhoto = async (photo) => {
        try {
            await axios.post("/restaurant/update/thumb", { restaurant_id: restaurant_id, restaurant_thumb: photo });
            callAPI();
            alert("대표이미지 변경 완료!");
        } catch (error) {
            console.error("Error updating main photo:", error);
        }
    };

    const onClickImageSave = async () => {
        if (file.byte === null) return;
        if (!window.confirm("이미지를 추가하시겠습니까?")) return;
        try {
            const uuid = uuidv4().split('-')[0]
            const fileRef = ref(storage, `images/${form.restaurant_name}/${uuid}`);
            const snapshot = await uploadBytes(fileRef, file.byte); // 파일 업로드
            await getDownloadURL(snapshot.ref); // 업로드 완료 후 다운로드 URL 가져오기
            alert("이미치 추가 완료!");
            callAPI();
            setFile('')
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };



    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col lg={6}>
                    <Card>
                        <Card.Header>
                            <div className='text-center'>
                                <h1>식당 정보 수정하기</h1>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <div className='mb-3'>
                                    <Row>
                                        {fileUrls.length > 0 ? (
                                            fileUrls.map((url, index) => (
                                                <Col key={index} xs={3} className='mt-2'>
                                                    <div style={{ position: "relative" }}>
                                                        <span>
                                                            {url === form.restaurant_thumb ?
                                                                <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                                                                :
                                                                <Badge onClick={() => onUpdateMainPhoto(url)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                                                            }
                                                            <Badge onClick={() => onClickDelete(url)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} bg='danger'>X</Badge>
                                                        </span>
                                                    </div>
                                                    <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: "10rem", height: "10rem" }} />
                                                </Col>

                                            ))
                                        ) : (
                                            <p>파일이 없습니다.</p>
                                        )}
                                        <Col xs={3}>
                                            <img src={file.name || "/image/plus.png"} style={{ width: "10rem", height: "10rem", cursor: "pointer" }} onClick={() => refFile.current.click()} />
                                            <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                                            {file.name &&
                                                <div className="text-center mt-2"><Button onClick={onClickImageSave} size="sm">이미지 추가</Button></div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
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
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>엑스좌표</InputGroup.Text>
                                    <Form.Control name='restaurant_x' value={form.restaurant_x} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup className='mb-2' >
                                    <InputGroup.Text>와이좌표</InputGroup.Text>
                                    <Form.Control name='restaurant_y' value={form.restaurant_y} onChange={onChangeForm} />
                                </InputGroup>
                                <div className='text-end'>
                                    <Button className='me-2'>다시쓰기</Button>
                                    <Button onClick={onClickUpdate}>수정하기</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}

export default UpdatePage