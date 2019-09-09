import React,{useState} from 'react';
import {Mutation} from 'react-apollo';
import {Link,withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {LOGIN_Mutation} from '../../graphql/mutation';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

function Login(props) {
    const classes = useStyles();
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const [isError,setIsError] = useState(false);
    const [errors,setError] = useState([]);


    const inputHandler = (evt) => {
        setFormData({...formData,[evt.target.name]:evt.target.value})
    }

    const updateHandler = (cache,{data:{loginUser}}) => {
        localStorage.setItem("authToken",loginUser.token);
        props.history.push("/dashboard")
        
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



  let {email,password} = formData;


  return (
    <Mutation mutation={LOGIN_Mutation} update={updateHandler} onError={({ graphQLErrors, networkError }) => errorHandler(graphQLErrors,networkError)}>
        {
            ( loginUser,{data,error} ) => (
                
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <ErrorHandler isError={isError} errors={errors} />
                        <form className={classes.form} onSubmit={evt => {
                            evt.preventDefault();
                            loginUser({
                                variables: {
                                    ...formData
                                }
                            })
                            setError([]);
                            setIsError(false)
                        }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={inputHandler}
                                value={email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={inputHandler}
                                value={password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup">
                                        {"Don't have an account? Sign Up"}
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
};


export default withRouter(Login);