export const getLabelFromValue = (options, value) => {
  if (!value) return null;

  const i = options.find((o) => o.value === value);
  if (i) {
    return i.label;
  }

  return value;
};


export function isRoleMatch(role, roles) {
  if (role && roles) {
    if (Array.isArray(roles)) {
      return roles.indexOf(role) > -1;
    } else {
      return roles === role;
    }
  }
  return true;
}