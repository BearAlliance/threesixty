export function logout(req, res) {
  req.session.destroy();
  res.json({ loggedOut: true });
}
