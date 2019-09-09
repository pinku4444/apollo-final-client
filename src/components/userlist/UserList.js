import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom'
import {Query,Mutation} from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import './style.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GET_USER} from '../../graphql/query';
import {DELETE_USER} from '../../graphql/mutation'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import UpdateUser from '../updateuser';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {UPDATE_USER_SUBSCRIPTION} from '../../graphql/subscription';



const UserList = (props) => {
    const updateHandler = (cache,{data: {deleteUser}}) => {
        const {users} = cache.readQuery({query:GET_USER});
        cache.writeQuery({
            query:GET_USER,
            data:{users: users.filter( user => user._id !== deleteUser._id )}
        })

    }
    const [updateModelOpen, setUpdateModelOpen] = React.useState(false);
    const [formData,setFormData] = useState({
        id:'',
        name:'',
        email:''
    })
    const handleUpdateModelOpen = (id,name,email) => {
        setFormData({
            id,
            name,
            email
        })
        setUpdateModelOpen(true);
    };

    
    const handleUpdateModelClose = () => {
        setUpdateModelOpen(false);
    };

    const errorHandler = (graphQLErrors,networkError) => {
        console.log('graphQLErrors: ', graphQLErrors);

    }

    const setBookToSubscription = (subscribeToMore) => {
        subscribeToMore({
            document: UPDATE_USER_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
               const {email,name} = subscriptionData.data.updateUser;
               const subsData = {
                   email,
                   name
               }
               props.subscriptionDataHandler(subsData);
            }
        })
      }
    
    return (
        <Query query={GET_USER} onError={() => ({ graphQLErrors, networkError }) => errorHandler(graphQLErrors,networkError)}>
            {
                ({subscribeToMore,data,loading,error}) => {
                    if(loading) {
                        return (
                            <h5>Loading.....</h5>
                        )
                    }
                    setBookToSubscription(subscribeToMore);
                    return (
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className="paper">
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { 
                                                    data.users.map((user) => {
                                                        return (
                                                            <Mutation mutation={DELETE_USER} key={user._id} update={updateHandler}> 
                                                                {
                                                                    (deleteUser,{data}) => (
                                                                        <TableRow key={user._id} >
                                                                            <TableCell>{user.name}</TableCell>
                                                                            <TableCell>{user.email}</TableCell>
                                                                            <TableCell>
                                                                                <Button variant="contained" size="small" color="primary" className="update-button" onClick={() => {handleUpdateModelOpen(user._id,user.name,user.email)}}>
                                                                                    Update
                                                                                </Button>
                                                                                <Button variant="contained" size="small" color="secondary" onClick={ () => {
                                                                                    confirmAlert({
                                                                                        message: 'Are you sure ?',
                                                                                        buttons: [
                                                                                          {
                                                                                            label: 'Yes',
                                                                                            onClick: () => {
                                                                                                deleteUser({
                                                                                                    variables : {
                                                                                                        id:user._id
                                                                                                    }
                                                                                                })
                                                                                                toast.success("User Deleted Successfully");
                                                                                            }

                                                                                          },
                                                                                          {
                                                                                            label: 'No',
                                                                                            
                                                                                          }
                                                                                        ]
                                                                                      });
                                                                                    
                                                                                    
                                                                                    
                                                                                }} >
                                                                                    Delete
                                                                                </Button>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }
                                                                
                                                            </Mutation>
                                                            

                                                        )
                                                        
                                                    })
                                                    
                                                    
                                                }
                                            
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <UpdateUser  open={updateModelOpen} handleClose={handleUpdateModelClose} data={formData} />
                            <ToastContainer />

                        </div>

                    )
                }
            }
        </Query>
    );
};

export default withRouter(UserList);