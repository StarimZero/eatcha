import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Stars from '../common/Stars'
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useLocation } from 'react-router-dom';

const ReviewPage = ({ restaurant_id }) => {
    const uid = sessionStorage.getItem('uid');
    const { pathname } = useLocation();
    const [review, setReview] = useState([]);
    const [contents, setContents] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [rating, setRating] = useState(0);

    // 리뷰 리스트 출력
    const callAPI = async () => {
        const url = `/review/list/${restaurant_id}?page=${page}&size=${size}`;
        const res = await axios.get(url);
        console.log(res.data.documents);
        const data = res.data.documents.map(doc =>
            doc && { ...doc, isEllip: true, isEdit: false, text: doc.contents, num: doc.rating });
        setReview(data);
        setTotal(res.data.total);
        setRating(0);
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    // 비로그인일 때 댓글 등록 버튼 클릭 시
    const onClickRegister = () => {
        sessionStorage.setItem('target', pathname);
        window.location.href = '/member/login';
    }

    // 로그인 후, 댓글 등록 버튼 클릭 시
    const onClickInsert = async () => {
        if (contents === '') {
            alert('댓글 내용을 입력하세요!');
            return;
        }
        const res = await axios.post('/review/insert', {member_user_uid:uid , contents, restaurant_id, rating});
        await axios.post('/review/update/exp',{uid})
        console.log(res.data);
        setContents('');
        callAPI();
    }

    // 생략 댓글 상세보기
    const onClickContents = (review_id) => {
        const data = review.map(r => r.review_id === review_id ? { ...r, isEllip: !r.isEllip } : { ...r, isEllip: true });
        setReview(data);
    }

    // 댓글 삭제 버튼 클릭 시
    const onClickDelete = async (review_id) => {
        if (!window.confirm('해당 댓글을 삭제하겠습니까?')) {
            return;
        }
        await axios.post('/review/delete', {review_id});
        alert('삭제 성공!');
        callAPI();
    }

    // 댓글 수정 버튼 클릭 시
    const onClickUpdate = (review_id) => {
        const data = review.map(r => r.review_id === review_id ? { ...r, isEdit: !r.isEdit } : { ...r, isEdit: false });
        setReview(data);
    }

    // 댓글 수정칸 변경 시
    const onChangeContent = (e, review_id) => {
        const data = review.map(r => r.review_id === review_id ? { ...r, contents: e.target.value } : r);
        setReview(data);
    }

    // 댓글 수정 완료 버튼 클릭 시
    const onClickSave = async (r) => {
        if (r.contents !== r.text || r.rating !== r.num) {
            if (!window.confirm('해당 댓글을 수정하시겠습니까?')) {
                return;
            }
            await axios.post('/review/update', {contents:r.contents , rating:r.rating , review_id: r.review_id});
            alert('수정 성공!');
        }
        callAPI();
    }

    // 수정 취소 버튼 클릭 시
    const onClickCancel = (r) => {
        if (r.contents !== r.text || r.rating !== r.num) {
            if (!window.confirm('해당 댓글 수정을 취소하시겠습니까?')) {
                return;
            } else {
                callAPI();
            }
        } else {
            callAPI();
        }
    }

    // 별점 가져오기
    const getRating = (rating) => {
        console.log(rating);
        setRating(rating);
    }

    const getReviewRating = (rating, review_id) => {
        // console.log(rating, '.............', rid);
        const data = review.map(r => r.review_id === review_id ? { ...r, rating: rating } : r);
        setReview(data);
    }

    return (
        <div>
            <Row className='justify-content-center'>
                <Col xs={12} md={10} lg={8}>
                    <Row>
                        <Col className='pt-2' xs="auto">
                            <h5>댓글 ({total})</h5>
                        </Col>
                        <Col className='pt-1'>
                            <Row>
                                <Col xs="auto">
                                    <Stars size={25} number={rating} disabled={false} getRating={getRating} />
                                </Col>
                                <Col className='pt-1'>
                                    <h5>({rating})</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {sessionStorage.getItem('uid') ?
                        <div className='mb-3'>
                            <form>
                                <Form.Control as="textarea" rows={5} value={contents} onChange={(e) => setContents(e.target.value)} />
                                <div className='text-end mt-2'>
                                    <Button className='px-3 pt-2' variant='dark' size='sm' onClick={onClickInsert}>등록</Button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className='text-end my-2'>
                            <Button className='px-3 pt-2' variant='dark' size='sm' onClick={onClickRegister}>댓글 등록</Button>
                        </div>
                    }
                    {review.map(r =>
                        <div key={r.review_id}>
                            <hr />
                            <Row style={{ fontsize: '15px' }} className='mb-2'>
                                <Col xs={8} md={8} lg={8}>
                                    <span className='me-1'>{r.member_user_name}({r.writer})</span>
                                    <Stars size={18} number={r.rating} disabled={(!uid === r.writer || !r.isEdit) && true}
                                        getRating={(e) => getReviewRating(e, r.review_id)} />
                                    <br />
                                    {r.fmtUpDate ?
                                        <span className='text-muted'>{r.fmtUpDate} (수정)</span>
                                        :
                                        <span className='text-muted me-3'>{r.fmtDate}</span>
                                    }
                                </Col>
                                {uid === r.writer && !r.isEdit &&
                                    <Col className='text-end'>
                                        <Button variant='outline-dark' size='sm' className='pt-2 me-2' onClick={() => onClickUpdate(r.review_id)}>수정</Button>
                                        <Button variant='outline-secondary' size='sm' className='pt-2' onClick={() => onClickDelete(r.review_id)}>삭제</Button>
                                    </Col>
                                }
                                {uid === r.writer && r.isEdit &&
                                    <Col className='text-end'>
                                        <Button variant='outline-dark' size='sm' className='pt-2 me-2' onClick={() => onClickSave(r)}>저장</Button>
                                        <Button variant='outline-secondary' size='sm' className='pt-2' onClick={() => onClickCancel(r)}>취소</Button>
                                    </Col>
                                }
                            </Row>
                            {r.isEdit ?
                                <div>
                                    <Form.Control as="textarea" rows={5} value={r.contents} onChange={(e) => onChangeContent(e, r.review_id)} />
                                </div>
                                :
                                <div className={r.isEllip ? 'ellipsis' : undefined} style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={() => onClickContents(r.review_id)}>
                                    {r.contents}
                                </div>
                            }
                        </div>
                    )}
                </Col>
            </Row>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)} />
            }
        </div>
    )
}

export default ReviewPage