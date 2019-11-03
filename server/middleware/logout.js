export function logout(req, res, next) {
  req.session.destroy();
  res.json({ loggedOut: true });
}
