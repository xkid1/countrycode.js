const currentVersion = require('../package.json').version;
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const versionIncrements = ['major', 'minor', 'patch', 'prerelease'];

async function releaseMain() {
    //
}

releaseMain();
