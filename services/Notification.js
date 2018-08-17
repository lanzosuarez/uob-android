import axios from "axios";

import { generateUrl } from "../global";
import UserResource from "./UserResource";

class Notification {
  static async getNotifications() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("notifications"), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async readNotification(id) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`notifications/${id}`), {
      method: "PUT",
      headers: {
        Authorization: authentication_token
      }
    });
  }
}

export default Notification;
