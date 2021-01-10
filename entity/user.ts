import { AuthLoginRequest, CreateUserPayload, CreateUserRequest } from '~/store/userStore';

export class UserRegisterForm implements CreateUserPayload {
  email = '';
  name = '';
  password = '';
  rePassword = '';

  getPayload(): CreateUserRequest {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
    };
  }

  getLoginPayload(): AuthLoginRequest {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export class UserLoginForm implements AuthLoginRequest {
  email = '';
  password = '';
}
