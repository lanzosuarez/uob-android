import axios from "axios";

import { generateUrl } from "../global";
import UserResource from "./UserResource";

class Evaluation {
  static async getEvaluations() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("evaluations"), {
      headers: {
        Authorization: authentication_token
      }
    });
  }
}

export default Evaluation;
