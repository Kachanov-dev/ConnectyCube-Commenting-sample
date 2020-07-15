import ConnectyCube from 'connectycube'
import appConfig from '../appConfig.json'

class UserService {

    async init() {
      const result = await ConnectyCube.init(...appConfig.connectyCubeConfig)
      console.warn('result', result)
    }

}

const userService = new UserService()

Object.freeze(userService)

export default userService