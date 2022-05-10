var viiner = async () => {
  const req = await fetch("./library/mtime.json");
  const res = req.json();
  console.log(res);
};

viiner();
