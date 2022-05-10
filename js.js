const getMetadata = async () => {
  const req = await fetch("./images/mtime.json");
  const res = req.json();
  console.log(res);
};

getMetadata();
