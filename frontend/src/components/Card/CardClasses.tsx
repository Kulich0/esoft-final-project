import * as React from 'react';
import {styled, Typography, Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';

import hathayoga from '../../assets/images/hathayoga.jpg';
import thegroupishealthy from '../../assets/images/thegroupishealthy.jpg';
import yogainhammocks from '../../assets/images/yogainhammocks.jpg';
import yogamedium from '../../assets/images/yogamedium.jpg';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 200,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    flexGrow: 1,
}));

const cardData = [
    {
        title: 'Хатха-йога',
        description: 'Че то там потом',
        image: hathayoga,
    },
    {
        title: 'Йога в гамаках(для начинающих)',
        description: 'Другой текст для карточки',
        image: yogainhammocks,
    },
    {
        title: 'Йога в гамаках(средний уровень)',
        description: 'Другой текст для карточки',
        image: yogamedium,
    },
    {
        title: 'Йога-нидра',
        description: 'Третий текст для карточки',
        image: '/static/images/cards/contemplative-reptile.jpg',
    },
    {
        title: 'Группа здоровья',
        description: 'Третий текст для карточки',
        image: thegroupishealthy,
    },
    {
        title: 'Индивидуальное занятие',
        description: 'Третий текст для карточки',
        image: '/static/images/cards/contemplative-reptile.jpg',
    },
];
const CardClasses: React.FC = () => {
    return (
        <>
         <Grid container spacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }}>
                {cardData.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 1 }}>
                            <StyledCardMedia 
                                image={card.image}
                                title={card.title}
                            />
                            <StyledCardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </StyledCardContent>
                            <CardActions>
                                <Button variant="contained" sx={{ bgcolor: '#9370DB', color: '#fff' }}>Добавить</Button>
                                <Button variant="contained" sx={{ bgcolor: '#9370DB', color: '#fff' }}>Узнать больше</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>   
        </>
    );
};

export default CardClasses;