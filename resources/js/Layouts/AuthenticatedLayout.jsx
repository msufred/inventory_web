import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Box, Breadcrumbs, CssBaseline, CssVarsProvider, Typography } from '@mui/joy';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import { ChevronRightRounded, Dashboard, HomeRounded } from '@mui/icons-material';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Header />
                <Sidebar />

                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1
                    }}
                >

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Breadcrumbs size='sm' aria-label='breadcrumbs' separator={<ChevronRightRounded fontSize='sm' />} sx={{ pl: 0 }}>
                            <Link
                                underline='none'
                                color="neutral"
                                href="#"
                                aria-label="Home"
                            >
                                <HomeRounded />
                            </Link>
                            <Link
                                underline="hover"
                                color="neutral"
                                href="#"
                                fontSize={12}
                                fontWeight={500}
                            >
                                Dashboard
                            </Link>
                            <Typography color='primary' fontWeight={500} fontSize={12}>
                                Orders
                            </Typography>
                        </Breadcrumbs>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        mb: 1,
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'start', sm: 'center' }
                    }}>

                    </Box>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}
