const { expect } = require('chai');
const sinon = require('sinon');

const ProductsController = require('../../../controllers/productsController');
const ProductsService = require('../../../services/productsService');


describe('Test layer controller ', () => {

  describe('Test function getAll', () => {

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

    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(async () => {
      sinon.stub(ProductsService, 'getAll').resolves(produtcs);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(async () => {
      ProductsService.getAll.restore();
    });

    it('should have status 200', async () => {
      await ProductsController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('should have return a json ', async () => {
      await ProductsController.getAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Test function getById', () => {

    const produtcById = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ];

    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(async () => {
      req.params = '1';
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await sinon.stub(ProductsService, 'getById').resolves(produtcById);
    });

    afterEach(async () => {
      await ProductsService.getById.restore();
    });

    it('should have status 200', async () => {
      await ProductsController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('should have return a json', async () => {
      await ProductsController.getById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
