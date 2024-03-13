import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StyledEngineProvider } from '@mui/material/styles';
import { routes } from '../../config/routes.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import './MenuTab.scss';

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' }) (
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(8),
                },
            }),
            background: 'white',
            color: '#3c3c3c'
        },
    }),
);

const MenuTab = () => {
    const { t } = useTranslation("translation")

    // handle open sub menu
    const routeKeys = routes.map(route => route.key)
    const subMenuStateInit = {}
    routeKeys.map(key => {
        subMenuStateInit[key] = false
    })   
    const menusOpen = localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_SUB_MENU_KEYS)
    if (menusOpen && menusOpen.split(',').length > 0) {
        menusOpen.split(',').map(key => {
            subMenuStateInit[key] = true
        })
    }
    const [subMenuState, setSubMenuState] = useState(subMenuStateInit)
    
    // handle tab color of menu tabs
    const tabs = []
    routes.map(route => {
        tabs.push({
            key: route.key,
            path: route.path
        })

        if (route.subRoutes.length > 0) {
            route.subRoutes.map(subRoute => {
                tabs.push({
                    key: subRoute.key,
                    path: subRoute.path
                })
            })
        }
    })
    const tabClickStateInit = {}
    tabs.map(tab => {
        if (window.location.pathname === tab.path || window.location.pathname.includes(`${tab.path}/`)) {
            if (!window.location.href.includes('?key')) {
                tabClickStateInit[tab.key] = true
            } else {
                if (window.location.href.includes(tab.key)) {
                    tabClickStateInit[tab.key] = true
                } else {
                    tabClickStateInit[tab.key] = false
                }
            }           
        } else {
            tabClickStateInit[tab.key] = false
        }      
    })

    const [tabKeyState, setTabKeyState] = useState(tabClickStateInit)

    // handle click tab and sub tab of menu tabs
    const navigate = useNavigate()
    const handleClickMenu = (route) => {
        if (route.subRoutes.length > 0) {
            let newMenus = []
            const menus = localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_SUB_MENU_KEYS)
            if (menus && menus.split(',').length > 0) {
                newMenus = menus.split(',')                
            }
            if (!subMenuState[route.key]) {            
                newMenus.push(route.key)
            } else {
                if (tabKeyState[route.key]) {
                    newMenus = newMenus.filter(value => value !== route.key)
                }        
            }
            localStorage.setItem(LOCAL_STORAGE_KEY.OPEN_SUB_MENU_KEYS, newMenus.join(','))
            navigate(route.subRoutes[0].path + `?key=${route.subRoutes[0].key}`)

            if (tabKeyState[route.key]) {
                handleSetSubMenuState(route)
            }
        } else {
            navigate(route.path)
        }
        handleSetTabKeyState(route)
    }

    const handleClickSubMenu = (subRoute) => {     
        navigate(subRoute.path + `?key=${subRoute.key}`)
        handleSetTabKeyState(subRoute)
    }

    const handleSetSubMenuState = (route) => {
        const newSubMenuState = {}
        Object.keys(subMenuState).map(key => {
            if (route.key === key) {
                newSubMenuState[key] = !subMenuState[key]
            } else {
                newSubMenuState[key] = subMenuState[key]
            }
        })
        setSubMenuState(newSubMenuState)
    }

    const handleSetTabKeyState = (routeClicked) => {
        const newKeyState = {}
        Object.keys(tabKeyState).map(key => {
            if (String(routeClicked.key || '').includes(key) || key.includes(routeClicked.key)) {
                newKeyState[key] = true
            } else {
                newKeyState[key] = false
            }
        })

        if (routeClicked.subRoutes && Array.isArray(routeClicked.subRoutes) && routeClicked.subRoutes.length > 0) {
            newKeyState[routeClicked.subRoutes[0].key] = true
        }
        setTabKeyState(newKeyState)
    }

    return (
        <div className='menu-tab-container'>
            <StyledEngineProvider injectFirst>
                <Drawer variant="permanent" open={true}>
                    <List component="nav" sx={{marginTop: '15px'}}>
                        {routes.map(route => {
                            return (
                                <>
                                    <ListItemButton
                                        sx={{
                                            margin: '0 15px', 
                                            borderRadius: '5px',
                                            display: route.name === 'menu_tab_admin' ? (localStorage.getItem(LOCAL_STORAGE_KEY.USER_EMAIL) === 'admin@cp.com.vn' ? 'flex' : 'none') : 'flex'
                                        }}
                                        className={tabKeyState[route.key] && 'menutab-tab-item-btn-click'} 
                                        onClick={() => handleClickMenu(route)}
                                    >
                                        <ListItemIcon 
                                            sx={{minWidth: '40px', color: tabKeyState[route.key] ? '#ffffff' : '#3c3c3c', marginLeft: '5px'}}
                                        >
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={t(route.name)}/>
                                        {route.subRoutes.length > 0 && (
                                            <>{subMenuState[route.key] ? <ExpandLess /> : <ExpandMore />}</>
                                        )}
                                    </ListItemButton>
                                    {route.subRoutes.length > 0 && (
                                        <Collapse in={subMenuState[route.key]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {route.subRoutes.map(subRoute => {
                                                    return (
                                                        <ListItemButton
                                                            sx={{
                                                                margin: '0 15px', 
                                                                borderRadius: '5px',
                                                                display: route.name === 'menu_tab_admin' ? (localStorage.getItem(LOCAL_STORAGE_KEY.USER_EMAIL) === 'admin@cp.com.vn' ? 'flex' : 'none') : 'flex'
                                                            }}
                                                            className={tabKeyState[subRoute.key] && 'menutab-subtab-item-btn-click'} 
                                                            onClick={() => handleClickSubMenu(subRoute)}
                                                        >
                                                            <ListItemIcon 
                                                                sx={{marginLeft: '20px', minWidth: '35px', color: tabKeyState[subRoute.key] ? '#3678cf' : '#3c3c3c'}}
                                                            >
                                                                {subRoute.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={t(subRoute.name)} />
                                                        </ListItemButton>
                                                    )
                                                })}    
                                            </List>
                                        </Collapse>
                                    )}
                                </>
                            )
                        })}
                    </List>
                </Drawer>
            </StyledEngineProvider>
        </div>
    )
}

export default MenuTab;