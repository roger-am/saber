import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

import { ClientSchema } from "../schemas/ClientSchema"

import { Client } from "../types/Client"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import InputMask from 'react-input-mask';
import { DatePicker } from "@mui/x-date-pickers"
import { ClientServices } from "../../../services/ClientService"
import { ICreateClient, IUpdateClient } from "../../../interfaces/index"
import { useState } from "react"
import { format } from 'date-fns'

interface FormProps{
    startValues:{
        id: number,
        fullName:string,
        birthDate: Date,
        cpf: string,
        maritalStatus: string,
    },
    editOperation:boolean
}

export default function Form({startValues, editOperation}: FormProps) {
    function formatDataToForm(){
        if(startValues?.birthDate){
            const convertDataToString = (startValues?.birthDate).toString()
            const getDataInof = convertDataToString.split("/",3);
            return `${getDataInof[1]}-${getDataInof[0]}-${getDataInof[2]}`;
        }
        return ''
    }

    const newDataOption = formatDataToForm();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setValue,
    } = useForm<Client>({
        resolver: yupResolver(ClientSchema),
    });

    const [cpfInfo, setCpfInfo] = useState(true);

    function validateFirstNumber(cpf:any){
        let sum = 0;;
        for( let i = 0; i < 9; i++){
            sum += cpf[i] * (10 - i);
        }
        const result = (sum *10) % 11;
        if(result < 10){
            return cpf[9] == result;
        }
        return cpf[9] == 0;
    }


    
    function validateSecondNumber(cpf:any){
        let sum = 0;;
        for( let i = 0; i < 10; i++){
            sum += cpf[i] * (11 - i);
        }
        const result = (sum *10) % 11;
        if(result < 10){
            return cpf[10] == result;
        }
        return cpf[10] == 0;
    }

    function repeatedValidator(cpf:any) {
        const first = cpf[0];
        let different = false;
        for(let i = 1; i < cpf.length; i++) {
          if(cpf[i] != first) {
            different = true;
          }
        }
        return different;
      }
    

    function validateCpf(cpf:any) {
        if (cpf.length != 11) {
          return false;
        }
        if(!repeatedValidator(cpf)) {
          return false;
        }
        if (!validateFirstNumber(cpf)) {
          return false;
        }
        if (!validateSecondNumber(cpf)) {
          return false;
        }
        return true;
      }

    function validateDocument(data:string){

        if(data){
            const pureContent:string = data ? data.replace(/[._-]/g,'') : data ;
            const cpf = pureContent.split("").map((e) => parseInt(e));
            const isCpfValid:boolean = validateCpf(cpf);
            setCpfInfo(isCpfValid);
        }
    }

    const createClient = async (data:ICreateClient) => {
       await ClientServices.createClient(data);
    };

    const updateClient = async (id:number,data:IUpdateClient) => {
       await ClientServices.updateClient(id,data);
    };

    const deleteClient = async (id:number) => {
       await ClientServices.deleteClient(id);
    };

    const onSubmit = async (data:Client) =>{
        if(!startValues?.id){
            const now = new Date();
            const fullData:ICreateClient = {...data,createDate: now, lastUpdate: null}
            await createClient(fullData);
        };
        if(editOperation){
            const now = new Date();
            const fullData:IUpdateClient = {...data, lastUpdate: now}
            await updateClient(startValues.id, fullData)
        };
        if(!editOperation && startValues?.id){
            await deleteClient(startValues.id)
        };
        setTimeout(function () { window.location.reload();  }, 500);
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
                defaultValue= {startValues && startValues.fullName } 
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
                    defaultValue={startValues && startValues.cpf } 
                    render={({field: { ...field} }) => (
                        <FormControl fullWidth={true}>
                            <InputMask mask="999.999.999-99" {...field}>
                                <TextField
                                onChange={validateDocument(field.value)}
                                label='CPF'
                                fullWidth={true}
                                error={!!errors.cpf || !cpfInfo}
                                helperText={errors.cpf?.message || (!cpfInfo && "CPF Inválido")}
                                />
                            </InputMask>
                        </FormControl>
                    )}
                />

                <Controller
                    control={control}
                    name="birthDate"
                    defaultValue={startValues?.id && new Date(newDataOption)} 
                    render={({ field: {...field} }) => (
                        <FormControl fullWidth={true}>
                            <DatePicker 
                            label="Data de Nacimento" {...field}/>
                        </FormControl>
                    )}
                />
            </Stack> 
            <Controller
                control={control}
                name="maritalStatus"
                defaultValue={startValues && startValues.maritalStatus } 
                render={({ field: { ...field } }) => (
                <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
                    <InputLabel id="state">Estado Civil</InputLabel>
                    <Select
                    label="Estado Civil"
                    labelId="maritalStatus"
                    ref={field.ref}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    >
                        <MenuItem value={'Casado(a)'}>Casado(a)</MenuItem>
                        <MenuItem value={'Solteiro(a)'}>Solteiro(a)</MenuItem>
                        <MenuItem value={'Divorciado(a)'}>Divorciado(a)</MenuItem>
                        <MenuItem value={'Viúvo(a)'}>Viúvo(a)</MenuItem>
                    </Select>
                </FormControl>
                )}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button type="submit" variant="contained" size="large">
                  { editOperation ? 'Editar Cliente' :
                  startValues?.id ? 'Excluir Cliente' :'Salvar Cliente' }  
                </Button>
             </Stack>
        </Box>
    )
}

