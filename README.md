# Team Info:

Team-name: glamorous-quoll

Authors: [@self-jw, Jolly Walia](https://github.com/self-jw), [@spencerdezartsmith, Spencer Smith](https://github.com/spencerdezartsmith)

JS Dev Link:

Review Link:
https://github.com/self-jw/hello-web-servers.git

# Project Notes for the Reviewer

# Specs

### Stage 1

Setup the repo and file structure, install and configure Express, and get a basic server running.

- [X] Repo (your artifact) is created on GitHub
- [X] Repo follows a conventional file structure for an Express.js app:
 package.json: standard for any Node.js app; includes package info and lists dependencies
- [X] app.js: your Express server, with all routes defined
- [X] views/: for storing your Pug HTML templates
- [X] public/: for storing static files like CSS and images
- [X] README.md: includes overview of your repo
- [X] Express server can be started with $ node app.js
- [X] Server renders a page at the root route (/) that looks like the mockup but does not have any functionality - it is just a static page
- [X] All package dependencies are defined in package.json
- [X] The artifact produced is properly licensed, preferably with the MIT license

### Stage 2

Build out the template structure with Pug for a single-file editor. Don’t worry about multiple files for now, or implementing the markdown rendering.

- [X] Pug is installed and set up for HTML templating
- [X] View template files are created in the /views subdirectory
- [X] Main view file is called index
- [X] Includes are created for the different “components” of the main view:
- [X] Sidebar (shows list of files)
- [X] Header (shows current filename, word count, and save button)
- [X] Editor (shows markdown editor pane)
- [X] Preview (shows rendered markdown)
- [X] CSS is organized into one or more files in the public/ directory
- [X] CSS declarations are well-named and formatted (consider using this small guide)

### Stage 3

Setup real markdown rendering so that writing in the left panel updates the right panel, and make the “Save” button work.

- [X] Marked is installed
- [X] Markdown text written in the “Editor” pane is rendered in the “Preview” pane automatically
- [X] Preview is updated every time text in the editor changes
- [X] Clicking the “Save” button saves the markdown text in the editor to a file in a subdirectory of the server data/
- [X] The markdown file in data/ is loaded and used as the starter text in the editor (in other words, the last saved text is loaded by default)

### Stage 4

Build out multiple-file functionality, and use cookies to remember the last opened file.

- [X] Users can create more than one markdown file
- [X] Each file has its own URL, named after its filename (for example, if the markdown file is called Todos.md, its URL would be http://localhost:3000/todos)
- [X] Markdown files are listed in the sidebar
- [X] Clicking on the “New File” button in the sidebar lets users create a new file and prompts for the file name using prompt()
- [X] Clicking on a file in the sidebar will navigate to the page, load the file contents into the editor, and render them in the preview
- [X] Markdown content can still be saved to files in data/, with one file in data/ for each file in the sidebar
- [X] Most recently edited file is tracked using a cookie
- [X] When visiting the root route (/), users are redirected to the file they last edited
