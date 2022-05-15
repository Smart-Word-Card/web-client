import { Button, Image } from "antd";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useCollection from "../../../../hooks/useCollection";
import axiosClient from "../../../../utils/axios/axiosClient";

const CollectionsPlayPage = () => {
  const { collectionId } = useParams();
  const { collection, loading } = useCollection(collectionId!);
  const [transcription, setTranscription] = useState("");

  const read = async (word: string) => {
    const resp = await fetch("/api/read", {
      method: "POST",
      headers: {
        Accept: "audio/mp3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: word,
      }),
    });
    const arrayBuffer = await resp.arrayBuffer();
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      console.log(buffer);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    });
  };

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const speak = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support recording!");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        if (!mediaRecorderRef.current) {
          mediaRecorderRef.current = new MediaRecorder(stream);
        }
        const mediaRecorder = mediaRecorderRef.current;
        mediaRecorder.start();
        mediaRecorder.ondataavailable = async (ev) => {
          const formData = new FormData();
          formData.append("audio", ev.data);
          const response = await axiosClient.post(
            "/api/transcribe-v2",
            formData
          );
          console.log(response.data);
          setTranscription(response.data[0]?.alternatives[0]?.transcript);
        };
        mediaRecorder.onstop = (ev) => {
          console.log("stopped", ev);
        };
        mediaRecorder;
      });
  };

  const stopSpeak = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <div>
      {JSON.stringify(collection)}
      <div>
        <Image src={collection?.cards[0].image} />
        <span>{collection?.cards[0].word}</span>
        <Button onClick={() => read(collection?.cards[0].word!)}>Listen</Button>
        <Button onClick={() => speak()}>Speak</Button>
        <Button onClick={() => stopSpeak()}>Stop</Button>
        {transcription}
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default CollectionsPlayPage;
