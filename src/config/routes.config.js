import { FaSignOutAlt, FaPoll, FaList, FaChartBar } from "react-icons/fa";
import CircleIcon from '@mui/icons-material/Circle';

export const ROUTE_KEY = {
    LOGIN: 'r0',
    DASHBOARD: 'r1',
    REPORT: 'r2',
    ADMIN: 'r3',
    REPORT_DETAIL: 'r4'
}

export const ROUTE_PATH = {
    LOGIN: '/',
    DASHBOARD: '/dashboard',
    REPORT: '/dashboard/report',
    ADMIN: '/admin',
    REPORT_DETAIL: '/report',
    NOT_FOUND: '*'
}

export const QUERY_PARAM = {
    BA_CODE: 'ba_code',
    PLANT_CODE: 'plant_code',
    STORAGE_ID: 'storage_id',
    LOCATION_ID: 'location_id'
}

const adminSubroutes = [
    { key: ROUTE_KEY.ADMIN + '_s1', path: ROUTE_PATH.ADMIN, name: 'menu_tab_admin_factory', icon: <CircleIcon sx={{width: '8px'}}/> },
    { key: ROUTE_KEY.ADMIN + '_s2', path: ROUTE_PATH.ADMIN, name: 'menu_tab_admin_storage', icon: <CircleIcon sx={{width: '8px'}}/> },
]

export const routes = [
    { key: ROUTE_KEY.DASHBOARD, path: ROUTE_PATH.DASHBOARD, name: 'menu_tab_dashboard', icon: <FaPoll />, subRoutes: [], },
    { key: ROUTE_KEY.REPORT_DETAIL, path: ROUTE_PATH.REPORT_DETAIL, name: 'menu_tab_report_detail', icon: <FaChartBar />, subRoutes: [], },
    { key: ROUTE_KEY.ADMIN, path: ROUTE_PATH.ADMIN, name: 'menu_tab_admin', icon: <FaList />, subRoutes: adminSubroutes, },
    { key: ROUTE_KEY.LOGIN, path: ROUTE_PATH.LOGIN, name: 'menu_tab_logout', icon: <FaSignOutAlt />, subRoutes: [], },
]