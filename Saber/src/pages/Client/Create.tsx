import {Paper, Stack } from '@mui/material'
import PageTitle from '../../components/PageTitle'
import Form from './components/Form'

export default function Create(){
    return(
        <>
            <Stack sx={{marginBottom: 2}}>
                <PageTitle title="Cadastrar Novo Cliente" />
                <Paper>
                    <Form />
                </Paper>
            </Stack>
        </>
    )
}