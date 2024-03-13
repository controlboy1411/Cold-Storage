import apiInstance from './base/base.js';
import { adminService, masterService, authService, dashboardService } from './services';

const API = {
    authService: new authService(apiInstance),
    masterService: new masterService(apiInstance),
    adminService: new adminService(apiInstance),
    dashboardService: new dashboardService(apiInstance)
}

export default API;