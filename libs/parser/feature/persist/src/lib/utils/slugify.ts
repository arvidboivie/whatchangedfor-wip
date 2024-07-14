export const slugify = (input: string): string => {
  input = input.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  input = input.toLowerCase(); // convert string to lowercase
  input = input
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return input;
};
