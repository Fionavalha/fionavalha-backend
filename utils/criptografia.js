import bcrypt from "bcrypt";

export async function criptografar(pAcao, pSenha, pHash) {
  if (pAcao === "C") {
    const hash = await bcrypt.hash(pSenha, 10);
    return hash;
  }

  if (pAcao === "D") {
    const confere = await bcrypt.compare(pSenha, pHash);
    return confere;
  }

  throw new Error("Ação inválida. Use 'C' para criptografar ou 'D' para comparar.");
}
