// 11ty configuration
module.exports = config => {
  config.addPassthroughCopy("src/css/");
  config.addWatchTarget("src/css/");
  config.addPassthroughCopy("src/js/");
  config.addWatchTarget("src/js/");
  config.addPassthroughCopy("src/img/");
  config.addPassthroughCopy("src/assets/");
  config.addPassthroughCopy("src/favicon.ico");

  config.addFilter("readablePostDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
  });

    // 11ty defaults
    return {

      dir: {
        input: 'src',
        output: '_site'
      }

    };
  };

