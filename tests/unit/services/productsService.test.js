const { expect } = require('chai');
const sinon = require('sinon');

const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productsService'); 

describe('Test layer services', () => {

  describe('test getAll function and list all products', () => {

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
      sinon.stub(ProductsModel, 'getAll').resolves(produtcs)
    });

    afterEach(() =>
      ProductsModel.getAll.restore()
    );

    it('should be return a array', async () => {
      const result = await ProductsService.getAll()
      expect(result).to.be.an('array')
    });
  });

  describe('test function getById', () => {

    describe('when find product by id', () => {
      const productByID = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];

      beforeEach(async () => {
        await sinon.stub(ProductsModel, 'getById').resolves(productByID)
      });

      afterEach(async () => {
        await ProductsModel.getById.restore()
      });

      it('should be a array', async () => {
        const result = await ProductsService.getById('1')
        expect(result).to.be.an('array');
      });

      it('should have a id and name', async () => {
        const result = await ProductsService.getById('1')
        expect(result).to.deep.equal(productByID);
      });
    });

    describe('when not find by id', () => {
      const notFound = [{}];

      beforeEach(async () => {
        await sinon.stub(ProductsModel, 'getById').resolves(notFound)
      });

      afterEach(async () => {
        await ProductsModel.getById.restore()
      });

      it('should be a array', async () => {
        const result = await ProductsService.getById('9999')
        expect(result).to.be.an('array');
      });
    });
  });

  describe('test functioon that create a new product', () => {
    const newProduct = {
      id: 1,
      name: 'ProductA'
    };

    beforeEach(async () => {
      await sinon.stub(ProductsModel, 'add').resolves(newProduct);
    });

    afterEach(async () => {
      await ProductsModel.add.restore()
    });

    it('should be return a object', async () => {
      const result = await ProductsService.add('ProductA');
      expect(result).to.be.a('object');
    });

    it('should have a id and name', async () => {
      const result = await ProductsService.add('ProductA');
      expect(result).to.deep.equal({
        id: 1,
        name: 'ProductA'
      });
    });
  });

  describe('test if name is validate', () => {
    // const messageError = { error: { code: 'badRequest', message: '"name" is required' } }
    it('shoulde have return an objet', async () => {
      const result = await ProductsService.add('');
      expect(result).to.be.a('object')
    });
    // it('shoulde have return an objet with erro key', async () => {
    //   const result = await ProductsService.add('');
    //   expect(result).to.deep.equal(messageError);
    // });
  });
});