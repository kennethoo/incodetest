function greatings(): string {
  const gredings = ["Welcome Back"];

  const randomIndex = Math.floor(Math.random() * gredings.length);
  return gredings[randomIndex];
}

export default greatings;
