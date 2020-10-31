const { series } = require('gulp');

const workflows = require('./workflows');
const release = require('./release');

exports.workflows = workflows.all;
exports.release_patch = series(release.patch, workflows.all);
exports.release_minor = series(release.minor, workflows.all);
exports.release_major = series(release.major, workflows.all);
