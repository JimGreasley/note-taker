# note-taker

## Description

This application will maintain a "database" of notes. Each note is comprised of a title and a free-format text area.  Notes can be created, saved, and deleted. This application will use express as the backend "server" and save and retrieve note data from a JSON (`db.json`) file. A unique id, provided by uuid(), is assigned to each new note. This id is used later to delete a specific note.  

Two HTML routes were created:

  - GET `/notes` - return the `notes.html` file to the client.

  - GET `*` - return the `index.html` file to the client.

 Three API routes were created:

  - GET `/api/notes` - Read the JSON file and responds with all saved notes to the client.

  - POST `/api/notes` - Receives a new note via the request, adds it to the JSON file, and then responds with the new note to the client.

  - DELETE `/api/notes/:id` - Receives the id of a note to deleted. The note with the matching id will be deleted from the JSON file. The updated array of notes is returned to the client.


## Heroku link:

https://mysterious-fortress-96702.herokuapp.com/
