import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne(id: number) {
        return Promise.resolve({
          id,
          email: 'test@example.com',
          password: 'testPassword',
        } as User);
      },
      find(email: string) {
        return Promise.resolve([
          {
            id: 3129827398,
            email,
            password: 'testPassword',
          } as User,
        ]);
      },
      // remove() {},
      // update() {},
    };

    fakeAuthService = {
      // signup() {},
      signin(email: string, password: string) {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('returns a list of users with the given email', async () => {
      const users = await controller.findAllUsers('test@example.com');
      expect(users.length).toEqual(1);
      expect(users[0].email).toEqual('test@example.com');
    });
  });

  describe('findAll', () => {
    it('returns a single user with the given id', async () => {
      const user = await controller.findUser(1);
      expect(user).toBeDefined();
    });

    it('throws an error if user with given id is not found', async () => {
      fakeUsersService.findOne = () => null;
      await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('signin', () => {
    it('updates session objects and returns user', async () => {
      const session = {
        userId: null,
      };
      const user = await controller.signin(
        { email: 'test@example.com', password: 'testPassword' },
        session,
      );
      expect(user.id).toEqual(1);
      expect(session.userId).toEqual(1);
    });
  });
});
