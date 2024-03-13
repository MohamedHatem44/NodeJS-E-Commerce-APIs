const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
/*-----------------------------------------------------------------*/
const getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
/*-----------------------------------------------------------------*/
const getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    //Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    //Execute query
    const document = await query;

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
/*-----------------------------------------------------------------*/
const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });
/*-----------------------------------------------------------------*/
const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    //Trigger "save" event
    document.save();
    res.status(200).json({ data: document });
  });
/*-----------------------------------------------------------------*/
const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    //Trigger "remove" event
    document.remove();
    res.status(204).send();
  });

/*-----------------------------------------------------------------*/
const getOneByQuery = (Model, component) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOne({ component :id});
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
/*-----------------------------------------------------------------*/
const updateOneByQuery = (Model, component, updatedBody) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOneAndUpdate({ [component]:id  }, updatedBody, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });
  /*-----------------------------------------------------------------*/
const deleteOneByQuery = (Model,component) =>
asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Model.deleteMany({ [component]: id });

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(204).send();
});
  /*-----------------------------------------------------------------*/
  const deleteMany = (Model,component) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.headers;
    const document = await Model.deleteMany({ [component]: id });
  
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });
/*-----------------------------------------------------------------*/
module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getOneByQuery,
  updateOneByQuery,
  deleteOneByQuery,
  deleteMany
};
/*-----------------------------------------------------------------*/
