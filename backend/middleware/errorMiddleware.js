const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (error, req, res, next) => {

  /*when throwing an error the status code is 200, so we need to change it to 500 
  stating that there is an error*/
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
  //Specific error from mongoose known as CastError, it also has a kind property
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  });
};


export { notFound, errorHandler };