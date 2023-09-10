import {Paper, Stack } from '@mui/material'
import PageTitle from '../../components/PageTitle'
import Form from './components/Form'

export default function Edit(){
    return(
        <>
            <Stack sx={{marginBottom: 2}}>
                <PageTitle title="Editar Cliente" />
                <Paper>
                    <Form />
                </Paper>
            </Stack>
        </>
    )
}