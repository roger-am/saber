import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

import { ClientSchema } from "../schemas/ClientSchema"

import { Client } from "../types/Client"
import { Box, FormControl, Stack, TextField } from "@mui/material"
import InputMask from 'react-input-mask';
import { DatePicker } from "@mui/x-date-pickers"

export default function Form() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setValue,
    } = useForm<Client>({
        resolver: yupResolver(ClientSchema),
    })

    const onSubmit = (data:Client) =>{
        console.log(data)
    }

    return (
        <Box
        component='form'
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{p:2}}
        >
            <TextField
                label="Nome Completo"
                fullWidth={true}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={{marginBottom: 2}}
                {...register('fullName')}
            />   
             <Stack
                direction={{ xs: 'column', sm:"row"}}
                spacing={2}
                sx={{marginBottom: 2}}
             >
                <Controller
                    control={control} 
                    name="cpf"
                    defaultValue=""
                    render={({field: { ...field} }) => (
                        <FormControl fullWidth={true}>
                            <InputMask mask="999.999.999-99" {...field}>
                                <TextField
                                label='CPF'
                                fullWidth={true}
                                error={!!errors.cpf}
                                helperText={errors.cpf?.message}
                                />
                            </InputMask>
                        </FormControl>
                    )}
                />
                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field: {...field} }) => (
                        <FormControl fullWidth={true}>
                            <DatePicker label="Data de Nacimento" {...field}/>
                        </FormControl>
                    )}
                />
            </Stack> 
            <Stack
                direction={{ xs:'column', sm: 'row'}}
                spacing={2}
                sx={{ marginBottom: 2}}
            >
                <TextField 
                    label='Estado Civil'
                    fullWidth={true}
                    error={!!errors.maritalStatus}
                    helperText={errors.maritalStatus?.message}
                />
            </Stack>
        </Box>
       
        

    )
}

