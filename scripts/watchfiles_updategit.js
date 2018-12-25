"use strict"

//require filewatcher module 
const chokidar = require('chokidar');

//require github assistant module
var runGitPush = require('./git-push.js');

//After every 10changes - push them to github
let changesCounter = 0;

// Initialize watcher.
var watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: ['*.txt', '*.log','.git','.env','.git/'],///(^|[\/\\])\..\..git/,
  persistent: true
});
 
// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
 
// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => {
    log('Raw event info:', event, path, details);

    changesCounter++;


   log(`Git edits remaining before a commit : ${20 - parseInt(changesCounter)}`);

    if (changesCounter > 10) {
      log('Git Update required >>>>>> commit now in progress ');
      runGitPush();
    	changesCounter = 0;
    }
  });
 
// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});


// Watch new files.
 //watcher.add('new-file');
 //watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);
 
// Get list of actual paths being watched on the filesystem
 //var watchedPaths = JSON.stringify(watcher.getWatched());
 
// Un-watch some files.
 //watcher.unwatch('new-file*');
 
// Stop watching.
 //watcher.close();
 
// Full list of options. See below for descriptions. (do not use this example)
/*
chokidar.watch('file', {
  persistent: true,
  ignored: '.git',
  ignoreInitial: false,
  followSymlinks: true,
  cwd: '.',
  disableGlobbing: false,
  usePolling: true,
  interval: 1000,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
  ignorePermissionErrors: false,
  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});
 */

console.log(`running filewatcher `);