const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db('schemes')
    .where('scheme_id', req.params.scheme_id)
    .first()

    if(!existing) {
      next({ 
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
        status: 404
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    const { scheme_name } = req.body
    if(
      !scheme_name || 
      scheme_name === '' || 
      typeof scheme_name !== 'string'
      ) {
      next({ 
        message: 'invalid scheme_name',
        status: 400
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body
    if(
      !instructions || 
      instructions === '' || 
      typeof instructions !== 'string'
      ) {
      next({ 
        message: 'invalid step',
        status: 400
      })
    } else if (
      typeof step_number !== 'number' || 
      step_number < 1
      ) {
      next({ 
        message: 'invalid step',
        status: 400
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
