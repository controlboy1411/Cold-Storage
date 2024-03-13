class adminService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    searchDataTable = async (searchValue) => {
        const result = await this.#_baseApi.get('/admin/search-table', {
            params: { searchValue }
        })
        return result
    }

    createPlant = async ({ baCode, plantCode, plantName, address }) => {
        const result = await this.#_baseApi.post('/admin/create-plant', {
            baCode, plantCode, plantName, address
        })
        return result
    }

    configPlant = async ({ plantCode, plantName, address, status }) => {
        const result = await this.#_baseApi.post('/admin/config-plant', {
            plantCode, plantName, address, status
        })
        return result
    }

    createStorage = async ({ baCode, plantCode, storageName }) => {
        const result = await this.#_baseApi.post('/admin/create-storage', {
            baCode, plantCode, storageName
        })
        return result
    }

    configStorage = async ({ storageId, storageName, status, tempMin, tempMax, humiMin, humiMax, effectiveDate }) => {
        const result = await this.#_baseApi.post('/admin/config-storage', {
            storageId, storageName, status, tempMin, tempMax, humiMin, humiMax, effectiveDate
        })
        return result
    }
}

export default adminService;