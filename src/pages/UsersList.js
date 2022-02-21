import React, { useState, useEffect } from 'react';
import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router-dom";
import * as controller from '../user/contorller'
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        borderRadius: "5px",
        width: "100%",
    },
}));

export default function List() {
    const history = useHistory()
    const classes = useStyles()
    const location = history.location.pathname
    const [rows, setRows] = useState()

    const columns = [
        { field: 'name', headerName: 'Name', sortable: true, width: 200 },
        { field: 'username', headerName: 'Username', sortable: true, width: 200 },
        { field: 'email', headerName: 'Email', sortbale: true, width: 200 },
        { field: 'login_count', headerName: 'Login count', type: 'number', sortable: true, width: 200 },
        { field: 'id', headerName: 'ID', sortable: false, width: 300 },
        { field: 'date_created', headerName: 'Created', type: 'date', sortbale: true, width: 300 },
        { field: 'date_updated', headerName: 'Updated', type: 'date', sortable: true, width: 300 },]

    useEffect(() => {

        controller.getUsers().then(response => {
            setRows(response.data.map(user => {
                
                return {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    login_count: user.login_count,
                    id: user.id,
                    date_created: user.date_created,
                    date_updated: user.date_updated
                }
            }))
        })

    });



    return <div>
        <CustomAppBar location={location} />
        <Grid container
            direction="column"
            alignItems='center'>
            <div style={{ height: 400, width: '1700px', textAlign: 'center', marginTop:"20px" }}>
                {
                    rows !== undefined ?
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                        : ""
                }
            </div>
        </Grid>
    </div>;
}