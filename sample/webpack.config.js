const path = require('path');
module.exports = {
  mode: "development",
  entry: {
    "AccountForm" : path.resolve(__dirname, 'source/Account.Form.js'),
    "AccountQuickForm" : path.resolve(__dirname, 'source/Account.QuickForm.js')
  },
  output: {
    library: ['D365JS','[name]'],
    path: path.resolve(__dirname, 'dist'),   
    filename: '[name].bundle.js'
  },
  devtool: 'source-map'
}