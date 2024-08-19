import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/auth.signin.dto";

export class AuthController {
  readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signUp(data: SignUpDto) {
    try {
      return this.authService.signUp(data)
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}