import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Mutation} from 'react-apollo';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link,withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ADD_USER} from '../../graphql/mutation';
import ErrorHandler from '../errorhandler'




const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
    const classes = useStyles();
    const [isError,setIsError] = useState(false);
    const [errors,setError] = useState([]);
    const [formData,setFormData] = useState({
        fname:'',
        lname:'',
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

    const redirectHandler = (cache,{data:{createUser}}) => {
        localStorage.setItem("authToken",createUser.token);
        props.history.push("/dashboard")
    }
    return (
        <Mutation 
            mutation={ADD_USER}
            onError={({ graphQLErrors, networkError }) => errorHandler(graphQLErrors,networkError)}
            update={redirectHandler}
        >
        {
            (createUser,{data}) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <ErrorHandler isError={isError} errors={errors} />
                        <form className={classes.form} onSubmit = {(evt) => {
                                evt.preventDefault();
                                createUser({
                                    variables : {
                                        name:formData.fname+formData.lname,
                                        email: formData.email,
                                        password: formData.password
                                    }
                                })
                                
                                setError([]);
                                setIsError(false)
                            }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="fname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                value={formData.fname}
                                onChange={formHandler}
                                label="First Name"
                                autoFocus
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={formData.lname}
                                id="lastName"
                                label="Last Name"
                                name="lname"
                                onChange={formHandler}
                                autoComplete="lname"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={formHandler}
                                autoComplete="email"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={formHandler}
                                id="password"
                                autoComplete="current-password"
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link to="/">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                </Container>


            )
        }
        </Mutation>
    
  );
}

export default withRouter(SignUp);