type ExpectedAuthResponse = {
  name: string;
  email: string;
  profilePicture: string;
};

export interface AuthProvider {
  validate: (token: string) => Promise<ExpectedAuthResponse>;
}

export class Auth {
  provider: AuthProvider;
  constructor(provider: AuthProvider) {
    this.provider = provider;
  }
  async authenticate(token: string) {
    return this.provider.validate(token);
  }
}
