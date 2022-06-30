const { expect } = require('chai');
// const sinon = require('sinon');

const SalesService = require('../../../services/salesServices');
// const SalesModel = require('../../../services/salesServices');
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
