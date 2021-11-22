import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { UsersModule } from '../src/api/users/users.module';
import { UsersRepository } from '../src/api/users/users.repository';
import { StatusesRepository } from '../src/api/statuses/statuses.repository';
import { RolesRepository } from '../src/api/roles/roles.repository';
import { mockUsers } from './mocks/users.mock';
import { mockStatuses } from './mocks/statuses.mock';
import { mockRoles } from './mocks/roles.mock';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsersRepository = {
    findOneByEmail: jest.fn().mockImplementation((userEmail) => {
      const userExist = mockUsers.filter((user) => user.email === userEmail);

      if (userExist.length > 0) {
        return userExist[0];
      } else {
        return undefined;
      }
    }),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => {
      return { id: 3, ...user };
    }),
    findAndCount: jest.fn().mockImplementation(() => {
      return [mockUsers, mockUsers.length];
    }),
    findOne: jest.fn().mockImplementation((id) => {
      const userExist = mockUsers.filter((user) => user.id === id);

      if (userExist.length > 0) {
        return userExist[0];
      } else {
        return undefined;
      }
    }),
    delete: jest.fn().mockImplementation((id) => {
      const usersCount = mockUsers.length;
      const currentUsers = mockUsers.filter((user) => user.id !== id);

      if (currentUsers.length === usersCount - 1) {
        return true;
      } else {
        return false;
      }
    }),
    merge: jest.fn().mockImplementation((resource, dto) => {
      return Object.assign({}, resource, dto);
    }),
  };
  const mockStatusesRepository = {
    findOneByAbbreviation: jest.fn().mockImplementation((abbreviation) => {
      const statusExist = mockStatuses.filter(
        (status) => status.abbreviation === abbreviation,
      );

      if (statusExist.length === 1) {
        return statusExist[0];
      } else {
        return undefined;
      }
    }),
  };
  const mockRolesRepository = {
    findByIds: jest
      .fn()
      .mockImplementation((rolesIds) =>
        mockRoles.filter((role) => rolesIds.includes(role.id)),
      ),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .overrideProvider(StatusesRepository)
      .useValue(mockStatusesRepository)
      .overrideProvider(RolesRepository)
      .useValue(mockRolesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      data: mockUsers,
      page: 1,
      limit: 1,
      totalCount: mockUsers.length,
    });
  });

  it('/users/:id (GET)', () => {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];

    return request(app.getHttpServer())
      .get('/users/' + user.id)
      .expect(200)
      .expect((response: request.Response) => {
        const { id, fullName, password, email } = response.body;

        expect(typeof id).toBe('number');
        expect(fullName).toEqual(user.fullName);
        expect(email).toEqual(user.email);
        expect(password).toBeUndefined();
      });
  });

  it('/users (POST)', () => {
    const mockUser = {
      fullName: 'example three',
      email: 'examplethree@example.com',
      password: 'secret',
      roles: [1],
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(mockUser)
      .expect(201)
      .expect((response: request.Response) => {
        const { id, fullName, password, email } = response.body;

        expect(typeof id).toBe('number');
        expect(fullName).toEqual(mockUser.fullName);
        expect(email).toEqual(mockUser.email);
        expect(password).toBeUndefined();
      });
  });

  it('/users/:id (PATCH)', () => {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const mockUser = {
      fullName: 'example three',
    };

    return request(app.getHttpServer())
      .patch('/users/' + user.id)
      .send(mockUser)
      .expect(200)
      .expect((response: request.Response) => {
        const { id, fullName, password, email } = response.body;

        expect(id).toEqual(user.id);
        expect(fullName).toEqual(mockUser.fullName);
        expect(email).toEqual(user.email);
        expect(password).toBeUndefined();
      });
  });

  it('/users/:id (DELETE)', () => {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];

    return request(app.getHttpServer())
      .delete('/users/' + user.id)
      .expect(200)
      .expect((response: request.Response) => {
        const { id, fullName, password, email } = response.body;

        expect(typeof id).toBe('number');
        expect(fullName).toEqual(user.fullName);
        expect(email).toEqual(user.email);
        expect(password).toBeUndefined();
      });
  });
});
