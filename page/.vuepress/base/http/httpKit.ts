import Axios, { AxiosRequestConfig } from "axios"

class HttpKit {
    public static instance: HttpKit

    public static getInstance(): HttpKit {
        this.instance || (this.instance = new HttpKit())
        return this.instance
    }

    protected http: any = Axios

    protected axiosConfig: AxiosRequestConfig = {}

    constructor() {
        this.httpConfig()
        this.http = Axios.create(this.axiosConfig)
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    protected interceptorsRequest() {
        this.http.interceptors.request.use(
            (config: any) => {
                return config
            }, (error: any) => {
                return Promise.reject(error)
            })
    }

    protected interceptorsResponse() {
        this.http.interceptors.response.use(
            (respone: any) => {
                return respone
            }, (error: any) => {
                return Promise.reject(error)
            })
    }

    protected httpConfig(): void {
        this.axiosConfig = {
            timeout: 30000
        }
    }

    /**
     * post请求
     * @param url url
     * @param data data
     * @param config config
     */
    public async post(url: string, data: any, config: AxiosRequestConfig = {}) {
        try {
            const postData = Object.assign({}, data)
            return await this.http.post(url, postData, config)
        } catch (e) {
            console.log('post error: ' + e)
        }
    }

    /**
     * get请求
     * @param url url
     * @param params params
     * @param config config
     */
    public async get(url: string, params: any = {}, config: AxiosRequestConfig = {}) {
        try {
            config.params = params
            return await this.http.get(url, config)
        } catch (e) {
            console.log('get error: ' + e)
        }
        return ''
    }


}

export default HttpKit.getInstance()