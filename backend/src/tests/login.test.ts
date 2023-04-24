import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import User from '../models/user';
import HTTPCodes from '../enum/HTTPCodes';
import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

const loginRoute: string = '/login';

interface IUserMock {
  _id: string,
  username: string,
  password: string,
}

const userInDatabase: IUserMock = {
  _id: '643d6e83426e597b3ab16c52',
  username: 'rafael',
  password: '827ccb0eea8a706c4c34a16891f84e7b', // 12345
};

describe('POST /login', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(userInDatabase);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Status 200 with token', async () => {
      const response: Response = await chai
        .request(app)
        .post(loginRoute)
        .send({
          username: 'rafael',
          password: '12345',
        } as IUser);

      expect(response.status).to.be.equal(HTTPCodes.OK);
      expect(response.body).to.have.key('token');
    });
  });

  describe('User not found', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Status 404 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(loginRoute)
        .send({
          username: 'rafael',
          password: '12345',
        } as IUser);

      expect(response.status).to.be.equal(HTTPCodes.NOT_FOUND);
      expect(response.body.error).be.equal('user not found.');
    });
  });

  describe('Semantic error', () => {
    it('Status 422 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(loginRoute)
        .send({
          username: 'rafael',
          password: '12',
        } as IUser);

      expect(response.status).to.be.equal(HTTPCodes.SEMANTIC_ERROR);
      expect(response.body.error).be.equal(
        'password - String must contain at least 3 character(s)',
      );
    });
  });

  describe('Incorrect password', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(userInDatabase);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Status 401 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(loginRoute)
        .send({
          username: 'rafael',
          password: '123456',
        } as IUser);

      expect(response.status).to.be.equal(HTTPCodes.UNAUTHORIZED);
      expect(response.body.error).be.equal(
        'incorrect password',
      );
    });
  });
});
