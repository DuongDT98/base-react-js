export const PREFIX_ROUTES = {
  MAIN: "",
  AUTH: "/auth",
};

const ROUTES = {
  MAIN: {
    LOGIN: `${PREFIX_ROUTES.MAIN}/auth`,
    HOME: `${PREFIX_ROUTES.MAIN}/over-view`,
    CATEGORY: `${PREFIX_ROUTES.MAIN}/category`,
    REPORT: `${PREFIX_ROUTES.MAIN}/report`,
    REQUEST: `${PREFIX_ROUTES.MAIN}/request`,
    USER_PROFILE: `${PREFIX_ROUTES.MAIN}/user-profile`,
    FINANCE: `${PREFIX_ROUTES.MAIN}/finance`,
  },
  AUTH: {
    LOGIN: `${PREFIX_ROUTES.AUTH}`,
  },
  NOT_FOUND: {
    NOT_FOUND: "*",
    USE_ROLE: "/not-admim",
  },
};

export default ROUTES;
