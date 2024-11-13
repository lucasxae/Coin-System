export const roleChecker = (role: string, word: string) => {
  return role.toLowerCase().includes(word.toLowerCase());
};
