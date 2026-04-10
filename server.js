function handleMessage(sender_psid, received_message) {
  let text = received_message.text?.toLowerCase();
  let response;

  if (!text) {
    response = { text: "Ойлгосонгүй 😅" };
  }

  else if (text.includes("hi") || text.includes("сайн")) {
    response = {
      text: "Сайн байна уу 👋\n1. Бүтээгдэхүүн\n2. Үнэ\n3. Зөвлөгөө\n4. Холбоо барих"
    };
  }

  else if (text.includes("1")) {
    response = {
      text: "🔹 Engine oil\n🔹 Motorcycle oil\n🔹 Gear oil"
    };
  }

  else if (text.includes("2")) {
    response = {
      text: "Ямар бүтээгдэхүүний үнийг мэдэх вэ?"
    };
  }

  else if (text.includes("3")) {
    response = {
      text: "🔧 Тос сонгох\n🔧 Солих хугацаа"
    };
  }

  // 👉 ЭНД ЧИНИЙ ХАЯГ ОРНО
  else if (text.includes("4") || text.includes("холбоо")) {
    response = {
      text: `🚗 Таны хөдөлгүүрт тохирсон, баталгаатай сонголт

📍 32-ын тойрог (Номин супермаркетын хойно)
PIT Auto Center  
📞 88255030, 80245030

📍 Офицер (Нүхэн гарцтай гэрлэн дохионы хойно)
PIT Auto Center  
📞 80745030, 88385030

📍 Өмнөговь – Цогтцэций сум
Pit Auto Center  
📞 80755030, 80455030`
    };
  }

  else {
    response = {
      text: "Таны бичсэн: " + text
    };
  }

  callSendAPI(sender_psid, response);
}
