export default function assertResponseOK(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
