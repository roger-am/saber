import { Drawer, Button } from "@mui/material"
import Create from "../pages/Client/Create";
import Edit from "../pages/Client/Edit";
import Delete from "../pages/Client/Delete";

interface DrawerProps{
    openCustomDrawer: boolean,
    setOpenCustomDrawer: Function,
    contentType: string,
    lineSelected: object
}

export default function CustomDrawer({openCustomDrawer, setOpenCustomDrawer, contentType, lineSelected}: DrawerProps){
    return (
        <Drawer
            anchor='right'
            open={openCustomDrawer}
            onClose={() => {
                setOpenCustomDrawer();
            }
        }
    >
        {contentType == 'create'?
        <Create/> :contentType == 'edit' ?
        <Edit startValues={lineSelected}/>:
        <Delete startValues={lineSelected}/>
        }
        <Button type="button" onClick={ () => setOpenCustomDrawer()}>Fechar</Button>
    </Drawer>
    )
}