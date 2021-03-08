import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Calendar from './Calendar';
import EventModal from './EventModal'
import { registeredUsers } from "./dummy";
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));


export default function App() {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState({});
  const [registerUser, setRegisterUser] = useState({});

  const handleEventClick = (calEvent) => {
    console.log(calEvent.event.title)
    setSelectedEvent(calEvent.event);
    setIsModalOpen(true);
  }

  const handleContinue = (email) => {
    const registeredUser = registeredUsers.filter(ru => ru.email === email);
    setRegisterUser(registeredUser[0]);
    setIsUserRegistered(!!registeredUser.length);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Darul Ihsan
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              As-salamu alaykum
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Due to Corona pandamic, you need to register for Jummah Prayer
            </Typography>

          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Calendar onEventClick={handleEventClick}/>
        </Container>
        {
          isModalOpen && 
            <EventModal 
              isOpen={isModalOpen}
              selectedDate={selectedDate}
              selectedEvent={selectedEvent}
              onContinue={handleContinue}
              onClose={() => setIsModalOpen(false)}
              registerUser={registerUser}
              isUserRegistered={isUserRegistered}
            />
        }
      </main>
      <Footer />
    </React.Fragment>
  );
}