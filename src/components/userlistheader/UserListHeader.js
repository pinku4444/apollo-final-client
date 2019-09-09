import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LatestUpdatedUser from '../latestupdateduser'
import "./style.scss"

const UserListHeader = (props) => {
    const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

    const handleOpen = () => {
        
        setUpdateModalOpen(true);
    };

    const handleClose = () => {
        setUpdateModalOpen(false);
    };
    return (
        <div>
            <Paper className="paper">
                <Grid container>
                    <Grid item xs={9}>
                        <Fab color="primary" aria-label="add" size="small" onClick={props.handleOpen} >
                            <AddIcon />
                        </Fab>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Latest Updated User
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <LatestUpdatedUser open={updateModalOpen} handleClose={handleClose} updateSubscriptionData={props.updateSubscriptionData} />
        </div>
    );
};

export default UserListHeader;