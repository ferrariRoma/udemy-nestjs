import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find(email: string) {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create(email: string, password: string) {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('signup', () => {
    describe('Successful creation of new users', () => {
      it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('Password hashed and salted', () => {
      it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup(
          'testFirst@example.com',
          'testPasswordFirst',
        );

        expect(user.password).not.toEqual('testPasswordFirst');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
      });
    });

    describe('Email already in use exception', () => {
      it('throws an error if user signs up with eamil that is in use', async () => {
        await service.signup('test@example.com', 'testFailed');
        await expect(
          service.signup('test@example.com', 'testPassword'),
        ).rejects.toThrow(BadRequestException);
      });
    });
  });

  describe('signin', () => {
    describe('User not found exception', () => {
      it('throws if signin is called with an unused email', async () => {
        await expect(
          service.signin('test@example.com', 'testPassword'),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('Wrong password exception', () => {
      it('throws if an invalid password is provided', async () => {
        await service.signup('test@example.com', 'correctPassword');
        await expect(
          service.signin('test@example.com', 'wrongPassword'),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('Successful login', () => {
      it('returns a user if correct password is provided', async () => {
        await service.signup('example@example.com', 'mypassword');
        const user = await service.signin('example@example.com', 'mypassword');
        expect(user).toBeDefined();
      });
    });
  });
});
