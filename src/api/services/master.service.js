class masterService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    getPlants = async (baCode) => {
        const result = await this.#_baseApi.get('/master/plants', {
            params: { baCode }
        })
        return result
    }

    getStorages = async (plantCode) => {
        const result = await this.#_baseApi.get('/master/storages', {
            params: { plantCode }
        })
        return result
    }

    getLocations = async (storageID) => {
        const result = await this.#_baseApi.get('/master/locations', {
            params: { storageID }
        })
        return result
    }
}

export default masterService;