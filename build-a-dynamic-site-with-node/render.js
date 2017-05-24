const fs = require('fs');

const merge = (values, content) => {
  // loop over values object
  for (let key in values) {
    // replace placeholders with values
    content = content.replace(`{{${key}}}`, values[key]);
  }
  // return merged content
  return content;
};

const view = (template, values, response) => {
  // read from template file
  let contents = fs.readFileSync(`./views/${template}.html`, {encoding: 'utf8'});
  // insert values
  contents = merge(values, contents);
  // write out response
  response.write(contents);
};

module.exports.view = view;
