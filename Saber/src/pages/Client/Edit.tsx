import {Paper, Stack } from '@mui/material'
import PageTitle from '../../components/PageTitle'
import Form from './components/Form'

interface EditProps{
    startValues:{
        id: number,
        fullName:string,
        birthDate: Date,
        cpf: string,
        maritalStatus: string,
    }
}

export default function Edit({startValues}:EditProps){
    return(
        <>
            <Stack sx={{marginBottom: 2}}>
                <PageTitle title="Edit Cliente" />
                <Paper>
                    <Form startValues={startValues} editOperation={true}/>
                </Paper>
            </Stack>
        </>
    )
}