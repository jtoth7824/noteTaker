# noteTaker

## Description

This project demonstrates a adding a server and associated routes in order to handle the data being received from the front end application.  This application is a Note Taker program that allows a user to add a note title and description and save the information out to a JSON file.  As the user notes are added, they are displayed in the left column along with a delete icon.   If a user clicks any of the existing note titles in left column, then the note is displayed in right side of screen along with its full description.   The user is also able to edit an existing note by clicking the Edit icon in top right corner of screen.  If the user clicks the delete icon for a note, then the application deletes that specific note, writes out the shortened list of notes both to the screen and also to the JSON file.  

The application utilized an Express server.

## Table of Contents

* [Screenshots](#Screenshots)
* [Installation](#Installation)
* [Usage](#Usage)
* [Support](#Support)
* [Technologies](#Technologies)
* [Repository](#Repository)

## Screenshots
 
The following is a screenshot of the Note Taker application.

<p align="center">
  <img src="./Develop/images/noteTaker.png" alt="Note Taker application screenshot">
</p>

## Installation

* Install node.js to computer, if not already present.
    * Node.js can be installed from [here](https://nodejs.org/en/)
* Copy all the application files in folder 'Develop' locally to one's machine.
* In a terminal window where you copied the files, install 'express' using node package manager (npm)
    * **npm install express**

## Usage

This application requires Node.js to be installed.  It also requires the user to have installed 'Express' via npm.  (See [Installation](#installation) section.)  Once these items have been installed, the user can launch the application from a terminal window as follows:

**node server.js**

## Support

Please email me for further information jtoth7824@gmail.com


## Technologies

<div>Node.js</div>
<div>Express</div>
<div>Javascript</div>
<div>npm</div>
<div>HTML</div>
<div>CSS</div>

## Repository

Direct link to repository:  https://github.com/jtoth7824/noteTaker