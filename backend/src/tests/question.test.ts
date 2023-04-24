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
import token from './mocks/token';

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

describe('GET /:category', () => {
  describe('Success', () => {
    const nodeJSQuestions: IQuestion[] = questions.filter((q) => q.category === 'node.js');

    before(() => {
      sinon
        .stub(Question, 'aggregate')
        .resolves(nodeJSQuestions);
    });

    after(() => {
      (Question.aggregate as sinon.SinonStub).restore();
    });

    it('Status 200 with questions about category', async () => {
      const response: Response = await chai
        .request(app)
        .get(`${questionsRoute}/node.js`)
        .set('Authorization', adminToken);

      expect(response.status).to.be.equal(HTTPCodes.OK);
      expect(response.body).to.be.deep.equal(nodeJSQuestions);
    });
  });

  describe('Server error', () => {
    before(() => {
      sinon
        .stub(Question, 'aggregate')
        .rejects();
    });

    after(() => {
      (Question.aggregate as sinon.SinonStub).restore();
    });

    it('Status 500 with error message', async () => {
      const response: Response = await chai
        .request(app)
        .get(`${questionsRoute}/node.js`)
        .set('Authorization', adminToken);

      expect(response.status).to.be.equal(HTTPCodes.SERVER_ERROR);
      expect(response.body.error).to.be.equal('Error');
    });
  });
});

describe('POST /questions', () => {
  describe('Success', () => {
    before(() => {
      sinon
        .stub(Question, 'insertMany')
        .resolves();
    });

    after(() => {
      (Question.insertMany as sinon.SinonStub).restore();
    });

    it('Status 201 and created question message', async () => {
      const response: Response = await chai
        .request(app)
        .post(questionsRoute)
        .set('Authorization', adminToken)
        .send([questions[0]]);

      expect(response.status).to.be.equal(HTTPCodes.CREATED);
      expect(response.body.message).to.be.equal('1 question(s) created!');
    });
  });

  describe('Non admin trying to create questions', () => {
    it('Status 401 and error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(questionsRoute)
        .set('Authorization', token)
        .send([questions[0]]);

      expect(response.status).to.be.equal(HTTPCodes.UNAUTHORIZED);
      expect(response.body.error).to.be.equal('only admins can create new questions.');
    });
  });

  describe('Question with semantic error', () => {
    it('Status 422 and error message', async () => {
      const response: Response = await chai
        .request(app)
        .post(questionsRoute)
        .set('Authorization', adminToken)
        .send([{ ...questions[0], question: 1 }] as unknown as IQuestion);

      expect(response.status).to.be.equal(HTTPCodes.SEMANTIC_ERROR);
      expect(response.body.error).to.be.equal('0 - Expected string, received number');
    });
  });
});
