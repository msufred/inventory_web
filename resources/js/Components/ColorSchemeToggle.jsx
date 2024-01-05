import { IconButton, useColorScheme } from '@mui/joy';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from 'react';

export default function ColorSchemeToggle(props) {
    const { onClick, sx, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <IconButton
                size='sm'
                variant='outlined'
                color='neutral'
                {...other}
                sx={sx}
                disabled />
        );
    }

    return (
        <IconButton
            id='toggle-mode'
            size='sm'
            variant='outlined'
            color='neutral'
            {...other}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
            sx={[
                {
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'initial'
                    },
                    '& > *:last-child': {
                        display: mode === 'light' ? 'none' : 'initial'
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <DarkModeRoundedIcon />
            <LightModeIcon />
        </IconButton>
    );
}