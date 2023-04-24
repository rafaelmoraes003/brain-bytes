import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import Question from '../models/question';
import HTTPCodes from '../enum/HTTPCodes';
import IQuestion from '../interfaces/IQuestion';
import questions from './mocks/questions';
import adminToken from './mocks/adminToken';

chai.use(chaiHttp);

const { expect } = chai;

const questionsRoute: string = '/questions';

describe('GET /questions', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(Question, 'find')
        .resolves(questions);
    });

    after(() => {
      (Question.find as sinon.SinonStub).restore();
    });

    it('Status 200 with questions', async () => {
      const response: Response = await chai
        .request(app)
        .get(questionsRoute)
        .set('Authorization', adminToken);

      expect(response.status).to.be.equal(HTTPCodes.OK);
      expect(response.body).to.be.deep.equal(questions);
    });
  });

  describe('Server error', () => {
    before(() => {
      sinon
        .stub(Question, 'find')
        .rejects();
    });

    after(() => {
      (Question.find as sinon.SinonStub).restore();
    });

    it('Status 500 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .get(questionsRoute)
        .set('Authorization', adminToken);

      expect(response.status).to.be.equal(HTTPCodes.SERVER_ERROR);
      expect(response.body.error).to.be.equal('Error');
    });
  });

});