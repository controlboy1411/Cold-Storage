class authService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    login = async (data) => {
        const result = await this.#_baseApi.post('/auth/login', {
            username: data.username || '',
            password: data.password || ''
        })
        return result
    }
}

export default authService;