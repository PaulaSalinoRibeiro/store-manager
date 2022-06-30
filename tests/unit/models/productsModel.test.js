const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('Test productsModel', () => {

  describe('check if find all products', () => {
    const produtcs = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    beforeEach(async () => {
      await sinon.stub(connection, 'execute').resolves(produtcs)
    });

    afterEach(async () => await connection.execute.restore());
    
    it('should be a object', async () => {
      const result = await ProductsModel.getAll();
      expect(result).to.be.a('object');
    });
  })

  describe('check if find product by id', () => {  
    describe('where find product', () => {

      const product = [{}];

      beforeEach(async () => {
        await sinon.stub(connection, 'execute').resolves(product);
      });

      afterEach(async () => await connection.execute.restore());

      it('should be a empty object', async () => {
        const result = await ProductsModel.getById('a')
        expect(result).to.be.a('object')
      });
    })

    describe('where not find product', () => {

      const productByID = [{
        "id": 1,
        "name": "Martelo de Thor",
      }];

      beforeEach(async () => {
        await sinon.stub(connection, 'execute').resolves(productByID);
      });

      afterEach(async () => await connection.execute.restore());

      it('should be a object with a product', async () => {
        const result = await ProductsModel.getById(1)
        expect(result).to.be.a('object')
      });

      it('should have a id and name with a product', async () => {
        const result = await ProductsModel.getById(1)
        expect(result).to.deep.equal({
          "id": 1,
          "name": "Martelo de Thor",
        })
      });
    });
  });

  describe('its possible add a new product', () => {
    const newProduct = [{ insertId: 1 }];

    beforeEach(async () => {
      await sinon.stub(connection, 'execute').resolves(newProduct)
    });

    afterEach(async () => {
      await connection.execute.restore();
    });

    it('should return a object', async () => {
      const result = await ProductsModel.add('test');
      expect(result).to.be.a('object');
    });

    it('should have id and name', async () => {
      const result = await ProductsModel.add('test');
      expect(result).to.deep.equal({ id: 1, name: 'test' });
    })
  });
});