export async function uploadBlob(audioBlob, fileType) {
  const formData = new FormData();
  formData.append('file', audioBlob, `audio_recording_${Date.now()}`);
  formData.append('type', fileType || 'wav');

  // Your server endpoint to upload audio:
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  const response = await fetch(apiUrl, {
    method: 'POST',
    // cache: 'no-cache',
    body: formData, // todo: or maybe just body: audioBlob
    headers: {
      'Content-type': 'audio/wav',
    },

    // body: JSON.stringify({
    //   title: 'foo',
    //   body: 'bar',
    //   userId: 1,
    // }),
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
  });

  return response;
}
