const isString = (val, maxLen) => typeof val === 'string'
&& val.length <= maxLen;

const checkProjectRequiredFields = (req, res, next) => {
  if (!req.body) {
    return res.status(422).json({ error: 'Missing body' });
  }
  const requiredFields = {
    name: 65,
    description: 1000,
    picture_url: 150,
    github_url: 150,
  };
  const missingOrInvalidFields = Object.keys(requiredFields)
    .filter((field) => {
      const fieldValue = req.body[field];
      if (!fieldValue) return true;
      const maxLen = requiredFields[field];
      return !isString(fieldValue, maxLen);
    });
  if (missingOrInvalidFields.length > 0) {
    return res.status(422).json({
      error: `Missing or invalid fields: ${missingOrInvalidFields}`,
    });
  }
  return next();
};

const checkProjectUnknownFields = (req, res, next) => {
  const validFields = [
    'name', 'description', 'picture_url', 'github_url', 'deploy_url', 'techno',
  ];
  const bodyFields = Object.keys(req.body);
  const unknownFields = bodyFields.filter((field) => !validFields.includes(field));
  if (unknownFields.length > 0) {
    return res.status(422).json({ error: `Unknown fields: ${unknownFields}` });
  }
  return next();
};

module.exports = {
  checkProjectRequiredFields,
  checkProjectUnknownFields,
};
