const API_URL = 'http://45.152.53.33:7654';

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

export async function fetchContent(type, prompt) {
  const endpoint = type === 'image' ? 'generate' : 'choose_song';
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({
      prompt,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
}
