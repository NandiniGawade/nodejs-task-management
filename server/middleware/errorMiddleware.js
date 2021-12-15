const notFound = (req, res, next) => {
    console.log(req.originalUrl)
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  export { notFound };
  