export const decodeJwtPayload = (jwt) => {
  const jwtPayload = jwt.split('.')[1];
  const decoded = atob(jwtPayload);
  return JSON.parse(decoded);
};