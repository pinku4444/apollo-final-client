import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style.scss'

const ErrorHandler = (props) => {
    if(props.isError){
        return (
            <Paper className="paper">
                <ul>
                    {
                        props.errors.map((error,index) => (
                            <li key={index+1}>
                                <Typography color="secondary">
                                    {error}
                                </Typography>
                            </li>
                        ))
                    }

                </ul>      
             </Paper>
            
        );

    }else {
        return null;
    }
    
};

export default ErrorHandler;