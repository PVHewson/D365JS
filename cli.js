#!/usr/bin/env node

const { program } = require('commander');

// Default help
program
  .description('Remember: Add \'import { FormClass } from "d365js";\' and Extend your classes from there.');

program
  .command('command1')
  .description('Description of command1!!')
  .action(() => {
    console.log('Executing command1');
    // Add functionality for command1 here
  });

// Define command2
program
  .command('command2')
  .description('Description of command2!!')
  .action(() => {
    console.log('Executing command2');
    // Add functionality for command2 here
  });

program.parse(process.argv);
