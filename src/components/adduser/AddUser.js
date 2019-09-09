import React,{useState} from 'react';
import {Mutation} from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ADD_USER} from '../../graphql/mutation';
import {GET_USER} from '../../graphql/query'
import ErrorHandler from '../errorhandler'
import { ToastContainer, toast } from 'react-toastify';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddUser(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [isError,setIsError] = useState(false);
    const [errors,setError] = useState([]);

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    });

    const formHandler = (evt) => {
        setFormData({...formData,[evt.target.name]: evt.target.value})
    }
    const errorHandler = (graphQLErrors,networkError) => {
        let error = [];
  	    if (graphQLErrors) {
            graphQLErrors.map((message) => {
                error = message.msg
            }
                
            );
            setIsError(true)
        }
        setError(error);
    }
    return (
        <Mutation 
            mutation={ADD_USER} 
            refetchQueries={[{query:GET_USER}]} 
            onError={({ graphQLErrors, networkError }) => errorHandler(graphQLErrors,networkError)}
            onCompleted={() => { toast.success("User Added Successfully");props.handleClose(); }}
            >
            {
                (createUser,{data}) => (
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={props.open}
                        onClose={props.handleClose}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h4>Add User</h4>
                            <ErrorHandler isError={isError} errors={errors} />
                            <form className={classes.form} onSubmit = {(evt) => {
                                evt.preventDefault();
                                createUser({
                                    variables : {
                                        name:formData.name,
                                        email: formData.email,
                                        password: formData.password
                                    }
                                })
                                
                                setError([]);
                                setIsError(false)
                            }} >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={formHandler}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="text"
                                    onChange={formHandler}
                                    value={formData.email}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={formHandler}
                                    value={formData.password}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add User
                                </Button>
                            </form>
                            <ToastContainer />
                        </div>
                    </Modal>

                )
            }

        </Mutation>
        
  );
}

export default AddUser;