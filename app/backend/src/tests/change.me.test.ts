import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeams from '../database/models/teamModel';
import mockLogin from './mocks/loginMocks';
import team from './mocks/teamMocks';
import { user, users, validLoginBody, invalidEmailLoginBody, invalidPswdLoginBody } from './mocks/usersMocks';
import User from '../database/models/userModel';
import SequelizeMatches from '../database/models/matchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando arquivo Match', () => {
  beforeEach(() => sinon.restore)
it('Testa se retorna todos os times', async function(){

  const matches =  [{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": { "teamName": "São Paulo"},
  "awayTeam": { "teamName": "Grêmio"}
}]

sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any)

const response = await chai.request(app).get('/matches')
  
expect(response.status).to.be.eq(200);
  })

describe('GET /teams', function () { 
 it('Verifica se ao fazer uma requisição corretamente para o endpoint "/teams" se o retorno é o esperado', async () => {
  sinon.stub(SequelizeTeams, 'findAll').resolves(team.teams as any);

  const { status, body } = await chai.request(app).get('/teams');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team.teams);
 });

 it('Verifica se ao fazer uma requisição corretamente para o endpoint "/teams/:id" se o retorno é o esperado', async () => {
  sinon.stub(SequelizeTeams, 'findOne').resolves(team.team as any);

  const { status, body } = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team.team);
 })

 it('Verifica se o login não fornecer o email se é possível dar continuidade', async () => {
  const response = await chai.request(app).post('/login').send(mockLogin.loginDataWithinEmail);

  expect(response.status).to.equal(400);
  expect(response.body).to.deep.equal({ "message": "All fields must be filled" });

 });

 it('Verifica se o login não fornecer o password se é possível dar continuidade', async () => {
  const response = await chai.request(app).post('/login').send(mockLogin.loginDataWithinPassword);

  expect(response.status).to.equal(400);
  expect(response.body).to.deep.equal({ "message": "All fields must be filled" });
 });
   afterEach(sinon.restore);
});

describe('/login', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('Retorna todos os usuários', async function () {
    sinon.stub(User, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/login');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  it('Retorna pelo Id', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).get('/login/1');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(user);
  });

  it('Retorna um erro com um Id que não existe', async function () {
    sinon.stub(User, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/login/999');
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'User 999 not found' });
  });

  it('Retorna o token', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);
    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('Retorna um erro com um email que não existe', async function () {
    sinon.stub(User, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna um erro com um email inválido', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna um erro quando a senha é inválida', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(invalidPswdLoginBody);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna um erro quando email ou senha não passam', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send({});
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Retorna user-role', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + token);

    expect(status).to.equal(200);
    expect(body).to.have.key('role');
  });

  it('Retorna um erro com um email que não existe ', async function () {
    sinon.stub(User, 'findOne').resolves(user as any);

    const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);

    sinon.restore();
    sinon.stub(User, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + token);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna um erro ao usar um token errado', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + 'wrong_token');
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Retorna um erro quando token não passa', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });
});

describe('Teams Api tests', () => {

  it('Deve retornar metodo GET de /teams', async function() {
    const teams = [
      { "id": 5, "teamName": "Cruzeiro" }
    ]
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status } = await chai.request(app).get('/teams');
    expect(status).to.eq(200);
  });

  it('deve retornar metodo GET de /teams/:id', async function() {
    const team = { "id": 5, "teamName": "Cruzeiro" }
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);

    const { status } = await chai.request(app).get('/teams/5');
    expect(status).to.eq(200);
  });

  afterEach(sinon.restore);
});
});