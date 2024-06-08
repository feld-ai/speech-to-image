const API_URL = 'http://45.152.53.33:7654/generate';

export async function uploadBlob(audioBlob, fileType) {
  const formData = new FormData();
  formData.append('file', audioBlob, `audio_recording_${Date.now()}`);
  formData.append('type', fileType || 'wav');

  const response = await fetch(API_URL, {
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

export async function uploadText(text) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      prompt: text,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
}
