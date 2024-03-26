import { expect } from 'chai';
import sinon from 'sinon';
import loginServices from '../../../src/services/login.services';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Deve retornar uma falha sem username', async function () {
    sinon.stub(UserModel, 'findOne').resolves('Hagar'as any) ;

    const result = await loginServices.LoginServices('', 'terrível');

    expect(result).to.be.eql({ message: '"username" and "password" are required', status: 400 });
  });

  it('Deve retornar uma falha sem password', async function () {
    sinon.stub(UserModel, 'findOne').resolves('Hagar'as any) ;

    const result = await loginServices.LoginServices('Hagar', '');

    expect(result).to.be.eql({ message: '"username" and "password" are required', status: 400 });
  });

  it('Deve retornar uma falha se o usuário não existir', async function () {
    sinon.stub(UserModel, 'findOne').resolves(undefined as any);

    const result = await loginServices.LoginServices('Hagar00', 'terrível');

    expect(result).to.be.eql({ message: 'Username or password invalid', status: 401 });
  });

  it('Deve retornar uma falha se a senha estiver incorreta', async function () {
    sinon.stub(UserModel, 'findOne').resolves({ dataValues: { id: 1, username: 'Hagar', password: 'terrível' } } as any);

    const result = await loginServices.LoginServices('Hagar', 'terrível00');

    expect(result).to.be.eql({ message: 'Username or password invalid', status: 401 });
  });

  it('Deve retornar um token se o usuário e senha estiverem corretos', async function () {
    sinon.stub(UserModel, 'findOne').resolves({ dataValues: { id: 1, username: 'Hagar', password: '$2a$10$SY/tV1uEQIXxUGmo2MnqwulEwFY8YXgAunZ6sntNTf5j2t.Z5dGK6' } } as any);

    const result = await loginServices.LoginServices('Hagar', 'terrível') as any;

    expect(result.token).to.be.deep.equal('eyJhbGciOiJIUzI1NiJ9.MQ.fGaUARI99DDadCuNm4ZUhaB6Bpx8KiJsnCLTisJ0bp4' );
    expect(result.status).to.be.deep.equal(200);
    expect(result.message).to.be.deep.equal(undefined);
  });

});
