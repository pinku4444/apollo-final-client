import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Mutation} from 'react-apollo';
import {UPDATE_USER} from '../../graphql/mutation'
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

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [formData,setFormData] = useState({
        id:'',
        name:'',
        email:''
    })  
    
    const formHandler = (evt) => {
        setFormData({...formData,[evt.target.name]:evt.target.value});
    }

    useEffect(() => {
        setFormData(props.data)
    }, [props.data])
    return (
        <Mutation mutation={UPDATE_USER}>
            {
                (updateUser,{data}) => (
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={props.open}
                        onClose={props.handleClose}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h4>Update User</h4>
                            <form className={classes.form} onSubmit={ (evt) => {
                                        evt.preventDefault();
                                         updateUser({
                                            variables:{
                                                name:formData.name,
                                                id:formData.id
                                            }
                                        }
                                        )
                                        props.handleClose();
                                        toast.success("User Updated Successfully");
                                        }}>
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
                                    disabled={true}
                                    onChange={formHandler}
                                    value={formData.email}
                                />
                        
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Update User
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