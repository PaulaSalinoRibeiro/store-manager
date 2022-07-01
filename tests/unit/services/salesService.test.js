const { expect } = require('chai');
const sinon = require('sinon');
const { getSalesById } = require('../../../models/salesModel');

const SalesService = require('../../../services/salesServices');
const SalesModel = require('../../../services/salesServices');
// const ProductsModel = require('../../../models/productsModel');

describe('Test createSales function in Service', () => {

  describe('When productId do not exist', () => {
    const sales = [
      {
        "quantity": 1
      }
    ]

    it('should be return a object', async () => {
      const result = await SalesService.createSales(sales);
      expect(result).to.be.a('object');
    });

    it('should return a object with erro ', async () => {
      const erro = { error: { code: 'badRequest', message: '"productId" is required' } }
      const result = await SalesService.createSales(sales);
      expect(result).to.deep.equal(erro);
    });

  });

  describe('When quantity do not exist', () => {
    const sales = [
      {
        "productId": 2
      }
    ]

    it('should be return a object', async () => {
      const result = await SalesService.createSales(sales);
      expect(result).to.be.a('object');
    });

    it('should return a object with erro ', async () => {
      const erro = { error: { code: 'badRequest', message: '"quantity" is required' } }
      const result = await SalesService.createSales(sales);
      expect(result).to.deep.equal(erro);
    });

  });

  describe('When qauntity is negative', () => {
    const sales = [
      {
        "productId": 1,
        "quantity": -1
      }
    ]

    it('should be return a object', async () => {
      const result = await SalesService.createSales(sales);
      expect(result).to.be.a('object');
    });

    it('should return a object with erro ', async () => {
      const erro = {
        error: {
          code: 'invalidDate',
          message: '"quantity" must be greater than or equal to 1',
        },
      };
      const result = await SalesService.createSales(sales);
      expect(result).to.deep.equal(erro);
    });
  });

});

describe('Test getAllSales function', () => {
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
    await sinon.stub(SalesModel, 'getAllSales').resolves(payload)
  });

  afterEach(async () => {
    await SalesModel.getAllSales.restore()
  });

  it('should be return a array', async () => {
    const result = await SalesService.getAllSales()
    expect(result).to.be.an('array')
  });

  it('should be return a array with length 2', async () => {
    const result = await SalesService.getAllSales()
    expect(result).to.deep.equal([
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
    ])
  });
});

describe('Test getSalesById function', () => {
  const payload = [
    {
      "SaleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "SaleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]

  beforeEach(async () => {
    await sinon.stub(SalesModel, 'getSalesById').resolves(payload)
  });

  afterEach(async () => {
    await SalesModel.getSalesById.restore()
  });

  it('should be return a array', async () => {
    const result = await SalesService.getSalesById(1)
    expect(result).to.be.an('array')
  });

  it('should be a array lenght without SalesId', async () => {
    const result = await SalesService.getSalesById(1)
    expect(result).to.deep.equal([
      {
        "SaleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "SaleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ])
  });
});
