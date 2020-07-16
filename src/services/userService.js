import ConnectyCube from 'connectycube';
import appConfig from '../appConfig.json';
import { currentUser } from '../const.js';

class UserService {

  static messages = [];

    async init() {
      await ConnectyCube.init(...appConfig.connectyCubeConfig)

      const session = await ConnectyCube.createSession(currentUser)

      const userCredentials = {
        userId: session.user.id,
        password: currentUser.password
      };

      await ConnectyCube.chat.connect(userCredentials)
      
      const dialogs = await ConnectyCube.chat.dialog.list();

      const dialogId = dialogs.items[0]._id;

      const params = {
        chat_dialog_id: dialogId,
        sort_desc: "date_sent",
        limit: 100,
        skip: 0
      };

      const messages = await ConnectyCube.chat.message.list(params)
      
      UserService.messages = messages.items

    }

}

const userService = new UserService()

Object.freeze(userService)

export default userService