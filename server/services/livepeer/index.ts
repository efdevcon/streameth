import axios, { AxiosInstance } from "axios";

class LivepeerService {
  private apiUrl: string;
  private apiToken: string | undefined;
  private httpClient: AxiosInstance;

  constructor() {
    this.apiUrl = "https://livepeer.studio/api";
    this.apiToken = process.env.API_TOKEN;
    this.httpClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });
  }

  public async getSessionData(id: string): Promise<any> {
    try {
      const response = await this.httpClient.get("/session/" + id);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default LivepeerService;
