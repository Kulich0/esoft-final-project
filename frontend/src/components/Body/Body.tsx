import * as React from 'react';
import { Paper, styled, Typography, Button, Box} from '@mui/material';
import mainpagephoto from '../../assets/images/mainpagephoto.jpg';


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

const FullOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const TextOverlay = styled('div')({
    textAlign: 'center',
    zIndex: 1,
});

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
            
        </>
    );
};

export default Body;
