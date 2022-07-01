const { expect } = require('chai');
const sinon = require('sinon');

const SalesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Test salesModel', () => {

  describe('test createSales function', () => {
    const result = [{ insertId: 1 }];

    beforeEach(async () => {
      await sinon.stub(connection, 'execute').resolves(result);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it('should be return a object', async () => {
      const result = await SalesModel.createSales();
      expect(result).to.be.a('object');
    });

    it('should be return a object with id key', async () => {
      const result = await SalesModel.createSales();
      expect(result).to.deep.equal({id: 1});
    });

  });

  describe('test addSalesProducts', () => {
    const saleProduct = [{ insertId: 1 }];

    beforeEach(async () => {
      await sinon.stub(connection, 'execute').resolves(saleProduct);
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it('should be a object', async () => {
      const result = await SalesModel.addSalesProducts(1, 1, 1);
      expect(result).to.be.a('object');
    });

    it('should be return a object with id key', async () => {
      const result = await SalesModel.addSalesProducts(1, 1, 1);
      expect(result).to.deep.equal({ id: 1 });
    });

  });

  describe('test getAllSales', () => {

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
      await sinon.stub(connection, 'execute').resolves(payload)
    });

    afterEach(async () => {
      await connection.execute.restore()
    });

    it('should be return a object', async () => {
      const result = await SalesModel.getAllSales();
      expect(result).to.be.a('object')
    });
  });

  describe('test getBy', () => {
    const payload = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ]

    beforeEach(async () => {
      await sinon.stub(connection, 'execute').resolves(payload)
    });

    afterEach(async () => {
      await connection.execute.restore()
    });

    it('should be return just a object', async () => {
      const result = await SalesModel.getSalesById(1)
      expect(result).to.be.a('object')
    });   
  });
});