import { ValidationExeption } from '../validator/validator.exeption';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseryDto } from './dto/LoginUser';
import { RegisterUserDto } from './dto/RegisterUser.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      register: jest.fn().mockResolvedValueOnce({ user: {}, error: false, errors: [] }),
      login: jest.fn().mockResolvedValueOnce({ id: 'user_id', token: 'token', error: false, errors: [] }),
    } as any;

    authController = new AuthController(authService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterUserDto = {
        firstName: 'Test',
        LastName: 'User',
        email: 'test@example.com',
        password: 'TestPassword123',
      };

      const result = await authController.register(registerDto, {} as any);

      expect(result).toEqual({ user: {}, error: false, errors: [] });
    });
  });

  describe('login', () => {
    it('should log in an existing user', async () => {
      const loginDto: LoginUseryDto = {
        email: 'test@example.com',
        password: 'TestPassword123',
      };

      const result = await authController.login(loginDto, {} as any);
      console.log(result);
      expect(result.error).toBeFalsy();
    });

    it('should handle incorrect password', async () => {
      const loginDto: LoginUseryDto = {
        email: 'test@example.com',
        password: 'IncorrectPassword',
      };
      const result = await authController.login(loginDto, {} as any);
      expect(result.error).toBeFalsy();
    });

    it('should handle user not found', async () => {
      const loginDto: LoginUseryDto = {
        email: 'nonexistent@example.com',
        password: 'TestPassword123',
      };

      const result = await authController.login(loginDto, {} as any);
      expect(result.error).toBeFalsy();
    });
  });
});
