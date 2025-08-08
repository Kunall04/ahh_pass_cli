#!/usr/bin/env node

const { Command } = require("commander");
const program= new Command();
const fs=require('fs');
const path=require('path');

const VAULT_FILE=path.join(__dirname, 'vault.json');

function load(){
       if(!fs.existsSync(VAULT_FILE)) return {};

       const fileData=fs.readFileSync(VAULT_FILE,'utf-8');
       return JSON.parse(fileData);
}

function saveVault(data){
       fs.writeFileSync(VAULT_FILE, JSON.stringify(data,null,2));
}

program.command('add <site> <username> <password>')
       .description('add a new username-pass entry')
       .action((site,username,password)=>{
              const vault=load();

              vault[site]={
                     username,
                     password
              };
              saveVault(vault);

              console.log(`Password saved for ${site}`);
       });

program.command('get <site>')
       .description('get the password for the site')
       .action((site,username,password)=>{
              const vault=load();

              if(!vault[site]) {
                     console.log(`no password found for ${site}`);
                     return;
              }

              console.log(`${site}:`);
              console.log(`Username: ${vault[site].username}`);
              console.log(`Password: ${vault[site].password}`);
       });


program.command('list')
       .description('get the password for the site')
       .action((site,username,password)=>{
              const vault=load();
              
              console.log(vault);
       });

program.parse(process.argv); 