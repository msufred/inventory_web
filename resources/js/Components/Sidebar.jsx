import { useState } from "react";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils.js";
import { Avatar, Box, Divider, GlobalStyles, IconButton, Input, List, ListItem, ListItemButton, ListItemContent, Sheet, Typography, listItemButtonClasses } from "@mui/joy";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BrightnessAutoRounded, DashboardRounded, GroupRounded, HomeRounded, LogoutRounded, SearchRounded } from "@mui/icons-material";
import { usePage } from "@inertiajs/react";

function Toggler({ defaultExpaded = false, text, icon, children }) {
    const [open, setOpen] = useState(defaultExpaded);
    return (
        <ListItem nested>
            <ListItemButton onClick={() => setOpen(!open)}>
                {icon}
                <ListItemContent>
                    <Typography level="title-sm">{text}</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
            </ListItemButton>
            <Box sx={{
                display: 'grid',
                gridTemplateRows: open ? '1fr' : '0fr',
                transition: '0.2s ease',
                '& > *': {
                    overflow: 'hidden'
                }
            }}>
                {children}
            </Box>
        </ListItem>
    );
}

export default function Sidebar() {
    const user = usePage().props.auth.user;
    const name = user.name;
    const email = user.email;

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none'
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider'
            }}
        >
            <GlobalStyles styles={(theme) => ({
                ':root': {
                    '--Sidebar-width': '220px',
                    [theme.breakpoints.up('lg')]: {
                        '--Sidebar-width': '240px'
                    }
                }
            })} />

            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0)))',
                        lg: 'translateX(-100%)'
                    }
                }}
                onClick={() => closeSidebar()}
            />

            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
            }}>
                <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRounded />
                </IconButton>
                <Typography level="title-lg">Inventory IO</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>

            <Input size="sm" startDecorator={<SearchRounded />} placeholder="Search" />

            <Box sx={{
                minHeight: 0,
                overflow: 'hidden auto',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                [`& .${listItemButtonClasses.root}`]: {
                    gap: 1.5
                }
            }}>
                <List size="sm" sx={{
                    gap: 1,
                    '--List-nestedInsetStart': '30px',
                    '--ListItem-radius': (theme) => theme.vars.radius.sm
                }}>
                    {/* Home */}
                    <ListItem>
                        <ListItemButton>
                            <HomeRounded />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    {/* Dashboard */}
                    <ListItem>
                        <ListItemButton>
                            <DashboardRounded />
                            <ListItemContent>
                                <Typography level="title-sm">Dashboard</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <Toggler text="Users" icon={<GroupRounded />}>
                        <List sx={{ gap: 0.5 }}>
                            <ListItem sx={{ mt: 0.5 }}>
                                <ListItemButton role="menuitem" component="a" href={route('profile.edit')}>
                                    My Profile
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    Manage Users
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Toggler>
                </List>
            </Box>

            <Divider />

            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
            }}>
                <Avatar variant="outlined" size="sm" src="" />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">{name}</Typography>
                    <Typography level="body-xs">{email}</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRounded />
                </IconButton>
            </Box>
        </Sheet>
    );
}