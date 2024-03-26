import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductsController from '../../../src/controllers/products.controller';
import ProductServices from '../../../src/services/product.service';
import { ReturnApiMock } from '../../mocks/ApiMock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Deve criar um produto', async function () {

    sinon.stub(ProductServices, 'createProduct').resolves(ReturnApiMock.createProduct);

    req.body = {
      name: 'Faquinha',
      price: '3 peças de ouro',
      userId: 10
    };

    await ProductsController.createProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(ReturnApiMock.createProduct).to.include(req.body);
  });
  it('Deve falhar retornando status 500', async function () {

    sinon.stub(ProductServices, 'createProduct').resolves();

    req.body = {
      name: 'Faquinha',
      price: '3 peças de ouro',
      userId: 10
    };

    await ProductsController.createProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(500);
  });
  it('Deve falhar retornando status 400', async function () {

    sinon.stub(ProductServices, 'createProduct').resolves({ status: 400, message: 'Required Fields Missing! Please, check the fields and try again.'});

    req.body = {
      name: '',
      price: '3 peças de ouro',
      userId: 10
    };

    await ProductsController.createProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(400);
  });
  it('Deve listar todos os produtos', async function () {

    sinon.stub(ProductServices, 'getProductList')
    .resolves(ReturnApiMock.dataValueGetList.dataValues as any);

    await ProductsController.getProductList(req, res);
    
    expect(res.json).to.have.been.calledWith(ReturnApiMock.dataValueGetList.dataValues);
  });
  it('Deve falhar retornando status 500', async function () {
      
      sinon.stub(ProductServices, 'getProductList').rejects({ message: 'Error forçado'} as any);
  
      await ProductsController.getProductList(req, res);
      
      expect(res.status).to.have.been.calledWith(500);
    });
});
