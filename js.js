const getMetadata = async () => {
  const req = await fetch("./library/mtime.json");
  const res = await req.json();
  const folders = Object.keys(res);
  const promises = folders.map(async (folder) => {
    return await getFiles(folder);
  });
  const allPromises = await Promise.allSettled(promises);
  const images = allPromises
    .filter((thing) => thing.status === "fulfilled")
    .map((thing) => thing.value);
  images.forEach((image) => generateImageHTML(image));
};

const getFiles = async (folder) => {
  try {
    const req = await fetch(`./library/images/${folder}.info/metadata.json`);
    const metadata = await req.json();
    return { metadata, folder };
  } catch (err) {}
};

const generateImageHTML = (image) => {
  const temp = document.querySelector(".image-template");
  const clone = temp.content.cloneNode();
  clone.querySelector("image-template__tags").innerHTML =
    image.metadata.tags.join(", ");
  clone.querySelector(
    "image-template__img"
  ).src = `./library/images/${image.folder}.info)/${image.metadata.name}.${image.metadata.ext}`;
  document.body.appendChild(clone);
};

getMetadata();
