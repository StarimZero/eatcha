import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Avatar } from '@mui/material';

const MyBadgePage = () => {
    const { uid } = useParams();
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const callAPI = async () => {
        try {
            const res = await axios.get(`/badge/list/${uid}`);
            console.log(res.data);
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const avatarSrc = "http://via.placeholder.com/200x200";
    
    useEffect(() => {
        callAPI();
    }, [uid]);

    return (
        <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={3}>
                {/* 아바타와 보유한 뱃지 카드가 같은 줄에 배치 */}
                <Grid item xs={4} container alignItems="center" justifyContent="center">
                    {avatarSrc ? (
                        <>
                            <Avatar
                                src={avatarSrc}
                                sx={{ width: 80, height: 80, borderRadius: '50%' }}
                            />
                        </>
                    ) : (
                        <Card sx={{ cursor: 'pointer', padding: 2, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                    대표 뱃지 설정하기
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
                <Grid item xs={8}>
                    <Card sx={{ cursor: 'pointer', padding: 2, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                보유한 뱃지
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={3}>
                {list.map(bdg => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={bdg.badge_key}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease-in-out',
                                boxShadow: 3,
                                borderRadius: 2,
                                '&:hover': {
                                    transform: 'scale(1.05)', // 확대 효과
                                    boxShadow: 6, // 확대 시 그림자 강도 증가
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={bdg.badge_img}
                                alt={bdg.badge_name}
                                sx={{ width: '100%', objectFit: 'contain' }}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {bdg.badge_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {bdg.badge_text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyBadgePage;
