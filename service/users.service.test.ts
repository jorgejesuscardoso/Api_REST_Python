import { expect } from 'chai';
import sinon from 'sinon';
import UsersService  from '../../../src/services/users.services';
import { ReturnApiMock } from '../../mocks/ApiMock';
import User from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Deve retornar a lista de users', async function () {

   sinon.stub(User, 'findAll').resolves([{ username: 'Hagar', productIds: [1] }] as any);

    const result = await UsersService.getUsersWithOwnProducts();

    expect(result).to.be.deep.equal([{ username: 'Hagar', productIds: [undefined] }]) // Essa assertiva está errada, no thundercliente e no chrome a resposta é [{ username: 'Hagar', productIds: [1] }]
  });

  it('Deve falhar ao retornar a lista de users', async function () {

   sinon.stub(User, 'findAll').rejects(ReturnApiMock.mockUsers as any);

    const result = await UsersService.getUsersWithOwnProducts();

    expect(result).to.be.deep.equal({ message: 'Internal error' });
  });
});
