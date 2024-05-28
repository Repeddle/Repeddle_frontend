import { Stations } from "./../types/product"
import axios from "axios"
import api from "./api"

export const loginGig = async () => {
  const { data } = await api.post(
    "https://thirdparty.gigl-go.com/api/thirdparty/login",
    {
      username: "IND1109425",
      Password: "RBUVBi9EZs_7t_q@6019",
      SessionObj: "",
    }
  )
  return {
    token: data.Object.access_token,
    username: data.Object.UserName,
    userId: data.Object.UserId,
  }
}

export const fetchStations = async () => {
  try {
    const token = await loginGig()

    const { data }: { data: { Object: Stations[] } } = await axios.get(
      "https://thirdparty.gigl-go.com/api/thirdparty/localStations",
      {
        headers: { Authorization: `Bearer ${token.token}` },
      }
    )

    return data.Object
  } catch (error) {
    console.error(error)
  }
}
