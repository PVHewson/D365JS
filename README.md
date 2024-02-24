<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/PVHewson/D365JS">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">D365JS</h3>

  <p align="center">
    A library to support object-oriented JavaScripting for Microsoft Dynamics 365 (D365)<br/>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Implementing a class-based file structure in PowerApps Web Resources is not possible natively. This is due to PowerApps Web Resource files and their dependencies asynchronous, resulting in the browser being unable to define classes or instantiate objects from them if they are defined in other files.

The way that I’ve worked around this constraint, is to use WebPack to transpile my source files into a single library file, and use that as my sole web resource.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
npm i -D D365JS

Note: Using modules in D365 requires the use of webpack to bundle the required files into a single JavaScript file. So you'll also need to run: npm i -D webpack webpack-cli


1. Clone the repo
   ```sh
   git clone https://github.com/PVHewson/D365JS.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

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



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div>
    It provides a base class, called 'FormClass', that simplifies many common tasks performed by JavaScript Web Resources in D365
    <br />
    <a href="https://github.com/PVHewson/D365JS"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/PVHewson/D365JS">View Demo</a>
    ·
    <a href="https://github.com/PVHewson/D365JS/issues">Report Bug</a>
    ·
    <a href="https://github.com/PVHewson/D365JS/issues">Request Feature</a>
  </p>
</div>

<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/PVHewson/D365JS/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/PVHewson/D365JS](https://github.com/PVHewson/D365JS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/PVHewson/D365JS.svg?style=for-the-badge
[contributors-url]: https://github.com/PVHewson/D365JS/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PVHewson/D365JS.svg?style=for-the-badge
[forks-url]: https://github.com/PVHewson/D365JS/network/members
[stars-shield]: https://img.shields.io/github/stars/PVHewson/D365JS.svg?style=for-the-badge
[stars-url]: https://github.com/PVHewson/D365JS/stargazers
[issues-shield]: https://img.shields.io/github/issues/PVHewson/D365JS.svg?style=for-the-badge
[issues-url]: https://github.com/PVHewson/D365JS/issues
[license-shield]: https://img.shields.io/github/license/PVHewson/D365JS.svg?style=for-the-badge
[license-url]: https://github.com/PVHewson/D365JS/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/paul-hewson-nz
[product-screenshot]: images/screenshot.png