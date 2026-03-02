import jwt from "jsonwebtoken";

const secret = "vivek@123$123";

export const setSession = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret // optional but recommended
  );
};

export const getSession = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export const deleteSession = () => {
  // JWT is stateless — nothing to delete server-side
  return true;
};
