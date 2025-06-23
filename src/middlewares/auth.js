import auth from "basic-auth";

export function basicAuth(req, res, next) {
  const user = auth(req);

  const username = "hP3S7l11Kg]";
  const password = "3|^B2hfnI?47";

  if (!user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate", "Basic realm="example"');
    return res.status(401).send("Acesso negado");
  }
  next();
}
