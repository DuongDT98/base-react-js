import CommonConfig from "./common.config";
// import DevConfig from "./dev.config";
// import StagingConfig from "./staging.config";
// import ProductionConfig from "./production.config";

let config = CommonConfig;

// const mode = (
//   process.env.REACT_APP_STAGE ||
//   process.argv[2] ||
//   "production"
// ).trim();
// if (mode === "staging") {
//   // dev code
//   config = Object.assign(config, StagingConfig);
// } else if (mode === "dev") {
//   // production code
//   config = Object.assign(config, DevConfig);
// } else {
//   config = Object.assign(config, ProductionConfig);
// }

export default config;
