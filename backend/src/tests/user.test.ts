import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { Document, Types } from 'mongoose';
import { app } from '../app';
import User from '../models/user';
import HTTPCodes from '../enum/HTTPCodes';
import userInDatabase from './login.test';
import createdUsers from './mocks/createdUser';

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
