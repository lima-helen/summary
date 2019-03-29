import Axios from 'axios'

const axios = Axios.create()
axios.defaults.timeout = 5000
axios.defaults.baseURL = ENV.H5

axios.interceptors.request.use(
	config => {
		const merchantId = parseInt(localStorage.getItem("merchantId"));
		if (ENV.IS_IOS) {
			config.count = config.count || 0;
			const merchantId = parseInt(localStorage.getItem("merchantId"));
			if (!localStorage.getItem("merchantId") || !merchantId || parseInt(merchantId) === 0) {
				return Promise.reject(config)
			}
		}
		if (config.data) {
			//config.data
		} else {
			//config.params
		}

		return config
	},
	error => Promise.reject(error)
)

axios.interceptors.response.use(
	response => response,
	error => {
		//如果ios merchantId 为0 或不存在 最多重复请求3次
		if (ENV.IS_IOS) {
			const merchantId = parseInt(localStorage.getItem("merchantId"));
			if (!localStorage.getItem("merchantId") || !merchantId || parseInt(merchantId) === 0) {
				if (error.count >= 3) {
					return Promise.reject('超过3次请求')
				}
				// 延时处理
				const backoff = new Promise(function (resolve) {
					setTimeout(function () {
						resolve()
					}, 500)
				})
				error.count++;
				return backoff.then(_ => {
					return axios(error)//请重新发送请求
				})
				return Promise.reject(error)
			}
		}
		const errMsg = error instanceof Error
			? error.message
			: error
		console.log(`error: ${errMsg}`)
		return Promise.reject(error)
	}
)

export default axios
