# D365JS
A library to support object-oriented JavaScripting for Microsoft Dynamics 365 (D365)

It provides a base class, called 'FormClass', that simplifies many common tasks performed by JavaScript Web Resources in D365

Installation
npm i -D D365JS

Note: Using modules in D365 requires the use of webpack to bundle the required files into a single JavaScript file. So you'll also need to run: npm i -D webpack webpack-cli

Implementing a class-based file structure in PowerApps Web Resources is not possible natively. This is due to PowerApps Web Resource files and their dependencies asynchronous, resulting in the browser being unable to define classes or instantiate objects from them if they are defined in other files.

The way that I’ve worked around this constraint, is to use WebPack to transpile my source files into a single library file, and use that as my sole web resource.

Go to the 'sample' folder to see an example of how D365JS can be used. The sample\source\js folder contains custom code for two forms related to the OOTB D365 Account table.
The sample code shows a structure suitable to applying object-orient design principles, and the D365JS FormClass to your own model-driven applications:

Account.js
Exports an Account class, extending the FormClass, containing methods and properties related to the Account table, but not specific to any particular form.

Account.Form.js
Contains an AccountForm class, extending the Account class, containing methods and properties specific to the default form of the Account table. 
It exports an OnLoad function that instantiates a new AccountForm object, and an OnSave function that calls the OnSave method of the AccountForm class.
OnLoad ofan Account form, this seta default 'name', and sets an onChange event for the 'websiteurl' field that sets the 'tickersymbol' filed to "D365JS".

Account.QuickForm.js
Contains a AccountQuickForm class, extending the Account class, containing methods and properties specific to the QuickCreate form of the Account table. 
It exports an OnLoad function that instantiates a new AccountQuickForm object.

The 'webpack.config.js' file contains the settings neeed to generate a JS bundle for each of the Account forms we have coded for. As the webpack is performed, it generates two files in the 'dist' folder:
D365JS.AccountForm.bundle.js
D365JS.AccountQuickForm.bundle.js

These files can stored as Web Resources in your Power Apps solution, and then included in their respective forms. The OnLoad and OnSave event logic is referenced as:
D365JS.AccountForm.OnLoad
D365JS.AccountForm.OnSave
D365JS.AccountQuickForm.OnLoad
D365JS.AccountQuickForm.OnSave



Install and configure WebPack
In the VS Terminal initialise a project for your solution, and add a dev-dependency for WebPack and the WebPack CLI:
npm init -y
npm i -D webpack webpack-cli

This will generate a package.json file, add it to your VS solution.
Update the package.json file, adding a build script, to execute WebPack:
  "scripts": {
    "build": "webpack",
    "prod-build": "webpack --mode production"
  },

It should look like the image below:

 
Now create a webpack.config.js file, add it to your solution:
const path = require('path');
module.exports = {
  mode: "development",
  entry: {
      "AccountForm" : path.resolve(__dirname, 'source/js/Account.Form.js')
      "AccountQuickForm" : path.resolve(__dirname, 'source/js/Account.QuickForm.js')
  },
  output: {
    library: 'D365JS',
    path: path.resolve(__dirname, 'dist/js'),  
    filename: '[name].bundle.js'
  },
  devtool: 'source-map'
}


When you execute npm run build, this will run WebPack applying the above config settings. Here’s what they all do:
const path = require('path');
Allows the use of the path library to reference our current directory


mode: "development",
Defaults our build to a development (non-compressed) version


entry: {
    "AccountForm" : path.resolve(__dirname, 'source/js/Account.Form.js')
    "AccountQuickForm" : path.resolve(__dirname, 'source/js/Account.QuickForm.js')
},
Specifies our source files that we want to use as WebResources.


output: {
  library: ['D365','[name]'],
    Specifies our files will be available via a call to the D365JS.[name] object. Where [Name] is replaced by the name given to each entry property


  path: path.resolve(__dirname, 'dist'),  
   Places our files into the dist folder from our current directory


  filename: '[name].bundle.js'
    Specifies the naming convention used to for our new files
},


  devtool: 'source-map'
   Tells WebPack to generate a source map for each fell, to assist with debugging.
}

 This will generate a dist folder containing a bundled JS file for each main class, and the associated map files to assist with debugging:


Using these Libraries in a Model-Driven Application
Once you’ve added these bundle files to your model-driven app, you can add them as resources for a Form. To invoke them in a form event, call a function in the form <library>.<entry name>.<exported function name> eg:
D365JS.AccountForm.OnLoad()

