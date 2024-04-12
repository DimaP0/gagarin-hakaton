const { default: axios } = require("axios")

module.exports = async (userInf) => {

    messages = [
        {
            role: "system",
            text: "На основе полученных данных в виде ответов на вопросы сделать развернутую биографию человека, расписав всё от момента его рождения до настоящего времени. Предложения должны быть насыщенными и не сухими, а повествование должно вестись рассказчиком"
        },
        {
            role: "user",
            text: JSON.stringify(userInf)
        }
    ]
    console.log(JSON.stringify(userInf));

    const data = {
        modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.6,
          maxTokens: 2000
        },
        messages
      };
  
      const response = await axios.post(
          `https://llm.api.cloud.yandex.net/foundationModels/v1/completion`,
          data,
          {
            headers: {
              'Authorization': `Api-Key ${process.env.YANDEX_GPT_KEY}`,
              'x-folder-id': process.env.FOLDER_ID,
            }
          }
        );
        return response.data.result.alternatives[0].message.text;
}