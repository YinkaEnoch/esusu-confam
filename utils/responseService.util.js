const respService = ({ resp, res, statusCode }) => {
  if (resp.code == 1) return res.status(500).json({ ...resp });

  res.status(statusCode).json({ ...resp });
};

export default respService;
