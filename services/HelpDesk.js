import axios from "axios";

import { generateUrl } from "../global";
import UserResource from "./UserResource";

class HelpDesk {
  static async sendHelp(data) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("user_supports"), {
      method: "POST",
      headers: {
        Authorization: authentication_token
      },
      data: {
        data
      }
    });
  }
}

export default HelpDesk;
