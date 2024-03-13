class dashboardService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    getDashboardMainData = async (baCode, plantCode) => {
        const result = await this.#_baseApi.get('/dashboard/dashboard-main', {
            params: { baCode, plantCode }
        })
        return result
    }

    getLineChartData = async (baCode, plantCode, storageID, locationID, selectedDate) => {
        const result = await this.#_baseApi.get('/dashboard/chart-data', {
            params: { baCode, plantCode, storageID, locationID, selectedDate }
        })
        return result
    }

    getReportTableData = async (baCode, plantCode, storageID, locationID, selectedDate, page = 0, size = 10) => {
        const result = await this.#_baseApi.get('/dashboard/report-table', {
            params: { baCode, plantCode, storageID, locationID, selectedDate, page, size }
        })
        return result
    }

    getSummaryData = async (baCode, plantCode, storageID, locationID, fromDate, toDate) => {
        const result = await this.#_baseApi.get('/report/summary-infor', {
            params: { baCode, plantCode, storageID, locationID, fromDate, toDate }
        })
        return result
    }

    getDetailData = async (baCode, plantCode, storageID, locationID, fromDate, toDate, page, size) => {
        const result = await this.#_baseApi.get('/report/detail-infor', {
            params: { baCode, plantCode, storageID, locationID, fromDate, toDate, page, size }
        })
        return result
    }
}

export default dashboardService;