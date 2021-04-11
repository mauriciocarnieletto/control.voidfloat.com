const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export const jwtConstants = {
  secret: `${year * month * Math.PI}-${process.env.JWT_SECRET}`,
};
