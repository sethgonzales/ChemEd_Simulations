# _ChemEd Simulations_

#### By _**Seth Gonzales**_

## Technologies Used

- _JavaScript_
- _HTML_
- _CSS_
- _Bootstrap_
- _Node.js v18.17.1_
- _NPM v9.6.7_
- _React_
- _JSX_
- _JS Canvas_
- _JS Konva_

## Description

_ChemEd Simulations is an [application](https://github.com/sethgonzales/ChemEd_Simulations/) for students to create accounts and utilize simulations that model scientific phenomena. This is a React application with authorization and authentication._

![Component Tree](./src/img/ChemEd%20Components.png)

## Setup and Installation Requirements

* In the terminal...
  * Clone the repository from GitHub using `$ git clone https://github.com/sethgonzales/ChemEd_Simulations.git` and navigate to the project's root directory.
  * Run `$ npm install` from the root directory to install all packages.
  * Build the project from the root directory using `$ npm run build`.
  * Run the project on a server in your browser using `$ npm run start`.
  * Or visit the [hosted website](https://chemed-6a31a.web.app/).

## General App Usage
  * Create an account (/register) and log in (/login) to begin using the simulations. You can view (/account) and edit (/edit) your account info at any time.

![Login Page](./src/img/login.png)

  * Interact with the following simulations:
  
![Simulations Page](./src/img/simulations.png)

  * States of Matter
    * Use the "Change State" button to switch between solid, liquid, and gas phase particles. Observe their behavioral differences.

![States Of Matter Page](./src/img/statesofmatter.png)

  * Lewis Structures
    * Build common Lewis Structures with full representation.
      * 'command' + click to create clones 
      * click on items to change their size or rotation
      * press the 'delete' key while an item is selected to remove it from the page

![States Of Matter Page](./src/img/lewisstructure.png)

## Known Bugs

- _Triple bonds missing from Lewis Structures._
- _Copied Lewis Structure items do not maintain size._
- _If you find any additional bugs, please report them to sethgonzales157@gmail.com._


## License

MIT License

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright © 2023
```

## Contact Information

If you encounter any additional bugs, please report them to sethgonzales157@gmail.com!

<p align="center"><a href="#">Return to Top</a></p>


## Research & Planning Log
### Friday, 12/1
* 8:00: Create project README and proposal files. Begin working.
* 8:30: Complete proposal
* 9:20: Research particle movement with Udemy tutorial
* 10:00: Continue Udemy tutorial on Breakout game with particles.
* 10:40; Continue Udemy tutorial 
* 11:20; Continue Udemy tutorial learn how to move objects in canvas
* 12:00; Complete Udemy tutorial for using canvas and creating Breakout game with moving objects
* 12:15; game to gh and deploy to gh-pages
* 1:15; create react application from template
* 1:45; add env and initiate firestore with auth for application
* 2:25; update file structure and create file tree
* 3:10; add basic setup of home page and auth
* 3:45; restructure chem controller
* 4:35; restructure chem controller further
* 4:55; continue the great restructuring of the chem controller to one day conditionally render buttons correctly... one day...

### Thursday 12/7
* Refactor project to be route based instead of controller based. Update some styling in the process

### Friday, 12/8
* 8:00: Begin working
* 8:30: Continue research on dynamic headers using svg background images
* 9:00: Continue trial and error with svg 😔
* 9:40: Research further into dynamic headers
* 10:10: Begin working on simulation
* 10:50: Randomize particle movement
* 11:30: Style canvas and particles
* 12:10: Correct particle movement against wall, create temp slider.
* 12:50: Work on particle movement at different states of matter.
* 1:35: Refactor movement and research alt methods
* 2:10: Try using React Knova for animation rendering
* 2:50: Destructure into three separate components and go back to using canvas
* 3:40: Restructure back into one part... Then back into three...
* 4:10: Continue restructuring
* 4:50: Create logic for solid attractive forces. Continue manipulating this logic.
* 6:00: Retool solids to exist within grids..

### Friday, 12/8
* 8:00: Begin working
* 10:30: OH NO I FORGOT TO START COMMITTING.. I have updated user logic for the log in and account detail pages and changes routing settings. I AM NOW STARTING MY COMMIT TIMER :( s
* 11:20: Fix auth issue and style simulation list page 
* 12:05: Redo and finish styling on simulations page 
* 1:20: begin adding user Auth to simulations 
* 1:50: reconfig auth across app 
* 2:30: continue reconfig auth across app 
* 3:10: begin restructure home page
* 3:50: continue restructure home page
* 4:30: start responsive design complete home styles
* 5:00: finish responsive design
* 5:20: add in atom to sim page

### Monday, 12/18
* 3:00: Begin working, research drag and drop functionalities
* 4:00: Continue research drag and drop functionalities
* 4:30: Create LS route and div elements
* 4:30: Try to develop basic dnd aspect
* 7:30: Begin reconfig dnd
* 9:30: Continue reconfig dnd

### Tuesday, 12/19
* 8:30: Begin working, continue research
* 9:00: Bug fixin
* 9:40: Begin refactor with new dnd library
* 10:20: complete basic dnd feature
* 11:40: Add in a lot of konva features including copy/paste and draggability
* 11:40: Change styling of stage 
* 1:10: Continue research on konva features
* 1:40: add cursor elements research rotation
* 2:20: add rotation research delete
* 3:00: add transformation to all objects
* 3:20: continue research on delete.... :(
* 3:40: add delete upon double click for elements
* 4:20: continue delete refactor

### Wednesday, 12/20
* 8:30: Begin working, work on resize bugs
* 9:00: Fix resize issues
* 9:40: begin refactor of click and delete to form factory functions
* 10:20: change selection to HOC
* 11:00: undo like all of my work today...start again
* 12:00: I FINALLY DID IT... can delete elements now with backspace
* 12:30: refactor clone so that it is in parent object
* 1:50: work on implementing undo/redo
* 2:30: undo undo and redo... work on fixing copy bug
* 3:10: give up on copy bug... Move on to adding more elements
* 3:50: Complete adding more elements and single electrons and double bonds

### Thursday, 12/21
* 9:00: Begin working, work on double bond bugs
* 9:30: Fix double bond bugs
* 10:00: Complete README
