import axios from "axios";

const characterServiceClient = axios.create({
  baseURL: "http://characters:3002"
});

interface CharacterClient {
  getCharacter(uid: string, index?: number): Promise<any>;
  getArmory(uid: string, index?: number): Promise<any>;
  getGarage(uid: string, index?: number): Promise<any>;
  getMessages(uid: string): Promise<any>;
}

const CharacterService: CharacterClient = {
  async getCharacter(uid: string, index: number = 0) {
    const key = `${uid}_${index}`;
    return await characterServiceClient.get(`/${key}`);
  },

  async getArmory(uid: string, index: number = 0) {
    const key = `${uid}_Armory_Unlocks_${index}`;
    return await characterServiceClient.get(`/${key}/armory`);
  },

  async getGarage(uid: string, index: number = 0) {
    const key = `${uid}_Garage_Unlocks_${index}`;
    return await characterServiceClient.get(`/${key}/garage`);
  },

  async getMessages(uid: string) {
    const pre_number = uid.slice(-6);
    const key = '0160' + pre_number;
    return await characterServiceClient.get(`/${key}/messages`);
  }
}

export default CharacterService;
