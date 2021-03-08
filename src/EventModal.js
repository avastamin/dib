import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { KeyboardDatePicker } from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import moment from "moment";
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    "& h2": {
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1 / 2),
    top: theme.spacing(1 / 2),
    color: "#ffffff",
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
    minWidth: "600px",
  },

  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const EventModal = ({
  selectedEvent,
  isUserRegistered,
  isOpen,
  onClose,
  isLoading,
  onContinue,
  errors,
  ...props
}) => {
  const classes = useStyles();
  const { onModalEnter } = props;

  const [selectedDate, handleDateChange] = useState(new Date());
  const [userToBeRegistered, setUserToBeRegistered] = useState([]);
  const [formStep, setFormStep] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(()=>{
    setUserToBeRegistered(props.registerUser);
  }, [props.registerUser])

  const handleContinue = () => {
    setFormStep(1);
    onContinue(email);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onEnter={onModalEnter}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Register for {`${selectedEvent.title} ${moment(selectedEvent.start).format('ll')}(${moment(selectedEvent.start).format('HH:mm:ss')})`}
        {onClose ? (
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.content}>
        
        <div
          className={clsx({
            [classes.modalConentBelow]: true, // always apply
            [classes.contentWithLoading]: isLoading, // only when isLoading === true
          })}
        >
          <DialogContentText id="alert-dialog-description">
            {isUserRegistered && <Alert severity="success">You're already in our system!</Alert>}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            { (formStep === 1) && 
              <div>
                <TextField
                  autoComplete="fname"
                  margin="dense"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userToBeRegistered?.name?.first}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={userToBeRegistered?.name?.last}
                />
              </div>
            }
          </form>
          </DialogContentText>

        </div>
      </DialogContent>
      <DialogActions className={classes.modalAction}>
      <Button
        variant="outlined"
        className={classes.button}
  
      >
        Cancel
      </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleContinue()}
        >
         Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
