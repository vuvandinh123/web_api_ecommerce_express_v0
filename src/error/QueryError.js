// QueryError.js

class QueryError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "QueryError";
    this.isOperational = true;
  }
}
module.exports = QueryError;