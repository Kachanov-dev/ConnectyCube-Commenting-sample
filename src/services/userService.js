import ConnectyCube from 'connectycube';
import appConfig from '../appConfig.json';
import { authUser } from '../const.js';

class UserService {

  static messages = [];
  static dialog = {}
  static currentUser = {}

    async init() {
      await ConnectyCube.init(...appConfig.connectyCubeConfig)

      const session = await ConnectyCube.createSession(authUser)
      UserService.currentUser = session.user

      const userCredentials = {
        userId: session.user.id,
        password: authUser.password
      };

      await ConnectyCube.chat.connect(userCredentials)

      const dialogs = await ConnectyCube.chat.dialog.list();

      UserService.dialog = dialogs.items[0]

      await this.getAllMessages()
    }

    async sendMessage(messageText) {
      const dialog = UserService.dialog;
      const user = UserService.currentUser
      const text = messageText.trim()
      const date = Math.floor(Date.now() / 1000)
      const recipient_id = dialog.type === 3 ? dialog.occupants_ids.find(elem => elem != user.id)
        : dialog.xmpp_room_jid
  
      let msg = {
        type: UserService.dialog.type === 3 ? "chat" : "groupchat",
        body: text,
        extension: {
          save_to_history: 1,
          dialog_id: dialog._id,
          sender_id: user.id,
          date_sent: date,
        }
      }

      ConnectyCube.chat.send(recipient_id, msg)

      await this.getAllMessages()
    }

    async getAllMessages(){
      const params = {
        chat_dialog_id: UserService.dialog._id,
        sort_desc: "date_sent",
        limit: 100,
        skip: 0
      };

      const messages = await ConnectyCube.chat.message.list(params)

      UserService.messages = messages.items.reverse();
    }

    getMessages(){
      return UserService.messages
    }

    async sendMessageAsReplay(messageText, parent_message_id){
      const dialog = UserService.dialog;
      const user = UserService.currentUser
      const text = messageText.trim()
      const date = Math.floor(Date.now() / 1000)
      const recipient_id = dialog.type === 3 ? dialog.occupants_ids.find(elem => elem != user.id)
        : dialog.xmpp_room_jid
  
      let msg = {
        type: UserService.dialog.type === 3 ? "chat" : "groupchat",
        body: text,
        extension: {
          save_to_history: 1,
          dialog_id: dialog._id,
          sender_id: user.id,
          date_sent: date,
          parent_message_id
        }
      }

      ConnectyCube.chat.send(recipient_id, msg)

      await this.getAllMessages()
    }

    get messageUniqueId() {
      return ConnectyCube.chat.helpers.getBsonObjectId()
    }

}

const userService = new UserService()

Object.freeze(userService)

export default userService