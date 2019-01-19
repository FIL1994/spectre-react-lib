const fs = require("fs");
const execSync = require("child_process").execSync;
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");
const gulp = require("gulp");

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

gulp.task("build-es", done => {
  console.log("\nBuilding ES modules ...");
  exec("babel src -d es --ignore *.test.js", {
    BABEL_ENV: "es"
  });
  done();
});

gulp.task("build-commonjs", done => {
  console.log("Building CommonJS modules ...");
  exec("babel src -d lib --ignore *.test.js", {
    BABEL_ENV: "cjs"
  });
  done();
});

gulp.task("build-umd-dev", done => {
  console.log("\nBuilding UMD ...");
  exec("rollup -c -f umd -o umd/spectre-react-lib.js", {
    BABEL_ENV: "umd",
    NODE_ENV: "development"
  });
  done();
});

gulp.task("build-umd-prod", done => {
  console.log("\nBuilding UMD min.js ...");
  exec("rollup -c -f umd -o umd/spectre-react-lib.min.js", {
    BABEL_ENV: "umd",
    NODE_ENV: "production"
  });
  done();
});

gulp.task("umd-size", done => {
  const size = gzipSize.sync(fs.readFileSync("umd/spectre-react-lib.min.js"));
  console.log("\ngzipped, the UMD build is %s", prettyBytes(size));
  done();
});

gulp.task(
  "build",
  gulp.series(
    "build-es",
    "build-commonjs",
    "build-umd-dev",
    "build-umd-prod",
    "umd-size"
  )
);
