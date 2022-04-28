import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthService {
  // KEYS
  private apiKeys: string[] = [
    process.env.API_KEY, // ADK SUPERHERO PRIVATE API KEY
  ];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }
}
