// form handling

let startingStr = `Marv is a chatbot that reluctantly answers questions with a sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: What time is it?\nMarv:`;
const handleForm = (event) => {
  event.preventDefault();
  // chatBox.innerHTML = "";
  const formData = {
    message: event.target.message.value,
  };

  createNewComment(event.target.message.value);

  // startingStr = event.target.message.value;

  startingStr = startingStr + " \nYou:" + event.target.message.value;
  axios
    .post(
      `https://api.openai.com/v1/completions`,
      {
        model: "text-davinci-002",
        prompt: startingStr,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      },
      {
        headers: {
          Authorization: "Bearer sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "Content-Type": "application/json",
        },
      }
    )

    .then((response) => {
      // createNewComment(response.data.choices[0].text);
      console.log(response);
      createNewResponse(response.data.choices[0].text);
      clearInput();
    });
};

// create comment div
const createNewComment = (message) => {
  const messageInput = document.createElement("div");
  messageInput.classList.add("chatbox__right");
  const chatBox = document.querySelector(".chatbox__container");

  const msg = document.createElement("p");
  msg.classList.add("chatbox__right-msg");
  msg.innerText = message;
  messageInput.appendChild(msg);

  chatBox.appendChild(messageInput);
};

// create response
const createNewResponse = (response) => {
  const ResponseOutput = document.createElement("div");
  ResponseOutput.classList.add("chatbox__left");
  const chatBox = document.querySelector(".chatbox__container");

  const res = document.createElement("p");
  res.classList.add("chatbox__left-msg");
  res.innerText = response;
  ResponseOutput.appendChild(res);

  chatBox.appendChild(ResponseOutput);
};

const inputField = document.querySelector(".chatbox__input");

// handle the submit
const registerSubmitHandler = (e) => {
  const form = document.getElementById("form");
  form.addEventListener("submit", handleForm);
  inputField.target.reset();
};
const clearInput = () => {
  inputField.value = "";
};
registerSubmitHandler();
