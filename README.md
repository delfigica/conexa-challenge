# CONEXA CHALLENGE

Technical challenge for Conexa: The objective of this application is to display characters from the Rick and Morty series, which come from the API [https://rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation). A number of characters (default is two) are selected, and for each selected character, a list is returned of episodes in which the other characters do not appear. Additionally, a combined list of episodes where all selected characters appear together is provided.

The application was built with Next.js using TypeScript, plain CSS, Axios, and was tested with Jest.

## Live Version: [https://delfigica.github.io/conexa-challenge/](https://delfigica.github.io/conexa-challenge/)

##  Challenge 
The Rick and Morty API (https://rickandmortyapi.com/) will be used, analyzing it and meeting the following objectives:

 - Obtain a list of characters, paginated, in two sections: Character #1 and Character #2.
 - Each character must be displayed as a “Card” with their status and species.
 - Below these two lists, there will be 3 sections:
   
- [x] Character #1 - Only Episodes: This section should list only the episodes where the character selected in the Character #1 section appears alone.
- [x] Character #1 & Character #2 - Shared Episodes: This section should list the episodes where the characters selected in the Character #1 and Character #2 sections appear together.
- [x] Character #2 - Only Episodes: This section should list only the episodes where the character selected in the Character #2 section appears alone.

## Getting Started

First, run the install command:
```bash
npm install
npm run dev
```
Open [http://localhost:3000/conexa-challenge](http://localhost:3000/conexa-challenge) with your browser to see the result.
