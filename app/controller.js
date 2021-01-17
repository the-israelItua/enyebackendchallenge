const axios = require("axios")

exports.convert = (req, res, next) => {
    const base = req.query.base;
    const currency = req.query.currency

    if(!base){
      const error = new Error("Base currency required")
      error.statusCode = 422
      throw error
    }

    if(!currency){
      const error = new Error("Conversion currency required")
      error.statusCode = 422
      throw error
    }

      axios.get(`https://api.exchangeratesapi.io/latest/?base=${base}&symbols=${currency}`)
      .then(data => {
        res.status(200).json({
          results: {
            base: data.data.base,
            date: data.data.date,
            rates: data.data.rates
          }
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };