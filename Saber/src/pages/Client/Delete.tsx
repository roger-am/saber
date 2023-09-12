import {Paper, Stack } from '@mui/material'
import PageTitle from '../../components/PageTitle'
import Form from './components/Form'

interface DeleteProps{
    startValues:{
        id: number,
        fullName:string,
        birthDate: Date,
        cpf: string,
        maritalStatus: string,
    }
}

export default function Delete({startValues}:DeleteProps){
    return(
        <>
            <Stack sx={{marginBottom: 2}}>
                <PageTitle title="Excluir Cliente" />
                <Paper>
                    <Form startValues={startValues} editOperation={false}/>
                </Paper>
            </Stack>
        </>
    )
}