import { Drawer, Button } from "@mui/material"
import { useState, useEffect  } from "react";
import Create from "../pages/Client/Create";
import Edit from "../pages/Client/Edit";
// import Edit from "../pages/Client/Edit";

interface DrawerProps{
    openCustomDrawer: boolean,
    setOpenCustomDrawer: Function,
    contentType: string
}

export default function CustomDrawer({openCustomDrawer, setOpenCustomDrawer, contentType}: DrawerProps){
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
        <Create/> :
        <Edit/>
        }
        <Button onClick={() => setOpenCustomDrawer()}>
            Salvar
        </Button>
    </Drawer>
    )
}