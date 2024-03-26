import { expect } from 'chai';
import sinon from 'sinon';
import ProductsService from '../../../src/services/product.service';
import { ReturnApiMock } from '../../mocks/ApiMock';
import Product from '../../../src/database/models/product.model';
import { Model } from 'sequelize';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Deve criar um produto', async function () {

    const modelMock = {
      dataValues: ReturnApiMock.createProduct
    };
    sinon.stub(Product, 'create').resolves( modelMock as Model<any, any>);

    const product = await ProductsService.createProduct(ReturnApiMock.createProduct);
    expect(product.data).to.be.eql(ReturnApiMock.createProduct);
  });
  it('Deve falhar ao criar um produto e retornar status 400', async function () {

    const modelMock = {
      dataValues: ReturnApiMock.createProduct
    };
    sinon.stub(Product, 'create').resolves( modelMock as Model<any, any>);

    const product = await ProductsService.createProduct({  name: '', price: '', userId: 0 });
    expect(product.status).to.be.eql(400);
  });
  it('Deve retornar uma lista de produtos', async function () {

    sinon.stub(Product, 'findAll').resolves( ReturnApiMock.dataValueGetList as any );

    const products = await ProductsService.getProductList();
    expect(products).to.be.eql(ReturnApiMock.dataValueGetList );
  });
});

