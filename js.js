var tags = [];

const getMetadata = async () => {
  const req = await fetch("./library/mtime.json");
  const res = await req.json();
  const folders = Object.keys(res);
  const promises = folders.map(async (folder) => {
    return await getFiles(folder);
  });
  const allPromises = await Promise.allSettled([...promises]);
  const images = allPromises.map((thing) => thing.value);
  images.forEach((img) => {
    if (img) {
      generateImageHTML(img);
    }
  });
  tags.forEach((tag) => generateTagsHtml1(tag));
};

var getFiles = async (folder) => {
  try {
    const req = await fetch(`./library/images/${folder}.info/metadata.json`);
    const metadata = await req.json();
    return { metadata, folder };
  } catch (err) {}
};

const generateImageHTML = (image) => {
  const temp = document.querySelector(".image-template");
  const clone = temp.content.cloneNode(true);
  clone.querySelector(".image-template__wrapper").dataset.id = image.folder;
  image.metadata.tags.forEach((tag) => {
    clone.querySelector(".image-template__wrapper").dataset[tag] = true;
  });
  tags = new Set([...tags, ...image.metadata.tags]);
  clone.querySelector(
    ".image-template__img"
  ).src = `./library/images/${image.folder}.info/${image.metadata.name}.${image.metadata.ext}`;
  document.querySelector(".images").appendChild(clone);
};

var generateTagsHtml1 = (tag) => {
  const temp = document.querySelector(".tags-template");
  const clone = temp.content.cloneNode(true);
  const button = clone.querySelector("button");
  button.dataset.id = tag;
  button.textContent = tag;
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".image-template__wrapper")
      .forEach((template) => {
        if (!template.dataset[tag]) {
          template.classList.add("is-hidden");
        } else {
          template.classList.remove("is-hidden");
        }
      });
    button.classList.toggle("is-active");
  });
  document.querySelector(".tags").appendChild(button);
};

getMetadata();
