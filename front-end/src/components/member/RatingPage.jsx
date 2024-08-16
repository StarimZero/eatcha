import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { PiNotebookDuotone } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineSettings } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Chart } from 'react-google-charts';

const RatingPage = () => {
    const navi = useNavigate();
    const { user_uid } = useParams();
    console.log(user_uid)
    const user_id = user_uid
    const [list, setList] = useState([]);
    const [total, setTotal] = useState('');
    const callAPI = async () => {
        const res = await axios.get(`/member/review/list/${user_id}`)
        setList(res.data.documents)
        setTotal(res.data.total)
        console.log(res.data.documents)
    }
    useEffect(() => { callAPI() }, [])

    const ratingCounts = list.reduce((acc, item) => {
        const rating = item.rating;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});

    const chartData = [
        ['', '리뷰수'],
        ...Object.keys(ratingCounts).map(rating => [rating, ratingCounts[rating]])
    ].sort((a, b) => a[0] - b[0]); // Sort by rating

    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col xs={8}>
                    <Row>
                        <Col xs={3} className='text-center'>
                            <img src={"http://via.placeholder.com/200x200"} style={{ borderRadius: '50%', width: "4rem", height: "4rem" }} />
                        </Col>
                        <Col xs={3}>
                            <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/diary/insert`)}>
                                <div className='text-center'>
                                    <span className='me-1'>리뷰 {total}</span>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card style={{ cursor: "pointer", padding: "20px" }}>
                                <div className='text-center'>
                                    팔로워 15
                                </div>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card style={{ cursor: "pointer", padding: "20px" }}>
                                <div className='text-center' >
                                    팔로잉 12
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row className='mt-2'>
                        <Col xs={5}>
                            <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/badge/${user_id}`)}>
                                <div className='text-center'>
                                    <span className='me-1'>뱃지 보관함</span>
                                    <PiNotebookDuotone style={{ fontSize: '23px', color: 'brown', verticalAlign: 'middle' }} />
                                </div>
                            </Card>
                        </Col>
                        <Col xs={5}>
                            <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/member/read/${user_id}`)}>
                                <div className='text-center'>
                                    <span className='me-1'>프로필 수정</span>
                                    <MdOutlineSettings style={{ fontSize: '23px', color: 'brown', verticalAlign: 'middle' }} />
                                </div>
                            </Card>
                        </Col>
                        <Col xs={2}>
                            <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/diary/insert`)}>
                                <div className='text-center'>
                                    <span className='me-1'>친구 추가 </span>
                                    <IoPersonAddSharp style={{ fontSize: '23px', color: 'brown', verticalAlign: 'middle' }} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div className='mt-4'>
                        <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="ColumnChart" // Use ColumnChart for vertical bars
                            loader={<div>Loading Chart...</div>}
                            data={chartData}
                            options={{
                                title: '평점 분포',
                                chartArea: { width: '60%' },
                            }}
                        />
                    </div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>식당이름</th>
                                    <th>평점</th>
                                    <th>한줄평</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((l, index) => (
                                    <tr key={l.review_id}>
                                        <td>{index + 1}</td> {/* 역순으로 표시된 인덱스 */}
                                        <td>{l.restaurant_name}</td> {/* Assuming restaurant_name is available */}
                                        <td>
                                            <Rating
                                                name={`rating-${l.review_id}`}
                                                value={l.rating}
                                                precision={0.1}
                                                readOnly
                                            />
                                        </td>
                                        <td>{l.contents}</td>
                                        <td>{l.fmtdate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RatingPage