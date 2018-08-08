import axios from "axios";

import { generateUrl } from "../global";
import UserResource from "./UserResource";

class ContentRepo {
  static async getContents() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("content_repositories"), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async getWorkShop(id) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`events/${id}`), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async getWorkShopSchedules(params) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`event_batches`), {
      headers: {
        Authorization: authentication_token
      },
      params
    });
  }

  static async getAllWorkshops() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`events`), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async getAllWorkshopsByGenre(genre_id) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`events`), {
      headers: {
        Authorization: authentication_token
      },
      params: {
        genre_id
      }
    });
  }

  static async bookWorkshop(data) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`user_events`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication_token
      },
      data: {
        data
      }
    });
  }

  static async withdrawFromWorkshop(data) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`user_events`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication_token
      },
      data: {
        data
      },
      params: {
        withdraw: 1
      }
    });
  }
}

export default ContentRepo;
