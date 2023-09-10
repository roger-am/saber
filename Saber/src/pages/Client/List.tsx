import { Button, Drawer, Stack, IconButton, Box, Paper } from "@mui/material";
import { useState } from "react";
import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import CustomDrawer from "../../components/CustomDrawer";


export default function List(){
    const [open,setOpen] = useState(false)
    const[actionType,setActionType] = useState('');

    
const onDelete = (params: GridRenderCellParams) =>{

}

const onEdit = (params: GridRenderCellParams) =>{
  
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
          onEdit(params)
          setOpen(true);
          setActionType('edit')
        }}>
          <EditIcon fontSize='inherit' />
        </IconButton>
        <IconButton color='error' size='small' onClick={() => onDelete(params)}>
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </Stack>
    )
  }
];

const clients = [
  { id: 1, createDate: '01/01/2023', lastUpdate: '02/01/2023', fullName: 'Maria da Silva', birthDate: '01/01/1998', cpf: '106.500.085-89', maritalStatus: 'Casado(a)' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

    return <>
    <Stack direction={{ xs:'column', sm:'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1}}>
            <PageTitle title="Lista de Clientes" />
        </Box>
        <Box sx={{ alignSelf:'right'}}>
            <Button onClick={
                () =>{
                    setOpen(true);
                    setActionType('create')
                    }}>
                Cadastrar Cliente
            </Button>
        </Box>
    </Stack>
        <CustomDrawer openCustomDrawer={open} setOpenCustomDrawer={ () => setOpen(!open)} contentType={actionType}/>
        <Paper>
            <DataTable columns={columns} rows={clients}/>
        </Paper>
        </>
}
