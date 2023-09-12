import { Button, Stack, IconButton, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import CustomDrawer from "../../components/CustomDrawer";
import { ClientServices } from "../../services";
import { format } from 'date-fns'


export default function List(){
    const [open, setOpen] = useState(false)
    const [actionType, setActionType] = useState('');
    const [clientsList, setClientsList] = useState('');
    const [lineSelected, setLineSelected] = useState({});

    
const onDelete = (params: GridRenderCellParams) =>{
  setLineSelected(params.row);

}

const onEdit = (params: GridRenderCellParams) =>{
  setLineSelected(params.row);
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field:'createDate',
    headerName: 'Data de criação',
    width:150,
  },
  {
    field:'lastUpdate',
    headerName: 'Data da ultima modificação',
    width:190,
  },
  {
    field: 'fullName',
    headerName: 'Nome',
    width: 150,
  },
  {
    field:'birthDate',
    headerName: 'Data de nascimento',
    width:150,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
  },
  {
    field: 'maritalStatus',
    headerName: 'Estado Civil',
    width: 110,
  },
  {
    field: 'actions',
    headerName: 'Ações',
    minWidth: 150,
    renderCell: (params) =>(
      <Stack direction='row' spacing={2}>
        <IconButton color='info' size='small' onClick={() => {
          onEdit(params);
          setOpen(true);
          setActionType('edit');
        }}>
          <EditIcon fontSize='inherit' />
        </IconButton>
        <IconButton color='error' size='small' onClick={() => {
          onDelete(params);
          setOpen(true);
          setActionType('delete');
        }}>
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </Stack>
    )
  }
];

const clients = Object(clientsList);

function formatData(clientsList:any){
  const formatedClient = [];
  for(let i = 0; i < clientsList.length;i++){
    const formatedCreateDate = format(new Date(clientsList[i].createDate), 'dd/MM/yyyy');
    const formatedLastUpdate = format(new Date(clientsList[i].lastUpdate), 'dd/MM/yyyy');
    const formatedBirthDate = format(new Date(clientsList[i].birthDate), 'dd/MM/yyyy');
    formatedClient.push({...clientsList[i], createDate:formatedCreateDate, lastUpdate: formatedLastUpdate, birthDate:formatedBirthDate})
  }
  setClientsList(formatedClient);

}


  useEffect(()=>{
    const clientList = async () => {
      const res = await ClientServices.listClient();
      formatData(res.data);
     
    };
    const getOneClient = async () =>{
      const resOne = await ClientServices.listOneClient(1);
    }
    clientList();
    getOneClient();
  },[]);

  return <>
    <Stack direction={{ xs:'column', sm:'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1}}>
            <PageTitle title="Lista de Clientes" />
        </Box>
        <Box sx={{ alignSelf:'right'}}>
            <Button type="button" variant="contained" onClick={
                () =>{
                    setOpen(true);
                    setActionType('create')
                    }}>
                Cadastrar Cliente
            </Button>
        </Box>
    </Stack>
        <CustomDrawer openCustomDrawer={open} setOpenCustomDrawer={ () => setOpen(!open)} contentType={actionType} lineSelected={lineSelected}/>
        <Paper>
            <DataTable columns={columns} rows={clients}/>
        </Paper>
        </>
}
