import { createTheme } from '@mui/material'
import { ptBR as MaterialLocale } from '@mui/material/locale'
import { ptBR as DataGridLocale} from '@mui/x-data-grid'

export const theme = createTheme(
    {
        palette:{
            mode:"light",
        }
    },
    MaterialLocale,
    DataGridLocale
)