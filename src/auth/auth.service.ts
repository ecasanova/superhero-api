import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthService {
  // KEYS
  private apiKeys: string[] = [
    "6b9a7f25-8ce5-4781-b1e1-98c40b1b3884", // ADK SUPERHERO SHARED API KEY
  ];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }
}
