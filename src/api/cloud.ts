import axios from "axios";
import {Location} from "./model"

export const searchLocation = (key: string) => {
  return  axios.get<Location[]>(`https://www.tianqi.com/tianqi/ctiy?keyword=${key}`).then(res => res.data)
}