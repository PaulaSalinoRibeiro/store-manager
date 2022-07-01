const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/salesServices');
const SalesController = require('../../../controllers/salesController');

describe('Test createSales in controller', () => {
  const res = {};
  const req = {};
  const next = () => { };

  const payload = {
    "id": 1,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      }
    ]
  }

  beforeEach(async () => {
    req.body = [{
      "productId": 1,
      "quantity": 1
    }]
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await sinon.stub(SalesService, 'createSales').resolves(payload);
  });

  afterEach(async () => {
    await SalesService.createSales.restore();
  });

  it('should be return status 201', async () => {
    await SalesController.createSales(req, res, next);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('should be return a object json', async () => {
    await SalesController.createSales(req, res, next);
    expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});

describe('Test getAllSales function', () => {
  const req = {}
  const res = {}
  const next = () => { }

  const payload = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  
  beforeEach(async () => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns();
    await sinon.stub(SalesService, 'getAllSales').resolves(payload)
  });

  afterEach(async () => {
    await SalesService.getAllSales.restore()
  });

  it('should be return status 200', async () => {
    await SalesController.getAllSales(req, res, next)
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Test getSaleById function', () => {
  const req = {}
  const res = {}
  const next = () => { }

  const payload = [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]

  beforeEach(async () => {
    req.params = '1'
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns();
    await sinon.stub(SalesService, 'getSalesById').resolves(payload)
  });

  afterEach(async () => {
    await SalesService.getSalesById.restore()
  });

  it('should be return status 200', async () => {
    await SalesController.getSalesById(req, res, next)
    expect(res.status.calledWith(200)).to.be.equal(true);
  });

});