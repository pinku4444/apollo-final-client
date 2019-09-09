import React from 'react';
import Header from '../header';
import UserList from '../userlist';
import UserListHeader from '../userlistheader'
import AddUser from '../adduser';
import { Grid } from '@material-ui/core';
const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [updateSubscriptionData, setUpdateSubscriptionData] = React.useState({});

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const subscriptionDataHandler = (data) => {
        setUpdateSubscriptionData({data})

    }

    return (
        <div>
            <Header />
            <Grid container>
                <Grid item md={1}></Grid>
                <Grid item xs={12} md={11}>
                    <UserListHeader 
                        handleOpen={handleOpen} 
                        updateSubscriptionData={updateSubscriptionData}
                    />
                    <UserList subscriptionDataHandler={subscriptionDataHandler} />
                    <AddUser handleClose={handleClose} open={open} />
                </Grid>
            </Grid>
            
        </div>
    );
};

export default Dashboard;