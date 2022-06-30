const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/salesServices');
const SalesController = require('../../../controllers/salesController');
const { addSalesProducts } = require('../../../models/salesModel');

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