import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Collapse, Grid, Typography } from '@mui/material';

const BadgeListPage = () => {
    const [list, setList] = useState([]);
    const [openBadge, setOpenBadge] = useState(null);
    const navigate = useNavigate();

    // 데이터 호출 함수
    const callAPI = async () => {
        try {
            const res = await axios.get('/badge/list');
            console.log(res.data);
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // 배지 토글 핸들러
    const handleToggle = (badgeKey) => {
        setOpenBadge(openBadge === badgeKey ? null : badgeKey);
    };

    // 컴포넌트 마운트 시 데이터 호출
    useEffect(() => {
        callAPI();
    }, []);

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                전체 뱃지 목록
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {list.map(badge => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={badge.badge_key}>
                        <Card sx={{ width: '100%', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                src={badge.badge_img}
                                alt={badge.badge_name}
                                sx={{ height: '10rem', objectFit: 'contain' }}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {badge.badge_name}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleToggle(badge.badge_key)}
                                    fullWidth
                                >
                                    {openBadge === badge.badge_key ? '숨기기' : '자세히보기'}
                                </Button>
                                <Collapse in={openBadge === badge.badge_key}>
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Key:</strong> {badge.badge_key}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>뱃지내용:</strong> {badge.badge_text}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>요구조건:</strong> {badge.badge_req}
                                        </Typography>
                                        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => navigate(`/badge/update/${badge.badge_key}`)}
                                            >
                                                수정
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                            >
                                                삭제
                                            </Button>
                                        </Box>
                                    </Box>
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BadgeListPage;
