const getMetadata = async () => {
  const req = await fetch("./library/mtime.json");
  const res = await req.json();
  const folders = Object.keys(res);
  const promises = folders.map((folder) => {
    getFiles(folder);
  });
  Promise.allSettled(promises).then((response) => console.log(response));
};

const getFiles = async (folder) => {
  const req = await fetch(`./library/${folder}/metadata.json`);
  const metadata = await req.json();
  return Promise.resolve(constructThing(folder, metadata));
};

const constructThing = (folder, metadata) => {
  const src = `./library/${folder}/${metadata.name}.${metadata.ext}`;
  const tags = [...metadata.tags];
  return { src, tags };
};

getMetadata();
