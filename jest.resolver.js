module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg) => {
      if (pkg.name === "@hookform/resolvers") {
        delete pkg["exports"];
        delete pkg["module"];
      }
      return pkg;
    },
  });
};
