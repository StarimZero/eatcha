import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, TextField, Box, Card, Grid, Divider, IconButton, Pagination, Rating, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Stars from '../common/Stars'; // MUI 스타일에 맞게 수정 필요
import { useLocation, useNavigate } from 'react-router-dom';


const ReviewPage = ({ restaurant_id, type, category }) => {
    const uid = sessionStorage.getItem('uid');
    const { pathname } = useLocation();
    const [reviews, setReviews] = useState([]);
    const [contents, setContents] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [rating, setRating] = useState(0);
    const navi= useNavigate();
    const callAPI = async () => {
        try {
            const url = `/review/list/${restaurant_id}?page=${page}&size=${size}`;
            const res = await axios.get(url);
            const data = res.data.documents.map(doc =>
                doc && { ...doc, isEllip: true, isEdit: false, text: doc.contents, num: doc.rating }
            );
            setReviews(data);
            setTotal(res.data.total);
            setRating(0);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        callAPI();
    }, [page]);

    const onClickRegister = () => {
        sessionStorage.setItem('target', pathname);
        window.location.href = '/member/login';
    };

    const onClickInsert = async () => {
        if (contents === '') {
            alert('댓글 내용을 입력하세요!');
            return;
        }
        try {
            const res = await axios.post('/review/insert', { member_user_uid: uid, contents, restaurant_id, rating, type, category });
            await axios.post('/review/update/exp', { uid });
            if (res.data.result === 1) {
                setContents('');
                callAPI();
                alert('리뷰등록 완료');
            }
        } catch (error) {
            console.error('Error inserting review:', error);
        }
    };

    const onClickContents = (review_id) => {
        setReviews(reviews.map(r => r.review_id === review_id ? { ...r, isEllip: !r.isEllip } : { ...r, isEllip: true }));
    };

    const onClickDelete = async (review_id) => {
        if (!window.confirm('해당 댓글을 삭제하겠습니까?')) return;
        try {
            await axios.post('/review/delete', { review_id });
            alert('삭제 성공!');
            callAPI();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const onClickUpdate = (review_id) => {
        setReviews(reviews.map(r => r.review_id === review_id ? { ...r, isEdit: !r.isEdit } : { ...r, isEdit: false }));
    };

    const onChangeContent = (e, review_id) => {
        setReviews(reviews.map(r => r.review_id === review_id ? { ...r, contents: e.target.value } : r));
    };

    const onClickSave = async (r) => {
        if (r.contents !== r.text || r.rating !== r.num) {
            if (!window.confirm('해당 댓글을 수정하시겠습니까?')) return;
            try {
                await axios.post('/review/update', { contents: r.contents, rating: r.rating, review_id: r.review_id });
                alert('수정 성공!');
            } catch (error) {
                console.error('Error updating review:', error);
            }
        }
        callAPI();
    };

    const onClickCancel = (r) => {
        if (r.contents !== r.text || r.rating !== r.num) {
            if (!window.confirm('해당 댓글 수정을 취소하시겠습니까?')) return;
        }
        callAPI();
    };

    const getRating = (rating) => {
        setRating(rating);
    };

    const getReviewRating = (rating, review_id) => {
        setReviews(reviews.map(r => r.review_id === review_id ? { ...r, rating: rating } : r));
    };

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
                댓글 ({total})
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Stars size={25} number={rating} disabled={false} getRating={getRating} />
                    </Grid>
                    <Grid item sx={{ ml: 2 }}>
                        <Typography variant="h6">({rating})</Typography>
                    </Grid>
                </Grid>
            </Box>
            {uid ? (
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        variant="outlined"
                    />
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={onClickInsert}>
                            등록
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ textAlign: 'right', mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={onClickRegister}>
                        댓글 등록
                    </Button>
                </Box>
            )}
            {reviews.map(r => (
                <Card key={r.review_id} sx={{ mb: 2, p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip
                                    onClick={()=>navi(`/member/rating/${r.writer}`)}
                                    label={`${r.member_user_name} (${r.writer})`}
                                    color="success"
                                    sx={{ fontSize: '0.875rem' }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 2, fontSize: '0.8rem', color: 'text.secondary' }}
                                >
                                    {r.fmtUpDate ? `${r.fmtUpDate} (수정)` : r.fmtDate}
                                </Typography>
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Rating
                                    name="read-only"
                                    value={r.rating / 2}
                                    readOnly
                                    precision={0.5}
                                    size="large"
                                />
                            </Box>
                        </Grid>
                        {uid === r.writer && !r.isEdit && (
                            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                                <IconButton color="primary" onClick={() => onClickUpdate(r.review_id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => onClickDelete(r.review_id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        )}
                        {uid === r.writer && r.isEdit && (
                            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                                <IconButton color="primary" onClick={() => onClickSave(r)}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => onClickCancel(r)}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                    {r.isEdit ? (
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={r.contents}
                            onChange={(e) => onChangeContent(e, r.review_id)}
                            placeholder="댓글을 입력하세요..."
                            variant="outlined"
                            sx={{ mt: 2 }}
                        />
                    ) : (
                        <Box
                            sx={{
                                whiteSpace: 'pre-wrap',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                            onClick={() => onClickContents(r.review_id)}
                        >
                            {r.contents}
                        </Box>
                    )}
                </Card>
            ))}
            {total > size && (
                <Pagination
                    count={Math.ceil(total / size)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                />
            )}
        </Box>
    );
};

export default ReviewPage;
