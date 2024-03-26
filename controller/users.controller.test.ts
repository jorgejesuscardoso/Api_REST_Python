import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UsersController from '../../../src/controllers/users.controllers';
import usersServices from '../../../src/services/users.services';
import { ReturnApiMock } from '../../mocks/ApiMock';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Deve retornar a lista de users', async function () {
    sinon.stub(usersServices, 'getUsersWithOwnProducts').resolves(ReturnApiMock.mockUsers);

    await UsersController.getUsers(req, res);
    
    expect(res.json).to.have.been.calledWith(ReturnApiMock.mockUsers);
    
  });
  it('Deve falhar ao retornar a lista de users', async function () {
    sinon.stub(usersServices, 'getUsersWithOwnProducts').rejects();

    await UsersController.getUsers(req, res);
    
    expect(res.status).to.have.been.calledWith(500);
  });

});
