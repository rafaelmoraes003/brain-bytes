import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { Types } from 'mongoose';
import { app } from '../app';
import User from '../models/user';
import HTTPCodes from '../enum/HTTPCodes';
import userInDatabase from './login.test';
import createdUsers, { mockUser } from './mocks/createdUser';
import token from './mocks/token';

chai.use(chaiHttp);

const { expect } = chai;

const userRoute: string = '/user';

describe('POST /user', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      sinon
        .stub(User, 'create')
        .resolves(createdUsers);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (User.create as sinon.SinonStub).restore();
    });

    it('Status 201 with token', async () => {
      const response: Response = await chai
        .request(app)
        .post(userRoute)
        .send({
          username: 'yoshi',
          password: '12345',
        });

      expect(response.status).to.be.equal(HTTPCodes.CREATED);
      expect(response.body).to.have.key('token');
    });
  });

  describe('Semantic error', () => {
    it('Status 422 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(userRoute)
        .send({
          username: 'rafael',
          password: '12',
        });

      expect(response.status).to.be.equal(HTTPCodes.SEMANTIC_ERROR);
      expect(response.body.error).to.be.equal('password - String must contain at least 3 character(s)');
    });
  });

  describe('User already exists', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(userInDatabase);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Status 400 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(userRoute)
        .send({
          username: 'rafael',
          password: '12345',
        });

      expect(response.status).to.be.equal(HTTPCodes.BAD_REQUEST);
      expect(response.body.error).to.be.equal('user already exists.');
    });
  });
});

describe('GET user/me', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Status 200 with user data', async () => {
      const response: Response = await chai
        .request(app)
        .get(`${userRoute}/me`)
        .set('Authorization', token);

      expect(response.status).to.be.equal(HTTPCodes.OK);
      expect(response.body).to.have.keys('_id', 'username', 'password', 'availableCategories', 'bytes', 'isAdmin');
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
        .get(`${userRoute}/me`)
        .set('Authorization', token);

      expect(response.status).to.be.equal(HTTPCodes.NOT_FOUND);
      expect(response.body.error).to.be.equal('user not found.');
    });
  });

  describe('Authorization token not found', () => {
    it('Status 404 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .get(`${userRoute}/me`);

      expect(response.status).to.be.equal(HTTPCodes.NOT_FOUND);
      expect(response.body.error).to.be.equal('token not found.');
    });
  });

  describe('Invalid authorization token', () => {
    it('Status 500 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .get(`${userRoute}/me`)
        .set('Authorization', '123');

      expect(response.status).to.be.equal(HTTPCodes.SERVER_ERROR);
      expect(response.body.error).to.be.equal('jwt malformed');
    });
  });
});

describe('DELETE /user/me', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(mockUser);

      sinon
        .stub(User, 'deleteOne')
        .resolves();
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (User.deleteOne as sinon.SinonStub).restore();
    });

    it('Status 204', async () => {
      const response: Response = await chai
        .request(app)
        .delete(`${userRoute}/me`)
        .set('Authorization', token);

      expect(response.status).to.be.equal(HTTPCodes.SUCCESS_NO_CONTENT);
    });
  });

  describe('Server Error', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(mockUser);

      sinon
        .stub(User, 'deleteOne')
        .rejects();
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (User.deleteOne as sinon.SinonStub).restore();
    });

    it('Status 204', async () => {
      const response: Response = await chai
        .request(app)
        .delete(`${userRoute}/me`)
        .set('Authorization', token);

      expect(response.status).to.be.equal(HTTPCodes.SERVER_ERROR);
    });
  });
});

describe('PATCH /user/bytes', () => {
  describe('Increment', () => {
    before(() => {
      sinon
        .stub(User, 'updateOne')
        .resolves();
    });

    after(() => {
      (User.updateOne as sinon.SinonStub).restore();
    });

    it('Status 204', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/bytes`)
        .set('Authorization', token)
        .send({
          operation: 'inc',
          bytes: 10,
        });

      expect(response.status).to.be.equal(HTTPCodes.SUCCESS_NO_CONTENT);
    });
  });

  describe('Decrement', () => {
    before(() => {
      sinon
        .stub(User, 'updateOne')
        .resolves({
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: new Types.ObjectId(),
          upsertedCount: 0,
          matchedCount: 1,
        });
    });

    after(() => {
      (User.updateOne as sinon.SinonStub).restore();
    });

    it('Status 204', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/bytes`)
        .set('Authorization', token)
        .send({
          operation: 'dec',
          bytes: 5,
        });

      expect(response.status).to.be.equal(HTTPCodes.SUCCESS_NO_CONTENT);
    });
  });

  describe('Not enough bytes to decrement', () => {
    before(() => {
      sinon
        .stub(User, 'updateOne')
        .resolves({
          acknowledged: true,
          modifiedCount: 0,
          upsertedId: new Types.ObjectId(),
          upsertedCount: 0,
          matchedCount: 0,
        });
    });

    after(() => {
      (User.updateOne as sinon.SinonStub).restore();
    });

    it('Status 400', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/bytes`)
        .set('Authorization', token)
        .send({
          operation: 'dec',
          bytes: 20,
        });

      expect(response.status).to.be.equal(HTTPCodes.BAD_REQUEST);
    });
  });

  describe('Invalid operation', () => {
    it('Status 400', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/bytes`)
        .set('Authorization', token)
        .send({
          operation: 'yyy',
          bytes: 20,
        });

      expect(response.status).to.be.equal(HTTPCodes.BAD_REQUEST);
    });
  });
});

describe('PATCH /user/category', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(User, 'updateOne')
        .resolves();
    });

    after(() => {
      (User.updateOne as sinon.SinonStub).restore();
    });

    it('Status 204', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/category`)
        .set('Authorization', token)
        .send({ category: 'java' });

      expect(response.status).to.be.equal(HTTPCodes.SUCCESS_NO_CONTENT);
    });
  });

  describe('Invalid category', () => {
    it('Status 400', async () => {
      const response: Response = await chai
        .request(app)
        .patch(`${userRoute}/category`)
        .set('Authorization', token)
        .send({ category: 'ruby' });

      expect(response.status).to.be.equal(HTTPCodes.BAD_REQUEST);
      expect(response.body.error).to.be.equal('category is not available.');
    });
  });
});
