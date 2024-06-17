import * as React from 'react';
import { Paper, styled, Typography, Button, Box, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import mainpagephoto from '../../assets/images/mainpagephoto.jpg';
import hathayoga from '../../assets/images/hathayoga.jpg';
import thegroupishealthy from '../../assets/images/thegroupishealthy.jpg';
import yogainhammocks from '../../assets/images/yogainhammocks.jpg';
import yogamedium from '../../assets/images/yogamedium.jpg';

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${mainpagephoto})`,
    width: '100%',
    height: '800px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const FullOverlay = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const TextOverlay = styled('div')(({ theme }) => ({
    textAlign: 'center',
    zIndex: 1,
}));

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

const Body: React.FC = () => {
    return (
        <>
            <StyledPaper>
                <FullOverlay>
                    <TextOverlay>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Центр йоги «Гармония движения»
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Здоровье и хорошее настроение вместе с нами
                        </Typography>
                        <Button variant="contained" sx={{ bgcolor: '#9370DB', color: '#fff' }}>
                            Записаться
                        </Button>
                    </TextOverlay>
                </FullOverlay>
            </StyledPaper>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5">
                    Добро пожаловать в наш центр йоги! Мы предлагаем разнообразные программы и тренировки, 
                    которые помогут вам достичь гармонии тела и духа. Присоединяйтесь к нам и почувствуйте 
                    улучшение уже после первого занятия.
                </Typography>
            </Box>
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

export default Body;
