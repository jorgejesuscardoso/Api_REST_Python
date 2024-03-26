import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import LoginServices from '../../../src/services/login.services';
import LoginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar erro do servidor', async function () {
    sinon.stub(LoginServices, 'LoginServices').rejects();

    req.body = { username: 'username', password: 'password' };

    await LoginController.LoginController(req, res);

    expect(res.status).to.have.been.calledWith(500);
  });

  it('Deve retornar erro de username não informados', async function () {
    req.body = { username: '', password: '123456' };

    await LoginController.LoginController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('Deve retornar erro de password não informado', async function () {
    req.body = { username: 'username', password: '' };

    await LoginController.LoginController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('Deve retornar erro de username ou password inválidos', async function () {
    sinon.stub(LoginServices, 'LoginServices').resolves({ message: 'Username or password invalid', status: 401 });

    req.body = { username: 100, password: 'password' };

    await LoginController.LoginController(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.send).to.have.been.calledWith({ message: 'Username or password invalid' });
  });

  it('Deve retornar token', async function () {
    sinon.stub(LoginServices, 'LoginServices').resolves({status: 200, token: 'token' });
    req.body = { username: 'Hagar', password: 'terrível' };

    await LoginController.LoginController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.called
    expect(res.send).to.have.been.calledWith({ token: 'token' });
  });
});
